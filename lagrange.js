// lagrange.js
function lagrange(xs, ys, x) {
  if (!Array.isArray(xs) || !Array.isArray(ys)) throw new Error('xs e ys deben ser arrays');
  if (xs.length < 2 || ys.length < 2) throw new Error('Se necesitan al menos 2 puntos');
  if (xs.length !== ys.length) throw new Error('xs e ys deben tener la misma longitud');
  if (typeof x !== 'number' || !isFinite(x)) throw new Error('x debe ser un número finito');
  
  const n = xs.length;
  let P = 0;
  for (let i = 0; i < n; i++) {
    let Li = 1;
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        if (xs[i] === xs[j]) throw new Error(`Puntos duplicados en x: ${xs[i]}`);
        Li *= (x - xs[j]) / (xs[i] - xs[j]);
      }
    }
    P += ys[i] * Li;
    if (!isFinite(P)) throw new Error('Resultado no finito');
  }
  return P;
}
