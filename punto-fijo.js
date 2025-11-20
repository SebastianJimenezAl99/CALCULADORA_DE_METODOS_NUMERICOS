function puntoFijo(g, x0, tolerancia = 0.001) {
    let iteraciones = "";
    let x = x0;
    let error = Infinity;
  
    for (let i = 1; i <= 10; i++) {
      const xNuevo = g(x);
      error = Math.abs(xNuevo - x);
  
      iteraciones += `Iteración ${i}\n`;
      iteraciones += `  x = ${x}\n`;
      iteraciones += `  g(x) = ${xNuevo}\n`;
      iteraciones += `  error = ${error}\n\n`;
  
      if (error < tolerancia) {
        return {
          resultado: xNuevo,
          iteracionesTexto: iteraciones + "Método convergió correctamente.\n",
          convergio: true
        };
      }
  
      x = xNuevo;
    }
  
    return {
      resultado: x,
      iteracionesTexto: iteraciones + "No se llegó a la tolerancia en 10 iteraciones.\n",
      convergio: false
    };
  }
  