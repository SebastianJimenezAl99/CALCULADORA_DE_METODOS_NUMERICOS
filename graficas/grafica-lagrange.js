/**
 * Dibuja la gráfica del polinomio de Lagrange y los puntos
 * @param {Array<number>} xs - valores de x conocidos
 * @param {Array<number>} ys - valores de y conocidos
 * @param {function} polinomio - función P(x) que devuelve el valor interpolado
 */
function dibujarGraficaLagrange(xs, ys, polinomio, xEval = null) {
    const canvas = document.getElementById('grafica');
    if (!canvas) return;

    // Generar rango de x para la curva
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const step = (maxX - minX) / 100;
    const curvaX = [];
    const curvaY = [];

    for (let x = minX; x <= maxX; x += step) {
        curvaX.push(x);
        curvaY.push(polinomio(x));
    }

    if (lagrangeChartInstance) {
        lagrangeChartInstance.destroy();
        lagrangeChartInstance = null;
    }

    // Dataset para el punto evaluado
    const puntoEvaluado = [];
    if (xEval !== null) {
        puntoEvaluado.push({ x: xEval, y: polinomio(xEval) });
    }

    chartInstance = new Chart(canvas, {
        type: 'line',
        data: {
            labels: curvaX,
            datasets: [
                {
                    label: 'Polinomio interpolante',
                    data: curvaY,
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.3,
                },
                {
                    label: 'Puntos conocidos',
                    data: xs.map((x, i) => ({ x: x, y: ys[i] })),
                    borderColor: 'red',
                    backgroundColor: 'red',
                    showLine: false,
                    pointRadius: 5,
                },
                {
                    label: 'Punto evaluado',
                    data: puntoEvaluado,
                    borderColor: 'green',
                    backgroundColor: 'green',
                    showLine: false,
                    pointRadius: 7,
                },
            ],
        },
        options: {
            responsive: false,
            scales: {
                x: { type: 'linear', title: { display: true, text: 'x' } },
                y: { title: { display: true, text: 'y' } },
            },
        },
    });
}
