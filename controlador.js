let chartInstance = null;        // Spline
let splineChartInstance = null;  // Opcional si quieres Spline separado
let linealChartInstance = null;  // Interpolación lineal
let lagrangeChartInstance = null; // Lagrange
// controlador.js FINAL COMPLETO (SOLO AGREGA EJEMPLOS EN LAS ETIQUETAS)

(function () {
  const metodoSelect = document.getElementById("metodo");
  const formArea = document.getElementById("formArea");
  const ejecutarBtn = document.getElementById("ejecutarBtn");
  const limpiarBtn = document.getElementById("limpiarBtn");
  const output = document.getElementById("output");
  const canvas = document.getElementById('grafica');
  
  if (!metodoSelect || !formArea || !ejecutarBtn || !limpiarBtn || !output) {
    console.error('Error: No se encontraron todos los elementos DOM requeridos');
    return;
  }

  /**
 * Devuelve una función segura para evaluar el spline en cualquier x
 * @param {Array<number>} xs 
 * @param {Array<number>} ys 
 * @returns {function} - función que devuelve interpolación spline en cualquier x dentro del rango
 */
function crearFuncionSpline(xs, ys) {
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  return function(x) {
      // Limitar x al rango de los puntos
      if (x < minX) x = minX;
      if (x > maxX) x = maxX;
      return interpolacionSpline(xs, ys, x);
  }
}

  // =================================
  // FUNCIÓN PARA LIMPIAR LA GRÁFICA
  // =================================
  function limpiarGrafica() {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    if (splineChartInstance) {
        splineChartInstance.destroy();
        splineChartInstance = null;
    }
    if (linealChartInstance) {
        linealChartInstance.destroy();
        linealChartInstance = null;
    }
    if (lagrangeChartInstance) {
        lagrangeChartInstance.destroy();
        lagrangeChartInstance = null;
    }
  }


  // ========== FORMULARIOS (CON EJEMPLOS EN LAS ETIQUETAS) ============
  const commonFields = {
    func: { name: "func", label: "Función f(x) (Ej: x*x - 4)", type: "text" },
    tol: { name: "tol", label: "Tolerancia (Ej: 0.001)", type: "number", step: "any" },
  };
  
  const forms = {
    biseccion: [
      commonFields.func,
      { name: "a", label: "Valor a (Ej: 0)", type: "number" },
      { name: "b", label: "Valor b (Ej: 5)", type: "number" },
      commonFields.tol,
    ],

    falsaPosicion: [
      commonFields.func,
      { name: "a", label: "Valor a (Ej: 0)", type: "number" },
      { name: "b", label: "Valor b (Ej: 5)", type: "number" },
      commonFields.tol,
    ],

    puntoFijo: [
      // amazonq-ignore-next-line
      { name: "g", label: "g(x) (Ej: Math.sqrt(4))", type: "text" },
      { name: "x0", label: "Valor inicial x0 (Ej: 1)", type: "number" },
      commonFields.tol,
    ],

    newtonRaphson: [
      commonFields.func,
      { name: "dfunc", label: "f'(x) (Ej: 2*x)", type: "text" },
      { name: "x0", label: "Valor inicial x0 (Ej: 2)", type: "number" },
      commonFields.tol,
    ],

    jacobi: [
      { name: "matrix", label: "Matriz A (JSON) (Ej: [[4,-1],[-1,4]])", type: "textarea" },
      { name: "b", label: "Vector b (JSON) (Ej: [2,2])", type: "text" },
      commonFields.tol,
    ],

    gaussSeidel: [
      { name: "matrix", label: "Matriz A (JSON) (Ej: [[4,-1],[-1,4]])", type: "textarea" },
      { name: "b", label: "Vector b (JSON) (Ej: [2,2])", type: "text" },
      commonFields.tol,
    ],

    // MÉTODOS NO ITERATIVOS
    gaussJordan: [
      { name: "matrix", label: "Matriz A (JSON) (Ej: [[2,1],[5,7]])", type: "textarea" },
      { name: "b", label: "Vector b (JSON) (Ej: [11,13])", type: "text" },
    ],

    interpolacionLineal: [
      { name: "xvals", label: "Valores x (Ej: 1,2,3)", type: "text" },
      { name: "yvals", label: "Valores y (Ej: 2,4,6)", type: "text" },
      { name: "x", label: "x a interpolar (Ej: 2.5)", type: "number" },
    ],

    interpolacionSpline: [
      { name: "xvals", label: "Valores x (Ej: 1,2,3)", type: "text" },
      { name: "yvals", label: "Valores y (Ej: 2,4,6)", type: "text" },
      { name: "x", label: "x a interpolar (Ej: 2.5)", type: "number" },
    ],

    trapecioCompuesto: [
      { name: "func", label: "Función f(x) (Ej: Math.sin(x))", type: "text" },
      { name: "a", label: "a (Ej: 0)", type: "number" },
      { name: "b", label: "b (Ej: 3.14)", type: "number" },
      { name: "n", label: "Subintervalos n (Ej: 4)", type: "number" },
    ],

    lagrange: [
      { name: "xvals", label: "Valores x (Ej: 1,2,3)", type: "text" },
      { name: "yvals", label: "Valores y (Ej: 1,4,9)", type: "text" },
      { name: "x", label: "x a evaluar (Ej: 2.5)", type: "number" },
    ],
  };

  // =======================================================

  function renderForm(method) {
    formArea.innerHTML = "";

    if (!method || !forms[method]) {
      formArea.innerHTML = `<p class="hint">Seleccione un método.</p>`;
      return;
    }

    const campos = forms[method];
    const row = document.createElement("div");
    row.className = "row";

    campos.forEach((c) => {
      const group = document.createElement("div");
      group.className = "input-group";

      const label = document.createElement("label");
      label.textContent = c.label;
      group.appendChild(label);

      let input;

      if (c.type === "textarea") {
        input = document.createElement("textarea");
        input.rows = 3;
      } else {
        input = document.createElement("input");
        input.type = c.type;
      }

      if (c.step) input.step = c.step;
      input.name = c.name;

      group.appendChild(input);
      row.appendChild(group);
    });

    formArea.appendChild(row);
  }

  metodoSelect.addEventListener("change", (e) => {
    if (!e.isTrusted) return;
    renderForm(metodoSelect.value); // o "" al limpiar
    limpiarGrafica();
    output.textContent = "";
  });

  limpiarBtn.addEventListener("click", (e) => {
    if (!e.isTrusted) return;
    metodoSelect.value = "";
    renderForm(metodoSelect.value); // o "" al limpiar
    limpiarGrafica();
    output.textContent = "";
  });

  // ==================================================
  // EJECUCIÓN DEL MÉTODO
  // ==================================================
  ejecutarBtn.addEventListener("click", (e) => {
    // Verificar que el evento proviene de interacción del usuario
    limpiarGrafica();
    if (!e.isTrusted) {
      
      output.textContent = "Acción no permitida";
      return;
    }
    
    const metodo = metodoSelect.value;
    if (!metodo) {
      output.textContent = "Seleccione un método.";
      return;
    }

    try {
      const data = {};
      const inputs = formArea.querySelectorAll("input, textarea");
      
      // Validar que todos los campos requeridos estén llenos
      for (const inp of inputs) {
        if (!inp.value.trim()) {
          throw new Error(`El campo ${inp.name} es requerido`);
        }
        data[inp.name] = inp.value;
      }

      let res;

      // ============================
      // MÉTODOS ITERATIVOS
      // ============================
      if (metodo === "biseccion") {
        let f;
        try {
          f = new Function("x", `return ${data.func};`);
        } catch (e) {
          throw new Error('Sintaxis inválida en la función');
        }
        res = biseccion(f, Number(data.a), Number(data.b), Number(data.tol));
      }

      else if (metodo === "falsaPosicion") {
        let f;
        try {
          f = new Function("x", `return ${data.func};`);
        } catch (e) {
          throw new Error('Sintaxis inválida en la función');
        }
        res = falsaPosicion(f, Number(data.a), Number(data.b), Number(data.tol));
      }

      else if (metodo === "puntoFijo") {
        let g;
        try {
          g = new Function("x", `return ${data.g};`);
        } catch (e) {
          throw new Error('Sintaxis inválida en g(x)');
        }
        res = puntoFijo(g, Number(data.x0), Number(data.tol));
      }

      else if (metodo === "newtonRaphson") {
        let f, df = null;
        try {
          f = new Function("x", `return ${data.func};`);
          if (data.dfunc) df = new Function("x", `return ${data.dfunc};`);
        } catch (e) {
          throw new Error('Sintaxis inválida en las funciones');
        }
        res = newtonRaphson(f, df, Number(data.x0), Number(data.tol));
      }

      else if (metodo === "jacobi") {
        let matrix, b;
        try {
          matrix = JSON.parse(data.matrix);
          b = JSON.parse(data.b);
        } catch (e) {
          throw new Error('Formato JSON inválido en matriz o vector');
        }
        res = jacobi(matrix, b, Number(data.tol));
      }

      else if (metodo === "gaussSeidel") {
        let matrix, b;
        try {
          matrix = JSON.parse(data.matrix);
          b = JSON.parse(data.b);
        } catch (e) {
          throw new Error('Formato JSON inválido en matriz o vector');
        }
        res = gaussSeidel(matrix, b, Number(data.tol));
      }

      // ============================
      // MÉTODOS NO ITERATIVOS
      // ============================
      else if (metodo === "gaussJordan") {
        let matrix, b;
        try {
          matrix = JSON.parse(data.matrix);
          b = JSON.parse(data.b);
        } catch (e) {
          throw new Error('Formato JSON inválido en matriz o vector');
        }
        res = gaussJordan(matrix, b);
      }

      // ====== INTERPOLACIÓN LINEAL ======
      else if (metodo === "interpolacionLineal") {
        const xs = data.xvals.split(",").map(s => Number(s.trim()));
        const ys = data.yvals.split(",").map(s => Number(s.trim()));
        const x = Number(data.x);

         // ✅ Validar que x esté dentro del rango
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        if (x < minX || x > maxX) {
            output.textContent = `Error: x fuera del rango de los datos (${minX} a ${maxX})`;
            return; // sale de la función sin intentar interpolar
        }

        let y;
        for (let i = 0; i < xs.length - 1; i++) {
            if (x >= xs[i] && x <= xs[i + 1]) {
                y = ys[i] + ((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i])) * (x - xs[i]);
                break;
            }
        }
        res = y;

        output.textContent = `P(${x}) = ${res.toFixed(6)}`;

        dibujarGraficaLineal(xs, ys, xi => {
          for (let i = 0; i < xs.length - 1; i++) {
              if (xi >= xs[i] && xi <= xs[i + 1]) {
                  return ys[i] + ((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i])) * (xi - xs[i]);
              }
          }
          return null;
      }, x);
      
      }
    
    // ====== INTERPOLACIÓN SPLINE ======
    else if (metodo === "interpolacionSpline") {
      const xs = data.xvals.split(",").map(s => Number(s.trim()));
      const ys = data.yvals.split(",").map(s => Number(s.trim()));
      const x = Number(data.x);

      const splineFunc = crearFuncionSpline(xs, ys); // función segura para evaluar
      res = splineFunc(x);

      output.textContent = `P(${x}) = ${res.toFixed(6)}`;

      dibujarGraficaSpline(xs, ys, splineFunc, x);
    }
    
      else if (metodo === "trapecioCompuesto") {
        let f;
        try {
          f = new Function("x", `return ${data.func};`);
        } catch (e) {
          throw new Error('Sintaxis inválida en la función');
        }
        res = trapecioCompuesto(f, Number(data.a), Number(data.b), Number(data.n));
      }

      if (metodo === "lagrange") {
        const xs = data.xvals.split(",").map(s => Number(s.trim()));
        const ys = data.yvals.split(",").map(s => Number(s.trim()));
        const x = Number(data.x);

        res = lagrange(xs, ys, x);

        output.textContent = `P(${x}) = ${res.toFixed(6)}`;

        dibujarGraficaLagrange(xs, ys, xi => lagrange(xs, ys, xi), x);
      }
    

      // ============================
      // MOSTRAR RESULTADO
      // ============================
      let texto = "";

      if (typeof res === "object" && res.iteracionesTexto !== undefined) {
        texto += "====== ITERACIONES ======\n\n";
        texto += res.iteracionesTexto + "\n";

        texto += "====== RESULTADO FINAL ======\n";
        texto += JSON.stringify(res.resultado, null, 2) + "\n\n";

        texto += res.convergio
          ? "✔️ El método convergió correctamente."
          : "⚠️ No convergió en 10 iteraciones.";
      }

      else {
        texto += "====== RESULTADO ======\n\n";
        texto += res.toFixed(6); // muestra siempre 6 decimales
      }

      output.textContent = texto;

    } catch (error) {
      output.textContent = "Error: " + (error.message || error.toString());
      console.error('Error en ejecución:', error);
    }
  });
})();

