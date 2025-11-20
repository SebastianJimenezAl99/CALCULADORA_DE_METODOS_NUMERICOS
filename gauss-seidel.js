function gaussSeidel(A, b, tol = 0.001) {
  const n = A.length;
  let x = new Array(n).fill(0);
  let iteraciones = "";

  for (let iter = 1; iter <= 10; iter++) {
    let xAnterior = x.slice();
    let error = 0;

    for (let i = 0; i < n; i++) {
      let suma = 0;
      for (let j = 0; j < n; j++) {
        if (j !== i) suma += A[i][j] * x[j];
      }
      x[i] = (b[i] - suma) / A[i][i];
      error = Math.max(error, Math.abs(x[i] - xAnterior[i]));
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

