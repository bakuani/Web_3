let points = [];

function validate() {
    const x = parseFloat(document.querySelector('#inputForm\\:xValue input:checked')?.value);
    const y = parseFloat(document.querySelector('#inputForm\\:yValue')?.value);
    const r = parseFloat(document.querySelector('#inputForm\\:rValue_input')?.value);

    if (isNaN(x) || isNaN(y) || isNaN(r)) {
        showError('Некорректные данные. Проверьте значения.');
        return;
    }

    if (y < -5 || y > 5) {
        showError('Координата Y должна быть в диапазоне от -5 до 5.');
        return;
    }

    if (r < 0 || r > 3) {
        showError('Радиус R должен быть в диапазоне от 0 до 3.');
        return;
    }

    const hit = checkAreaHit(x, y, r);

    points.push({x: x, y: y, r: r, hit: hit});

    updateResultsTable(x, y, r, hit);
}

function checkAreaHit(x, y, r) {
    if (x >= -r / 2 && x <= 0 && y <= r / 2 && y >= 0 && (x * x + y * y <= r * r)) {
        return true;
    }
    if (x >= r && x <= 0 && y >= -r / 2 && y <= 0) {
        return true;
    }
    if (x <= r / 2 && x >= 0 && y >= -r && y <= 0 && (y >= 2 * x - r)) {
        return true;
    }

    return false;
}

function showError(message) {
    document.getElementById('error').innerText = message;
}

function updateResultsTable(x, y, r, hit) {
    let tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = '';

    points.forEach(point => {
        let row = document.createElement('tr');
        row.innerHTML = `
                <td>${point.x}</td>
                <td>${point.y}</td>
                <td>${point.r}</td>
                <td>${point.hit ? 'Попадание' : 'Промах'}</td>
            `;
        tableBody.appendChild(row);
    });
}

function handleSvgClick(event) {
    const r = parseFloat(document.querySelector('#inputForm\\:rValue_input')?.value);

    if (isNaN(r)) {
        showError('Радиус R не указан.');
        return;
    }

    const svg = event.currentTarget;
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;

    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    const x = event.clientX - svgRect.left - centerX;
    const y = centerY - (event.clientY - svgRect.top);


    const scaledX = Number(((x / (svgWidth / 2)) * r * 2).toFixed(2));
    const scaledY = Number(((y / (svgHeight / 2)) * r * 2).toFixed(2));

    const hit = checkAreaHit(scaledX, scaledY, r);

    points.push({x: scaledX, y: scaledY, r: r, hit: hit});

    updateResultsTable(scaledX, scaledY, r, hit);

    drawPointOnSvg(x, y, r, hit);
}

function drawPointOnSvg(x, y, r, hit) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", -y.toString()); // инвертируем ось Y
    circle.setAttribute("r", "2.5"); // радиус круга
    circle.setAttribute("fill", hit ? "green" : "red");
    document.getElementById("coordinate-plane").appendChild(circle);
}
