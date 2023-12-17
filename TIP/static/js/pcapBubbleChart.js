// This JavaScript code initializes a bubble chart for visualizing network traffic data.
// It categorizes the traffic data by protocol and visualizes metrics such as packet size and count over time.
// The chart uses bubbles of varying sizes to represent the volume of traffic for each protocol at different times.
// Chart.js is used for rendering, and the data is represented with a predefined color palette for clear distinction.

document.addEventListener('DOMContentLoaded', function() {
    // Get the context of the canvas where the bubble chart will be drawn.
    var ctxBubble = document.getElementById('networkDataBubbleChart').getContext('2d');

    // Define a color palette for different network protocols.
    var colorPalette = {
        TCP: 'rgba(0, 123, 255, 0.7)',
        UDP: 'rgba(255, 193, 7, 0.7)',
        ICMP: 'rgba(40, 167, 69, 0.7)',
        HighRisk: 'rgba(220, 53, 69, 0.7)' // Additional protocol for high-risk traffic
    };

    // Mock traffic data for demonstration purposes.
    var trafficData = [
        // Example data points with time, packet size, count, and protocol
        { time: 1, packetSize: 50, count: 200, protocol: 'TCP' },
        { time: 3, packetSize: 75, count: 150, protocol: 'UDP' },
        { time: 5, packetSize: 20, count: 300, protocol: 'ICMP' },
        { time: 7, packetSize: 60, count: 100, protocol: 'TCP' },
        { time: 9, packetSize: 90, count: 80, protocol: 'HighRisk' },
        // ... More data points
    ];

    // Group the data by protocol to create different bubble sets.
    var groupedData = {};
    trafficData.forEach(data => {
        if (!groupedData[data.protocol]) {
            groupedData[data.protocol] = [];
        }
        groupedData[data.protocol].push({
            x: data.time,       // X-axis: Time of day
            y: data.packetSize, // Y-axis: Packet size
            r: Math.sqrt(data.count) // Bubble radius representing packet count
        });
    });

    // Create a dataset for each protocol with corresponding colors and data.
    var datasets = Object.keys(groupedData).map(protocol => ({
        label: protocol,
        data: groupedData[protocol],
        backgroundColor: colorPalette[protocol] || 'rgba(128, 128, 128, 0.7)' // Default color if not defined
    }));

    // Initialize the bubble chart.
    var networkDataBubbleChart = new Chart(ctxBubble, {
        type: 'bubble',
        data: { datasets: datasets },
        options: {
            // Configuration for chart scales, tooltips, responsiveness, and aspect ratio.
            scales: {
                xAxes: [{ scaleLabel: { display: true, labelString: 'Time of Day (Hours)' } }],
                yAxes: [{ scaleLabel: { display: true, labelString: 'Packet Size (KB)' } }]
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            var data = context.raw;
                            return `${data.label}: Time: ${data.x}h, Size: ${data.y}KB, Count: ${Math.pow(data.r, 2)}`;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
});