var trace1 = {
    x: ["January", "February", "March", "April", "May", "June"],
    y: [4215, 5312, 6251, 7841, 9821, 14984],
    mode: 'lines+markers',
    type: 'scatter',
    name: 'threats',
    backgroundColor: "#4e73df",
    hoverBackgroundColor: "#2e59d9",

  };
  
  var data = [trace1];
  var layout = {
    title: 'Click Here<br>to Edit Chart Title',
    showlegend: true,
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1
    },
    xaxis: {
      title: 'Click Here<br>to Edit X Axis Title',
      showgrid: false,
      zeroline: false
    },

};

  chart = document.getElementsByClassName('chart-area')[0];
  
  Plotly.newPlot(chart, data, layout, {editable: true});
