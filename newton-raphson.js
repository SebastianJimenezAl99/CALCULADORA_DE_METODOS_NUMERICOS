function newtonRaphson(f, df, x0, tolerancia = 0.001) {
    if (typeof f !== 'function') throw new Error('f debe ser una función');
    if (df && typeof df !== 'function') throw new Error('df debe ser una función o null');
    if (typeof x0 !== 'number' || !isFinite(x0)) throw new Error('x0 debe ser un número finito');
    if (typeof tolerancia !== 'number' || tolerancia <= 0) throw new Error('tolerancia debe ser un número positivo');
    
    let x = x0;
    let iteraciones = "";
  
    for (let i = 1; i <= 10; i++) {
      let fx, dfx, xNuevo, error;
      try {
        fx = f(x);
        if (!isFinite(fx)) throw new Error(`f(${x}) no es finito`);
        
        dfx = df ? df(x) : (f(x + 1e-6) - f(x - 1e-6)) / (2e-6);
        if (!isFinite(dfx)) throw new Error(`f'(${x}) no es finito`);
        if (dfx === 0) throw new Error(`f'(${x}) es cero - no se puede continuar`);
    
        xNuevo = x - fx / dfx;
        if (!isFinite(xNuevo)) throw new Error('Nuevo valor de x no es finito');
        error = Math.abs(xNuevo - x);
        
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
      } catch (e) {
        throw new Error(`Error en iteración ${i}: ${e.message}`);
      }
    }
  
    return {
      resultado: x,
      iteracionesTexto: iteraciones + "No se llegó a la tolerancia en 10 iteraciones.\n",
      convergio: false
    };
  }
  
  