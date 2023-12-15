// This JavaScript code is designed for a web dashboard that visualizes PCAP data using an area chart. 
// It allows users to interactively select different data types and time ranges to update the chart dynamically.
// The chart is rendered using Chart.js, and the data is initially set as mock data for demonstration purposes.
// The script listens to user interactions with dropdown menus to change the data display accordingly.

document.addEventListener('DOMContentLoaded', function() {
    // Get the context of the canvas where the chart will be drawn
    var ctx = document.getElementById('pcapAreaChart').getContext('2d');

    // Initialize the area chart with empty data and labels
    var pcapAreaChart = new Chart(ctx, {
        type: 'line', // Chart type set to line for area chart
        data: {
            labels: [], // Initial empty labels for the X-axis
            datasets: [{
                label: '', // Label for dataset, will be set based on selected data type
                data: [], // Initial empty data for the dataset
                backgroundColor: 'rgba(0, 123, 255, 0.5)', // Background color for the area under the line
                borderColor: 'rgba(0, 123, 255, 1)', // Color of the line
                borderWidth: 1, // Width of the line
                pointBackgroundColor: 'rgba(0, 123, 255, 1)', // Color of the points on the line
                fill: 'origin', // Filling the area under the line
            }]
        },
        options: {
            // Configuration for scales and responsiveness
            scales: {
                x: {
                    type: 'time', // X-axis type set to time
                    time: {
                        unit: 'hour' // Time unit set to hour
                    },
                    grid: {
                        display: false, // Hide grid lines on X-axis
                        drawBorder: false // Hide border on X-axis
                    },
                    ticks: {
                        autoSkip: true, // Enable automatic skipping of ticks
                        maxTicksLimit: 10 // Maximum number of ticks displayed
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true // Y-axis begins at zero
                    },
                    grid: {
                        color: "rgb(234, 236, 244)", // Color of the grid lines
                        zeroLineColor: "rgb(234, 236, 244)", // Color of the zero line
                        drawBorder: false, // Hide border on Y-axis
                        borderDash: [2], // Dashed line style
                        zeroLineBorderDash: [2] // Zero line dashed style
                    }
                },
            },
            responsive: true, // Chart is responsive to window size
            maintainAspectRatio: false, // Maintains aspect ratio of the chart
            plugins: {
                legend: {
                    display: true // Display the legend
                }
            }
        }
    });

    // Mock data for demonstration purposes
    var mockData = {
        hourly: {
            volume: { labels: ['00:00', '01:00', '02:00', '03:00'], data: [100, 200, 150, 300], label: 'Data Volume (MB)' },
            packets: { labels: ['00:00', '01:00', '02:00', '03:00'], data: [1000, 1500, 1200, 1800], label: 'Packet Count' },
            sessions: { labels: ['00:00', '01:00', '02:00', '03:00'], data: [200, 300, 250, 350], label: 'Session Count' }
        },
        daily: {
            volume: { labels: ['Mon', 'Tue', 'Wed', 'Thu'], data: [800, 1200, 900, 1500], label: 'Data Volume (MB)' },
            packets: { labels: ['Mon', 'Tue', 'Wed', 'Thu'], data: [8000, 12000, 9000, 15000], label: 'Packet Count' },
            sessions: { labels: ['Mon', 'Tue', 'Wed', 'Thu'], data: [400, 600, 500, 700], label: 'Session Count' }
        },
        weekly: {
            volume: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [3200, 4800, 3600, 6000], label: 'Data Volume (MB)' },
            packets: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [32000, 48000, 36000, 60000], label: 'Packet Count' },
            sessions: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [1600, 2400, 1800, 3000], label: 'Session Count' }
        }
        
       
    };

    var selectedRange = 'hourly'; // Default selected time range
    var selectedDataType = 'volume'; // Default selected data type

    // Function to update chart data based on user selection
    function updatePcapChartData(chart, newData) {
        chart.data.labels = newData.labels; // Update X-axis labels
        chart.data.datasets[0].data = newData.data; // Update dataset values
        chart.data.datasets[0].label = newData.label; // Update dataset label
        chart.update(); // Render the updated chart
    }

    // Event listener for time range selector dropdown
    document.getElementById('timeRangeSelector').addEventListener('change', function(event) {
        selectedRange = event.target.value; // Update selected time range
        updatePcapChartData(pcapAreaChart, mockData[selectedRange][selectedDataType]); // Update chart
    });

    // Event listener for data type selector dropdown
    document.getElementById('dataTypeSelector').addEventListener('change', function(event) {
        selectedDataType = event.target.value; // Update selected data type
        updatePcapChartData(pcapAreaChart, mockData[selectedRange][selectedDataType]); // Update chart
    });

    // Initialize the chart with the default data set
    updatePcapChartData(pcapAreaChart, mockData[selectedRange][selectedDataType]);

    // Placeholder function to fetch data (to be implemented based on your backend)
    function fetchDataForRange(range) {
        // Implement AJAX call to fetch data based on the selected range
        // The returned data should be in the format expected by updatePcapChartData
    }
});
