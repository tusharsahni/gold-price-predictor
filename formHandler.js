document.getElementById('prediction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        spx: parseFloat(document.getElementById('spx').value),
        uso: parseFloat(document.getElementById('uso').value),
        slv: parseFloat(document.getElementById('slv').value),
        eurusd: parseFloat(document.getElementById('eurusd').value)
    };
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('modal-content').innerHTML = `<h4 class="font-bold items-center text-xl mb-4">${data.prediction.toFixed(2)}</h4>`;
        document.getElementById('result-modal').classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('result-modal').classList.add('hidden');
});

document.getElementById('see-analysis').addEventListener('click', function() {
    document.getElementById('charts-modal').classList.remove('hidden');
});

document.getElementById('close-charts-modal').addEventListener('click', function() {
    document.getElementById('charts-modal').classList.add('hidden');
});
