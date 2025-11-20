
// Implementación simple de spline cúbico natural (resuelve sistema tridiagonal)
function interpolacionSpline(xs, ys, x) {
    const n = xs.length;
    if (n < 2 || ys.length !== n) return 'Error: datos insuficientes';
    // paso 1: construir sistema para las segundas derivadas
    const h = [];
    for (let i = 0; i < n-1; i++) h.push(xs[i+1] - xs[i]);
  
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
  
    // localizar intervalo
    let i = n-2;
    for (let j = 0; j < n-1; j++){
      if (x >= xs[j] && x <= xs[j+1]) { i = j; break; }
    }
    const dx = x - xs[i];
    const S = ys[i] + b[i]*dx + c[i]*dx*dx + d[i]*dx*dx*dx;
    return S;
  }
  