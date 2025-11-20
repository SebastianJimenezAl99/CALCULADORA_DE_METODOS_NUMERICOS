function biseccion(f, a, b, tolerancia = 0.001) {
  let iteraciones = "";
  let c, error;
  let fa = f(a), fb = f(b);

  if (fa * fb >= 0) {
    return {
      resultado: null,
      iteracionesTexto: "Error: no hay cambio de signo en el intervalo.",
      convergio: false
    };
  }

  for (let i = 1; i <= 10; i++) {
    c = (a + b) / 2;
    const fc = f(c);
    error = Math.abs(b - a) / 2;

    iteraciones += `Iteración ${i}\n`;
    iteraciones += `  a = ${a}\n`;
    iteraciones += `  b = ${b}\n`;
    iteraciones += `  c = ${c}\n`;
    iteraciones += `  f(c) = ${fc}\n`;
    iteraciones += `  error = ${error}\n\n`;

    if (error < tolerancia || Math.abs(fc) < tolerancia) {
      return {
        resultado: c,
        iteracionesTexto: iteraciones + "Método convergió correctamente.\n",
        convergio: true
      };
    }

    if (fa * fc < 0) {
      b = c;
      fb = fc;
    } else {
      a = c;
      fa = fc;
    }
  }

  return {
    resultado: c,
    iteracionesTexto: iteraciones + "No se llegó a la tolerancia en 10 iteraciones.\n",
    convergio: false
  };
}

