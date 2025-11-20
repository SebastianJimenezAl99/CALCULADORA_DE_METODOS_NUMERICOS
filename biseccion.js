function biseccion(f, a, b, tolerancia = 0.001) {
  if (typeof f !== 'function') throw new Error('f debe ser una función');
  if (typeof a !== 'number' || !isFinite(a)) throw new Error('a debe ser un número finito');
  if (typeof b !== 'number' || !isFinite(b)) throw new Error('b debe ser un número finito');
  if (a >= b) throw new Error('a debe ser menor que b');
  if (typeof tolerancia !== 'number' || tolerancia <= 0) throw new Error('tolerancia debe ser un número positivo');
  
  const createResult = (resultado, mensaje, convergio) => ({
    resultado,
    iteracionesTexto: mensaje,
    convergio
  });
  
  const iteraciones = [];
  let c, error;
  let fa, fb;
  
  try {
    fa = f(a);
    fb = f(b);
    if (!isFinite(fa) || !isFinite(fb)) throw new Error('La función no está definida en los extremos del intervalo');
  } catch (e) {
    throw new Error('Error evaluando la función: ' + e.message);
  }

  if (fa * fb >= 0) {
    return createResult(null, "Error: no hay cambio de signo en el intervalo.", false);
  }

  for (let i = 1; i <= 10; i++) {
    c = (a + b) / 2;
    let fc;
    try {
      fc = f(c);
      if (!isFinite(fc)) throw new Error(`f(${c}) no es finito`);
    } catch (e) {
      throw new Error(`Error en iteración ${i}: ${e.message}`);
    }
    error = Math.abs(b - a) / 2;

    iteraciones.push(`Iteración ${i}`);
    iteraciones.push(`  a = ${a}`);
    iteraciones.push(`  b = ${b}`);
    iteraciones.push(`  c = ${c}`);
    iteraciones.push(`  f(c) = ${fc}`);
    iteraciones.push(`  error = ${error}`, '');

    if (error < tolerancia || Math.abs(fc) < tolerancia) {
      return createResult(c, iteraciones.join('\n') + "\nMétodo convergió correctamente.\n", true);
    }

    if (fa * fc < 0) {
      b = c;
      fb = fc;
    } else {
      a = c;
      fa = fc;
    }
  }

  return createResult(c, iteraciones.join('\n') + "\nNo se llegó a la tolerancia en 10 iteraciones.\n", false);
}

