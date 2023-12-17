// This JavaScript code is designed to create an interactive bar chart for network traffic analysis.
// The chart dynamically updates to display data based on either network protocols or source IP addresses.
// Users can switch between these views using a dropdown menu. The chart utilizes Chart.js for rendering
// and is populated with mock data representing packet counts over different hours of the day.

document.addEventListener('DOMContentLoaded', function() {
    // Get the context of the canvas where the bar chart will be drawn.
    var ctxBar = document.getElementById('networkTrafficBarChart').getContext('2d');

    // Define a color palette for visual distinction between different data categories.
    var colorPalette = [
        'rgba(0, 123, 255, 0.7)', // Blue
        'rgba(255, 193, 7, 0.7)',  // Yellow
        'rgba(40, 167, 69, 0.7)',  // Green
        'rgba(220, 53, 69, 0.7)',  // Red
        'rgba(23, 162, 184, 0.7)'  // Cyan
    ];

    // Define the hours for the X-axis labels.
    var hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    // Define the protocols and generate mock data for each protocol.
    var protocols = ['TCP', 'UDP', 'ICMP'];
    var protocolData = protocols.map((protocol, index) => ({
        label: protocol,
        data: hours.map(() => Math.floor(Math.random() * 200)), // Random packet count
        backgroundColor: colorPalette[index % colorPalette.length] // Assign color
    }));

    // Define source IPs and generate mock data for each IP.
    var sourceIPs = ['192.168.1.1', '10.0.0.2', '172.16.0.3', '192.168.1.4'];
    var sourceIPData = sourceIPs.map((ip, index) => ({
        label: ip,
        data: hours.map(() => Math.floor(Math.random() * 200)), // Random packet count
        backgroundColor: colorPalette[index % colorPalette.length] // Assign color
    }));

    // Initialize the bar chart with default data set to protocol data.
    var networkTrafficBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: hours,
            datasets: protocolData
        },
        options: {
            // Configuration for chart responsiveness and scales.
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Hours' // X-axis title
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Packet Count' // Y-axis title
                    }
                }
            },
            plugins: {
                legend: {
                    display: true // Display the legend
                }
            }
        }
    });

    // Function to update chart data based on the selected view (protocol or source IP).
    function updateChartData(selectedView) {
        networkTrafficBarChart.data.datasets = selectedView === 'protocol' ? protocolData : sourceIPData;
        networkTrafficBarChart.update();
    }

    // Event listener for the data view selector dropdown.
    document.getElementById('dataViewSelector').addEventListener('change', function(event) {
        updateChartData(event.target.value);
    });
});