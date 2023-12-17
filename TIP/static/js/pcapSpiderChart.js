// This JavaScript code creates a radar (spider) chart for visualizing various metrics of PCAP data analysis.
// It displays key aspects like protocol usage, port activity, and security alerts. The chart is implemented using Chart.js,
// featuring a radar-style layout that provides a quick overview of the analyzed network traffic. The chart is populated with
// mock data for illustrative purposes and is designed to be responsive and easily interpretable.

document.addEventListener('DOMContentLoaded', function() {
    // Get the context of the canvas where the radar chart will be drawn.
    var ctxSpider = document.getElementById('pcapAnalysisSpiderChart').getContext('2d');

    // Define the metrics to be displayed on the radar chart.
    var pcapMetrics = ['Protocol Usage', 'Port Activity', 'Packet Sizes', 
                       'Session Durations', 'Geographic Distribution', 'Security Alerts'];

    // Mock data representing scores for each metric.
    var pcapData = {
        labels: pcapMetrics,
        datasets: [{
            label: 'PCAP Analysis',
            data: [80, 70, 75, 60, 90, 50], // Example scores for each metric
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill
            borderColor: 'rgba(54, 162, 235, 1)', // Blue border
            pointBackgroundColor: 'rgba(54, 162, 235, 1)' // Blue points
        }]
    };

    // Initialize the radar chart.
    var pcapAnalysisSpiderChart = new Chart(ctxSpider, {
        type: 'radar',
        data: pcapData,
        options: {
            // Configuration for line, scale, legend, responsiveness, and aspect ratio.
            elements: {
                line: {
                    borderWidth: 3 // Width of the radar chart lines
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false // Hide radial lines
                    },
                    suggestedMin: 0, // Minimum value for scale
                    suggestedMax: 100 // Maximum value for scale
                }
            },
            plugins: {
                legend: {
                    position: 'top', // Position of the chart legend
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
});