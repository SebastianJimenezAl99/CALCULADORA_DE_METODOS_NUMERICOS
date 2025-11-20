function puntoFijo(g, x0, tolerancia = 0.001) {
    if (typeof g !== 'function') throw new Error('g debe ser una función');
    if (typeof x0 !== 'number' || !isFinite(x0)) throw new Error('x0 debe ser un número finito');
    if (typeof tolerancia !== 'number' || tolerancia <= 0) throw new Error('tolerancia debe ser un número positivo');
    
    let iteraciones = "";
    let x = x0;
    let error = Infinity;
  
    for (let i = 1; i <= 10; i++) {
      try {
        const xNuevo = g(x);
        if (!isFinite(xNuevo)) throw new Error(`g(${x}) no es finito`);
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
      } catch (error) {
        throw new Error(`Error en iteración ${i}: ${error.message}`);
      }
    }
  
    return {
      resultado: x,
      iteracionesTexto: iteraciones + "No se llegó a la tolerancia en 10 iteraciones.\n",
      convergio: false
    };
  }
  