// This JavaScript code creates an interactive pie chart for a web-based network data visualization tool.
// It can display data based on different categories like domain names or geographical locations,
// which users can select using a dropdown menu. The chart is rendered using Chart.js and is populated
// with mock data for illustrative purposes. It dynamically updates its dataset based on user interaction.

document.addEventListener('DOMContentLoaded', function() {
    // Get the context of the canvas where the pie chart will be drawn.
    var ctxPie = document.getElementById('pcapPieChart').getContext('2d');

    // Define a color palette for visual distinction between different categories.
    var colorPalette = [
        'rgba(0, 123, 255, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(40, 167, 69, 0.7)',
        'rgba(220, 53, 69, 0.7)',
        'rgba(23, 162, 184, 0.7)'
        // ... Additional colors
    ];

    // Mock data for daily domain name traffic.
    var domainNameData = {
        labels: ['example.com', 'domain.net', 'website.org', 'site.co'], // Domain names
        data: [120, 90, 60, 30], // Corresponding traffic data
        backgroundColor: colorPalette.slice(0, 4) // Assign colors
    };

    // Mock data for geo-location based traffic.
    var geoLocationData = {
        labels: ['USA', 'UK', 'Canada', 'Australia'], // Geo-locations
        data: [100, 80, 50, 20], // Corresponding traffic data
        backgroundColor: colorPalette.slice(0, 4) // Assign colors
    };

    // Initialize the pie chart with domain name data as default.
    var pcapPieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: domainNameData.labels,
            datasets: [{
                data: domainNameData.data,
                backgroundColor: domainNameData.backgroundColor,
            }]
        },
        options: {
            // Configuration for responsiveness and legend display.
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });

    // Function to update the pie chart data based on user selection.
    function updatePcapPieChartData(newData) {
        pcapPieChart.data.labels = newData.labels;
        pcapPieChart.data.datasets[0].data = newData.data;
        pcapPieChart.data.datasets[0].backgroundColor = newData.backgroundColor;
        pcapPieChart.update();
    }

    // Event listener for the pie chart data type selector dropdown.
    document.getElementById('pieDataTypeSelector').addEventListener('change', function(event) {
        var newData = event.target.value === 'domainName' ? domainNameData : geoLocationData;
        updatePcapPieChartData(newData);
    });
});