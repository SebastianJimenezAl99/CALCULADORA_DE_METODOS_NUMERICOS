function newtonRaphson(f, df, x0, tolerancia = 0.001) {
    let x = x0;
    let iteraciones = "";
  
    for (let i = 1; i <= 10; i++) {
      const fx = f(x);
      const dfx = df ? df(x) : (f(x + 1e-6) - f(x - 1e-6)) / (2e-6);
  
      const xNuevo = x - fx / dfx;
      const error = Math.abs(xNuevo - x);
  
      iteraciones += `Iteración ${i}\n`;
      iteraciones += `  x = ${x}\n`;
      iteraciones += `  f(x) = ${fx}\n`;
      iteraciones += `  f'(x) = ${dfx}\n`;
      iteraciones += `  x nuevo = ${xNuevo}\n`;
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
  
  