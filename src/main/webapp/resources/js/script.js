const svg = document.querySelector('svg');
const rect = svg.getBoundingClientRect();
const svgWidth = rect.width;
const svgHeight = rect.height;

function handleSvg(event) {
    const r = parseFloat(document.querySelector('#inputForm\\:rValue_input')?.value);

    const x = event.clientX - rect.left - svgWidth / 2;
    const y = svgHeight / 2 - (event.clientY - rect.top);

    const scaledX = (x / (svgWidth / 2)) * r; // Преобразуем X в диапазон значений
    const scaledY = (y / (svgHeight / 2)) * r; // Преобразуем Y в диапазон значений

    document.querySelector('#inputForm\\:xValue input').value = scaledX.toFixed(2);
    document.querySelector('#inputForm\\:yValue').value = scaledY.toFixed(2);

    document.querySelector('#inputForm\\:submitButton').click();


}

let svgPointData = {
    x: NaN,
    y: NaN,
    r: NaN,
    inside: false
};

function setSvgPointData(x, y, r) {
    svgPointData['x'] = x;
    svgPointData['y'] = y;
    svgPointData['r'] = r;
}

function clearSvgPointData() {
    svgPointData['x'] = NaN;
    svgPointData['y'] = NaN;
    svgPointData['r'] = NaN;
    svgPointData['inside'] = false;
}

function getScaledX(x, r) {
    return ((x / (svgWidth / 2)) * r * 1.5);
}

function getScaledY(y, r) {
    return ((y / (svgHeight / 2)) * r * 1.5);
}

function validate() {
    const x = document.querySelector('#inputForm\\:xValue input:checked')?.value;
    const y = document.querySelector('#inputForm\\:yValue')?.value;
    const r = document.querySelector('#inputForm\\:rValue_input')?.value;
    const errorDiv = document.getElementById('error');

    let errorMessages = [];

    if (!x) {
        errorMessages.push('Ошибка: нужно выбрать координату X!');
    }

    if (!y || isNaN(y) || y < -5 || y > 5) {
        errorMessages.push('Ошибка: Y должен быть числом от -5 до 5!');
    }

    if (!r || isNaN(r) || r <= 0 || r > 3) {
        errorMessages.push('Ошибка: Радиус R должен быть от 0 до 3!');
    }

    if (errorMessages.length > 0) {
        errorDiv.innerHTML = errorMessages.join('<br>');
        errorDiv.style.display = 'block';
        return;
    } else {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }

    console.log('Валидация пройдена: X =', x, ', Y =', y, ', R =', r);
}


function handleSvgClick(event) {
    const errorDiv = document.getElementById('error');
    let errorMessages = [];
    const r = document.querySelector('#inputForm\\:rValue_input')?.value;

    if (isNaN(r)) {
        errorMessages.push("Ошибка: радиус не выбран!");
        errorDiv.innerHTML = errorMessages.join('<br>');
        errorDiv.style.display = 'block';
        return;
    } else {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }

    const svg = event.currentTarget;
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;

    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    const x = event.clientX - svgRect.left - centerX;
    const y = centerY - (event.clientY - svgRect.top);


    const scaledX = Number(((x * (svgWidth/4)) / r * 2).toFixed(2));
    const scaledY = Number(((y * (svgHeight/4)) / r * 2).toFixed(2));

    addPointToSVG(scaledX, scaledY, r); // Рисуем точку до получения ответа
}

function addPointToSVG(x, y, r) {
    const svg = document.getElementById("coordinate-plane");

    const xNormalized = x + 150;
    const yNormalized = 150 - y;

    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute('cx', xNormalized);
    point.setAttribute('cy', yNormalized);
    point.setAttribute('r', 2.5);
    point.setAttribute('fill', isHit() ? 'green' : 'red');

    svg.appendChild(point);
}
function isHit() {
    const x = getScaledX(svgPointData['x'], svgPointData['r']);
    const y = getScaledY(svgPointData['y'], svgPointData['r']);
    const r = svgPointData['r'];

    const isInRect = (x >= r && x <= 0 && y >= -r / 2 && y <= 0);

    const isInCircle = (x >= -r / 2 && x <= 0 && y <= r / 2 && y >= 0 && (x * x + y * y <= r * r));

    const isInTriangle = (x <= r / 2 && x >= 0 && y >= -r && y <= 0 && (y >= 2 * x - r));

    return isInRect || isInCircle || isInTriangle;
}