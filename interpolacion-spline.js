
// Implementación simple de spline cúbico natural (resuelve sistema tridiagonal)
function interpolacionSpline(xs, ys, x) {
    if (!Array.isArray(xs) || !Array.isArray(ys)) throw new Error('xs e ys deben ser arrays');
    if (xs.length < 2 || ys.length < 2) throw new Error('Se necesitan al menos 2 puntos');
    if (xs.length !== ys.length) throw new Error('xs e ys deben tener la misma longitud');
    if (typeof x !== 'number' || !isFinite(x)) throw new Error('x debe ser un número finito');
    
    const n = xs.length;
    // paso 1: construir sistema para las segundas derivadas
    const h = [];
    for (let i = 0; i < n-1; i++) {
        const hi = xs[i+1] - xs[i];
        if (hi <= 0) throw new Error('Los valores de x deben estar ordenados y ser únicos');
        h.push(hi);
    }
  
    const alpha = [0];
    for (let i = 1; i < n-1; i++) {
      alpha.push((3/h[i])*(ys[i+1]-ys[i]) - (3/h[i-1])*(ys[i]-ys[i-1]));
    }
  
    // tridiagonal system
    const l = new Array(n).fill(0), mu = new Array(n).fill(0), z = new Array(n).fill(0);
    l[0] = 1; mu[0] = 0; z[0] = 0;
    for (let i = 1; i < n-1; i++){
      l[i] = 2*(xs[i+1]-xs[i-1]) - h[i-1]*mu[i-1];
      mu[i] = h[i]/l[i];
      z[i] = (alpha[i]-h[i-1]*z[i-1])/l[i];
    }
    l[n-1] = 1; z[n-1] = 0;
  
    const c = new Array(n).fill(0), b = new Array(n).fill(0), d = new Array(n).fill(0);
    c[n-1] = 0;
    for (let j = n-2; j >= 0; j--) {
      c[j] = z[j] - mu[j]*c[j+1];
      b[j] = (ys[j+1]-ys[j])/h[j] - h[j]*(c[j+1]+2*c[j])/3;
      d[j] = (c[j+1]-c[j])/(3*h[j]);
    }
  
    // localizar intervalo usando búsqueda binaria
    let left = 0, right = n-2, i = n-2;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (x >= xs[mid] && x <= xs[mid+1]) {
        i = mid;
        break;
      } else if (x < xs[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    const dx = x - xs[i];
    const dx2 = dx * dx;
    const S = ys[i] + b[i]*dx + c[i]*dx2 + d[i]*dx2*dx;
    return S;
  }
  