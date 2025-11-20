function falsaPosicion(f, a, b, tolerancia = 0.001) {
    let iteraciones = "";
    let c, error;
  
    if (f(a) * f(b) >= 0) {
      return {
        resultado: null,
        iteracionesTexto: "Error: no hay cambio de signo en el intervalo.",
        convergio: false
      };
    }
  
    for (let i = 1; i <= 10; i++) {
      const fa = f(a), fb = f(b);
  
      c = (a * fb - b * fa) / (fb - fa);
      error = Math.abs(f(c));
  
      iteraciones += `Iteración ${i}\n`;
      iteraciones += `  a = ${a}\n`;
      iteraciones += `  b = ${b}\n`;
      iteraciones += `  c = ${c}\n`;
      iteraciones += `  f(c) = ${f(c)}\n`;
      iteraciones += `  error = ${error}\n\n`;
  
      if (error < tolerancia) {
        return {
          resultado: c,
          iteracionesTexto: iteraciones + "Método convergió correctamente.\n",
          convergio: true
        };
      }
  
      if (fa * f(c) < 0) b = c;
      else a = c;
    }
  
    return {
      resultado: c,
      iteracionesTexto: iteraciones + "No se llegó a la tolerancia en 10 iteraciones.\n",
      convergio: false
    };
  }
  