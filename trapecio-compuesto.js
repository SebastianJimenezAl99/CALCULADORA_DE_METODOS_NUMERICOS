// trapecio-compuesto.js
function trapecioCompuesto(f, a, b, n = 100) {
    if (n <= 0 || !Number.isInteger(n)) return 'n debe ser un entero positivo';
    const h = (b - a) / n;
    let sum = 0.5 * (f(a) + f(b));
    for (let i = 1; i < n; i++) sum += f(a + i * h);
    return sum * h;
  }
  