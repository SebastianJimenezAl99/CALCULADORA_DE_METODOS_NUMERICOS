/**
 * Dibuja la gráfica de interpolación lineal
 * @param {Array<number>} xs - valores de x conocidos
 * @param {Array<number>} ys - valores de y conocidos
 * @param {function} f - función que calcula la interpolación (opcional)
 * @param {number|null} xEval - valor de x evaluado
 */
function dibujarGraficaLineal(xs, ys, f, xEval = null) {
    const canvas = document.getElementById('grafica');
    if (!canvas) return;

    // destruir chart anterior si existe
    if (linealChartInstance) {
        linealChartInstance.destroy();
        linealChartInstance = null;
    }

    // datos de la línea
    const dataLine = [];
    for (let i = 0; i < xs.length - 1; i++) {
        dataLine.push({ x: xs[i], y: ys[i] });
        dataLine.push({ x: xs[i + 1], y: ys[i + 1] });
    }

    // punto evaluado
    const puntoEvaluado = [];
    if (xEval !== null && f) {
        const yEval = f(xEval);
        puntoEvaluado.push({ x: xEval, y: yEval });
    }

    linealChartInstance = new Chart(canvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Interpolación lineal',
                    data: dataLine,
                    borderColor: 'blue',
                    fill: false,
                    tension: 0
                },
                {
                    label: 'Puntos conocidos',
                    data: xs.map((x, i) => ({ x: x, y: ys[i] })),
                    borderColor: 'red',
                    backgroundColor: 'red',
                    showLine: false,
                    pointRadius: 5
                },
                {
                    label: 'Punto evaluado',
                    data: puntoEvaluado,
                    borderColor: 'green',
                    backgroundColor: 'green',
                    showLine: false,
                    pointRadius: 7
                }
            ]
        },
        options: {
            responsive: false,
            scales: {
                x: { type: 'linear', title: { display: true, text: 'x' } },
                y: { title: { display: true, text: 'y' } }
            }
        }
    });
}
