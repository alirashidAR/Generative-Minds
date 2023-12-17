const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const shapes = [];
let isDrawing = false;
let startRectX, startRectY;
let drawSquareMode = false;

function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        ctx.lineWidth = 2;
        ctx.fillStyle = shape.color;
        if (shape.type === 'square') {
            ctx.fillRect(shape.startX, shape.startY, shape.width, shape.height);
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
            ctx.strokeStyle = '#000';
        } else if (shape.type === 'room') {
            ctx.fillRect(shape.x, shape.y, 9, 9);
        }
    });
}

document.getElementById('drawSquareBtn').addEventListener('click', function () {
    drawSquareMode = true;
});

document.getElementById('drawRoomBtn').addEventListener('click', function () {
    drawSquareMode = false;
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startRectX = e.clientX - canvas.getBoundingClientRect().left;
    startRectY = e.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing === true) {
        const currentX = e.clientX - canvas.getBoundingClientRect().left;
        const currentY = e.clientY - canvas.getBoundingClientRect().top;
        const width = currentX - startRectX;
        const height = currentY - startRectY;

        drawShapes();

        if (drawSquareMode) {
            ctx.fillStyle = colorPicker.value;
            ctx.fillRect(startRectX, startRectY, width, height);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(startRectX, startRectY, width, height);
        } else {
            const x = Math.floor(startRectX / 10) * 10;
            const y = Math.floor(startRectY / 10) * 10;
            ctx.fillStyle = colorPicker.value;
            ctx.fillRect(x, y, 9, 9);
        }
    }
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing === true) {
        isDrawing = false;
        const currentX = event.clientX - canvas.getBoundingClientRect().left;
        const currentY = event.clientY - canvas.getBoundingClientRect().top;
        const width = currentX - startRectX;
        const height = currentY - startRectY;

        if (drawSquareMode) {
            shapes.push({
                startX: startRectX,
                startY: startRectY,
                width: width,
                height: height,
                type: 'square',
                color: colorPicker.value
            });
        } else {
            const x = Math.floor(startRectX / 10) * 10;
            const y = Math.floor(startRectY / 10) * 10;
            shapes.push({ x, y, type: 'room', color: colorPicker.value });
        }

        drawShapes();
    }
});


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

            const generatedImage = document.getElementById('generatedImage');
            generatedImage.src = data.image;
            generatedImage.style.display = 'block'; // Show the received image
        })
        .catch(error => {
            console.error('Error sending image to Flask:', error);
            // Handle errors accordingly
        });
});

