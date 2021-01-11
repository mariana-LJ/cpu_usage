'use strict'

const WIDTH = 800;
const HEIGHT = 600;

d3.select('svg')
  .style('width', WIDTH)
  .style('height', HEIGHT)
  
function updateBarChart(cpu_percent) {
  const rectangles = d3.select('svg').selectAll('rect').data(cpu_percent);
  rectangles.transition().duration(1000);
  rectangles.enter().append('rect');

  let yScale = d3.scaleLinear();
  yScale.range([HEIGHT, 0]);
  let yMin = d3.min(cpu_percent);
  let yMax = d3.max(cpu_percent);
  yScale.domain([yMin - 1, yMax]);

  let xScale = d3.scaleLinear();
  xScale.range([0, WIDTH]);
  xScale.domain([0, cpu_percent.length]);
  
  let yDomain = d3.extent(cpu_percent, (datum, index) => datum);
  let colorScale = d3.scaleLinear();
  colorScale.domain(yDomain);
  colorScale.range(['#00cc00', 'blue']);

  rectangles
    .attr('height', (datum, index) => HEIGHT - yScale(datum))
    .attr('x', (datum, index) => xScale(index))
    .attr('y', (datum, index) => yScale(datum))
    .attr('width', WIDTH/cpu_percent.length)
    .attr('fill', (datum, index) => colorScale(datum))

  let leftAxis = d3.axisLeft(yScale);
  d3.select('svg')
    .append('g')
    .attr('id', 'left-axis')
    .call(leftAxis);

  let usageScale = d3.scaleBand();
  let usageDomain = cpu_percent.map(value => 'CPU' + cpu_percent.indexOf(value));
  usageScale.range([0, WIDTH]);
  usageScale.domain(usageDomain);

  let bottomAxis = d3.axisBottom(usageScale);
  d3.select('svg')
    .append('g')
    .attr('id', 'bottom-axis')
    .call(bottomAxis)
    .attr('transform', 'translate(0, '+HEIGHT+')');
}

function getCPUUsage() {
  fetch('/cpu_usage')
  .then((res) => res.json())
  .then(data => updateBarChart(data.cpu_percent))
  .catch((err) => console.log(err));
  setTimeout(getCPUUsage, 2000);
}

getCPUUsage();
