function gaussSeidel(A, b, tol = 0.001) {
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
  let iteraciones = "";

  for (let iter = 1; iter <= 10; iter++) {
    let xAnterior = x.slice();
    let error = 0;

    try {
      for (let i = 0; i < n; i++) {
        let suma = 0;
        for (let j = 0; j < n; j++) {
          if (j !== i) suma += A[i][j] * x[j];
        }
        x[i] = (b[i] - suma) / A[i][i];
        if (!isFinite(x[i])) throw new Error(`Valor no finito en x[${i}]`);
        error = Math.max(error, Math.abs(x[i] - xAnterior[i]));
      }
    } catch (e) {
      throw new Error(`Error en iteración ${iter}: ${e.message}`);
    }

    iteraciones += `Iteración ${iter}\n`;
    for (let i = 0; i < n; i++) {
      iteraciones += `  x${i + 1} = ${x[i]}\n`;
    }
    iteraciones += `  error = ${error}\n\n`;

    if (error < tol) {
      return {
        resultado: x,
        iteracionesTexto: iteraciones + "Método convergió correctamente.\n",
        convergio: true
      };
    }
  }

  return {
    resultado: x,
    iteracionesTexto: iteraciones + "No se llegó a la tolerancia en 10 iteraciones.\n",
    convergio: false
  };
}

