// trapecio-compuesto.js
function trapecioCompuesto(f, a, b, n = 100) {
    if (typeof f !== 'function') throw new Error('f debe ser una función');
    if (typeof a !== 'number' || !isFinite(a)) throw new Error('a debe ser un número finito');
    if (typeof b !== 'number' || !isFinite(b)) throw new Error('b debe ser un número finito');
    if (a >= b) throw new Error('a debe ser menor que b');
    if (n <= 0 || !Number.isInteger(n)) throw new Error('n debe ser un entero positivo');
    
    const h = (b - a) / n;
    try {
        let sum = 0.5 * (f(a) + f(b));
        for (let i = 1; i < n; i++) {
            const val = f(a + i * h);
            if (!isFinite(val)) throw new Error(`Función no definida en x = ${a + i * h}`);
            sum += val;
        }
        return sum * h;
    } catch (error) {
        throw new Error(`Error en evaluación: ${error.message}`);
    }
}
  