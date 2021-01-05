'use strict'

document.getElementById("update_usage").addEventListener('click', getCPUUsage);

function getCPUUsage() {
  fetch('/cpu_usage')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let percentages = "";
    console.log(data);
    data.cpu_percent.forEach(element => {
      percentages += element + "\t\t";
    });
    document.getElementById("cpu_usage").innerHTML = percentages;
  })
  .catch((err) => {
    console.log(err);
  });
}

document.getElementById("cpu_usage").innerHTML = "N/A";
