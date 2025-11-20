//lagrange.js
function lagrange(xs, ys, x) {
  // Validar que xs y ys sean arrays
  if (!Array.isArray(xs) || !Array.isArray(ys)) throw new Error('xs e ys deben ser arrays');
  if (xs.length < 2 || ys.length < 2) throw new Error('Se necesitan al menos 2 puntos');
  if (xs.length !== ys.length) throw new Error('xs e ys deben tener la misma longitud');

  // Convertir cada elemento a número y validar
  const X = xs.map((s, i) => {
    const num = Number(s.toString().trim());
    if (isNaN(num)) throw new Error(`xs[${i}] no es un número válido`);
    return num;
  });

  const Y = ys.map((s, i) => {
    const num = Number(s.toString().trim());
    if (isNaN(num)) throw new Error(`ys[${i}] no es un número válido`);
    return num;
  });

  // Validar que x sea número finito
  if (typeof x !== 'number' || !isFinite(x)) throw new Error('x debe ser un número finito');

  // Interpolación de Lagrange
  const n = X.length;
  let P = 0;

  for (let i = 0; i < n; i++) {
    let Li = 1;
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        if (X[i] === X[j]) throw new Error(`Puntos duplicados en x: ${X[i]}`);
        Li *= (x - X[j]) / (X[i] - X[j]);
      }
    }
    P += Y[i] * Li;

    if (!isFinite(P)) throw new Error('Resultado no finito');
  }

  return P;
}


