function jacobi(A, b, tol = 0.001) {
  if (!Array.isArray(A) || !Array.isArray(b)) throw new Error('A y b deben ser arrays');
  if (A.length === 0 || b.length === 0) throw new Error('A y b no pueden estar vacíos');
  if (A.length !== b.length) throw new Error('A y b deben tener dimensiones compatibles');
  if (typeof tol !== 'number' || tol <= 0) throw new Error('tolerancia debe ser un número positivo');
  
  const n = A.length;
  for (let i = 0; i < n; i++) {
    if (!Array.isArray(A[i]) || A[i].length !== n) throw new Error('A debe ser una matriz cuadrada');
    if (A[i][i] === 0) throw new Error(`Elemento diagonal A[${i}][${i}] es cero`);
  }
  
  let x = new Array(n).fill(0);
  let xNuevo = new Array(n).fill(0);

  const iteraciones = [];

  for (let iter = 1; iter <= 10; iter++) {
    try {
      for (let i = 0; i < n; i++) {
        let suma = 0;
        for (let j = 0; j < n; j++) {
          if (j !== i) suma += A[i][j] * x[j];
        }
        xNuevo[i] = (b[i] - suma) / A[i][i];
        if (!isFinite(xNuevo[i])) throw new Error(`Valor no finito en x[${i}]`);
      }
    } catch (error) {
      throw new Error(`Error en iteración ${iter}: ${error.message}`);
    }

    let error = 0;
    for (let i = 0; i < n; i++) {
      error = Math.max(error, Math.abs(xNuevo[i] - x[i]));
    }

    iteraciones.push(`Iteración ${iter}`);
    for (let i = 0; i < n; i++) {
      iteraciones.push(`  x${i + 1} = ${xNuevo[i]}`);
    }
    iteraciones.push(`  error = ${error}`, '');

    if (error < tol) {
      return {
        resultado: xNuevo,
        iteracionesTexto: iteraciones.join('\n') + "\nMétodo convergió correctamente.\n",
        convergio: true
      };
    }

    [x, xNuevo] = [xNuevo, x];
  }

  return {
    resultado: x,
    iteracionesTexto: iteraciones.join('\n') + "\nNo se llegó a la tolerancia en 10 iteraciones.\n",
    convergio: false
  };
}

