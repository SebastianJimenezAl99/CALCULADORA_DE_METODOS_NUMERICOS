// lagrange.js
function lagrange(xs, ys, x) {
  const n = xs.length;
  if (ys.length !== n) return 'Error: vectores de diferente longitud';
  let P = 0;
  for (let i = 0; i < n; i++) {
    let Li = 1;
    for (let j = 0; j < n; j++) {
      if (j !== i) Li *= (x - xs[j]) / (xs[i] - xs[j]);
    }
    P += ys[i] * Li;
  }
  return P;
}
