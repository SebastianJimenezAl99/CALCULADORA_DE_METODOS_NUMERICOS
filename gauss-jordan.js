// gauss-jordan.js (versión limpia)
function gaussJordan(A, b) {
  if (!Array.isArray(A) || !Array.isArray(b)) return;
  const n = A.length;
  if (b.length !== n) return;

  for (let i = 0; i < n; i++) {
    if (!Array.isArray(A[i]) || A[i].length !== n) return;
  }

  let M = [];
  for (let i = 0; i < n; i++) {
    M[i] = [...A[i], b[i]];
  }

  for (let i = 0; i < n; i++) {
    if (M[i][i] === 0) {
      let filaCambio = -1;
      for (let k = i + 1; k < n; k++) {
        if (M[k][i] !== 0) {
          filaCambio = k;
          break;
        }
      }
      if (filaCambio === -1) return;
      [M[i], M[filaCambio]] = [M[filaCambio], M[i]];
    }

    let pivote = M[i][i];
    if (pivote === 0) return;

    for (let j = 0; j <= n; j++) {
      M[i][j] /= pivote;
    }

    for (let k = 0; k < n; k++) {
      if (k !== i) {
        let factor = M[k][i];
        for (let j = 0; j <= n; j++) {
          M[k][j] -= factor * M[i][j];
        }
      }
    }
  }

  return M.map(row => row[n]);
}
