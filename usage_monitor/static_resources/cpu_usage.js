'use strict'

const WIDTH = 800;
const HEIGHT = 600;

d3.select('svg')
  .style('width', WIDTH)
  .style('height', HEIGHT)
  
document.getElementById("update_usage").addEventListener('click', getCPUUsage);

function getCPUUsage() {
  fetch('/cpu_usage')
  .then((res) => {
    return res.json();
  })
  .then((rawData) => {
    d3.select('svg').selectAll('rect')
    .data(rawData.cpu_percent)
    .enter()
    .append('rect');
    let yScale = d3.scaleLinear();
    yScale.range([HEIGHT, 0]);
    let yMin = d3.min(rawData.cpu_percent);
    let yMax = d3.max(rawData.cpu_percent);
    yScale.domain([yMin - 1, yMax]);

    d3.selectAll('rect')
      .attr('height', (datum, index) => HEIGHT - yScale(datum));
    
    let xScale = d3.scaleLinear();
    xScale.range([0, WIDTH]);
    xScale.domain([0, rawData.cpu_percent.length]);
    
    d3.selectAll('rect')
      .attr('x', (datum, index) => xScale(index));
    
    d3.selectAll('rect')
      .attr('y', (datum, index) => yScale(datum));
    
    d3.selectAll('rect')
      .attr('width', WIDTH/rawData.cpu_percent.length);
  })
  .catch((err) => {
    console.log(err);
  });
}

document.getElementById("cpu_usage").innerHTML = "N/A";
