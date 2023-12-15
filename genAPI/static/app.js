const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('colorPicker').value; // Get selected color

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Function to send canvas image to Flask endpoint
document.getElementById('sendBtn').addEventListener('click', function () {
    const canvasData = canvas.toDataURL('image/png'); // Get canvas image as base64 data

    fetch('/predicted_image', {
        method: 'POST',
        body: JSON.stringify({ drawing: canvasData }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Received response from Flask:', data);
            // Handle the response accordingly (if needed)
        })
        .catch(error => {
            console.error('Error sending image to Flask:', error);
            // Handle errors accordingly
        });
});


