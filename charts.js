// // Fetch the CSV data
// fetch('http://127.0.0.1:5000/data/gld_price_data.csv')

//     .then(response => response.text())
//     .then(csvText => {
//         // Parse CSV data
//         const data = Papa.parse(csvText, { header: true, dynamicTyping: true }).data;

//         // Prepare data for the gold price chart
//         const labels = data.map(row => row.Date);
//         const goldPrices = data.map(row => row.GLD);
//         const spxPrices = data.map(row => row.SPX);
//         const usoPrices = data.map(row => row.USO);
//         const slvPrices = data.map(row => row.SLV);
//         const eurusdPrices = data.map(row => row['EUR/USD']);

//         // Create the gold price chart
//         const goldPriceCtx = document.getElementById('goldPriceChart').getContext('2d');
//         new Chart(goldPriceCtx, {
//             type: 'line',
//             data: {
//                 labels: labels,
//                 datasets: [
//                     {
//                         label: 'Gold Price (GLD)',
//                         data: goldPrices,
//                         borderColor: 'rgba(255, 206, 86, 1)',
//                         backgroundColor: 'rgba(255, 206, 86, 0.2)',
//                         borderWidth: 1,
//                         fill: false
//                     },
//                     {
//                         label: 'SPX',
//                         data: spxPrices,
//                         borderColor: 'rgba(54, 162, 235, 1)',
//                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                         borderWidth: 1,
//                         fill: false
//                     },
//                     {
//                         label: 'USO',
//                         data: usoPrices,
//                         borderColor: 'rgba(75, 192, 192, 1)',
//                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                         borderWidth: 1,
//                         fill: false
//                     },
//                     {
//                         label: 'SLV',
//                         data: slvPrices,
//                         borderColor: 'rgba(153, 102, 255, 1)',
//                         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                         borderWidth: 1,
//                         fill: false
//                     },
//                     {
//                         label: 'EUR/USD',
//                         data: eurusdPrices,
//                         borderColor: 'rgba(255, 159, 64, 1)',
//                         backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                         borderWidth: 1,
//                         fill: false
//                     }
//                 ]
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     x: {
//                         type: 'time',
//                         time: {
//                             unit: 'month'
//                         },
//                         title: {
//                             display: true,
//                             text: 'Date'
//                         }
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Price'
//                         }
//                     }
//                 }
//             }
//         });

//         // Prepare data for the correlation heatmap
//         const corrData = {
//             labels: ['GLD', 'SPX', 'USO', 'SLV', 'EUR/USD'],
//             datasets: [{
//                 label: 'Correlation',
//                 data: [
//                     calculateCorrelation(goldPrices, spxPrices),
//                     calculateCorrelation(goldPrices, usoPrices),
//                     calculateCorrelation(goldPrices, slvPrices),
//                     calculateCorrelation(goldPrices, eurusdPrices)
//                 ],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         };

//         // Create the correlation heatmap chart
//         const correlationHeatmapCtx = document.getElementById('correlationHeatmap').getContext('2d');
//         new Chart(correlationHeatmapCtx, {
//             type: 'bar',
//             data: corrData,
//             options: {
//                 responsive: true,
//                 scales: {
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Factors'
//                         }
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Correlation Coefficient'
//                         },
//                         beginAtZero: true,
//                         max: 1
//                     }
//                 }
//             }
//         });

//         // Calculate correlation coefficient
//         function calculateCorrelation(x, y) {
//             const meanX = x.reduce((a, b) => a + b, 0) / x.length;
//             const meanY = y.reduce((a, b) => a + b, 0) / y.length;
//             const numerator = x.reduce((sum, xi, i) => sum + ((xi - meanX) * (y[i] - meanY)), 0);
//             const denominatorX = Math.sqrt(x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0));
//             const denominatorY = Math.sqrt(y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0));
//             return numerator / (denominatorX * denominatorY);
//         }
//     });

// Fetch the CSV data
fetch('http://127.0.0.1:5000/data/gld_price_data.csv')
    .then(response => response.text())
    .then(csvText => {
        // Parse CSV data
        const data = Papa.parse(csvText, { header: true, dynamicTyping: true }).data;

        // Filter out invalid rows
        const filteredData = data.filter(row => {
            return row.GLD !== undefined && row.SPX !== undefined && row.USO !== undefined && row.SLV !== undefined && row['EUR/USD'] !== undefined;
        });

        // Prepare data for the gold price chart
        const labels = filteredData.map((_, index) => index + 1); // Numerical labels
        const goldPrices = filteredData.map(row => row.GLD);
        const spxPrices = filteredData.map(row => row.SPX);
        const usoPrices = filteredData.map(row => row.USO);
        const slvPrices = filteredData.map(row => row.SLV);
        const eurusdPrices = filteredData.map(row => row['EUR/USD']);

        // Create the gold price chart
        const goldPriceCtx = document.getElementById('goldPriceChart').getContext('2d');
        new Chart(goldPriceCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Gold Price (GLD)',
                        data: goldPrices,
                        borderColor: 'rgba(255, 206, 86, 1)',
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'SPX',
                        data: spxPrices,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'USO',
                        data: usoPrices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'SLV',
                        data: slvPrices,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'EUR/USD',
                        data: eurusdPrices,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Index'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price'
                        }
                    }
                }
            }
        });

        // Calculate correlation coefficient
        function calculateCorrelation(x, y) {
            const meanX = x.reduce((a, b) => a + b, 0) / x.length;
            const meanY = y.reduce((a, b) => a + b, 0) / y.length;
            const numerator = x.reduce((sum, xi, i) => sum + ((xi - meanX) * (y[i] - meanY)), 0);
            const denominatorX = Math.sqrt(x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0));
            const denominatorY = Math.sqrt(y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0));
            return numerator / (denominatorX * denominatorY);
        }

        // Prepare data for the correlation heatmap
        const corrData = {
            labels: ['GLD', 'SPX', 'USO', 'SLV', 'EUR/USD'],
            datasets: [{
                label: 'Correlation',
                data: [
                    calculateCorrelation(goldPrices, spxPrices),
                    calculateCorrelation(goldPrices, usoPrices),
                    calculateCorrelation(goldPrices, slvPrices),
                    calculateCorrelation(goldPrices, eurusdPrices)
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Create the correlation heatmap chart
        const correlationHeatmapCtx = document.getElementById('correlationHeatmap').getContext('2d');
        new Chart(correlationHeatmapCtx, {
            type: 'bar',
            data: corrData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Factors'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Correlation Coefficient'
                        },
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching CSV data:', error);
    });
