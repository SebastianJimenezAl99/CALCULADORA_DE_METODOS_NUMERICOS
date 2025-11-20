// interpolacion-lineal.js
function interpolacionLineal(xs, ys, x) {
    if (!Array.isArray(xs) || !Array.isArray(ys)) throw new Error('xs e ys deben ser arrays');
    if (xs.length < 2 || ys.length < 2) throw new Error('Se necesitan al menos 2 puntos');
    if (xs.length !== ys.length) throw new Error('xs e ys deben tener la misma longitud');
    if (typeof x !== 'number' || !isFinite(x)) throw new Error('x debe ser un número finito');
    
    // buscar segmento
    for (let i = 0; i < xs.length - 1; i++) {
      if ((x >= xs[i] && x <= xs[i+1]) || (x >= xs[i+1] && x <= xs[i])) {
        const x0 = xs[i], x1 = xs[i+1], y0 = ys[i], y1 = ys[i+1];
        if (x1 === x0) throw new Error(`Puntos duplicados en x: ${x0}`);
        const t = (x - x0) / (x1 - x0);
        const resultado = y0 + t * (y1 - y0);
        if (!isFinite(resultado)) throw new Error('Resultado no finito');
        return resultado;
      }
    }
    throw new Error('x fuera del rango de los puntos');
  }
  