// interpolacion-lineal.js
function interpolacionLineal(xs, ys, x) {
    if (xs.length !== ys.length) return 'Error: vectores de diferente longitud';
    // buscar segmento
    for (let i = 0; i < xs.length - 1; i++) {
      if ((x >= xs[i] && x <= xs[i+1]) || (x >= xs[i+1] && x <= xs[i])) {
        const x0 = xs[i], x1 = xs[i+1], y0 = ys[i], y1 = ys[i+1];
        const t = (x - x0) / (x1 - x0);
        return y0 + t * (y1 - y0);
      }
    }
    return 'x fuera del rango de los puntos';
  }
  