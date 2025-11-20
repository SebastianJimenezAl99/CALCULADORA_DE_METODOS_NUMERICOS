
/**
 * Dibuja la gráfica del spline cúbico y los puntos
 * @param {Array<number>} xs - valores x conocidos
 * @param {Array<number>} ys - valores y conocidos
 * @param {function} splineFunc - función que devuelve interpolación en cualquier x
 * @param {number|null} xEval - punto evaluado opcional
 */
function dibujarGraficaSpline(xs, ys, splineFunc, xEval = null) {
    const canvas = document.getElementById('grafica'); // canvas único
    if (!canvas) return;

    // destruir gráfica anterior de Spline si existe
    if (splineChartInstance) {
        splineChartInstance.destroy();
        splineChartInstance = null;
    }

    // generar datos de la curva
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const step = (maxX - minX) / 100;

    const curvaData = [];
    for (let xi = minX; xi <= maxX; xi += step) {
        curvaData.push({ x: xi, y: splineFunc(xi) });
    }


    // punto evaluado
const puntoEvaluado = [];
if (xEval !== null) {
    // limitar xEval al rango de xs
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    let xEvalLimit = Math.max(Math.min(xEval, maxX), minX);
    
    // evaluar spline
    const yEval = splineFunc(xEvalLimit);
    puntoEvaluado.push({ x: xEvalLimit, y: yEval });
}


    // crear la gráfica
    splineChartInstance = new Chart(canvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Spline cúbico',
                    data: curvaData,
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.3
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
                y: { title: { display: true, text: 'y' } },
            },
        },
    });
}
