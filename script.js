// Element references
const tbody = document.getElementById("tablaBody");

// Initialize table with 17 empty rows by default
function inicializarTablaVacia(filas = 17) {
    if (!tbody) return;
    tbody.innerHTML = "";
    for (let i = 1; i <= filas; i++) {
        crearFila(i);
    }
}

// Create a single row in the attendance table
function crearFila(index, idValue = "", nombreValue = "", telValue = "") {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="col-no">${index}</td>
        <td class="col-id">
            <input type="text" class="cell-input center bold" value="${idValue}">
        </td>
        <td class="col-name">
            <input type="text" class="cell-input bold uppercase" value="${nombreValue}">
        </td>
        <td class="col-tel">
            <input type="text" class="cell-input center" value="${telValue}">
        </td>
        <td class="col-firma">
            <input type="text" class="cell-input" value="">
        </td>
        <td class="col-asist check-cell">
            <input type="checkbox" class="check-box-input">
        </td>
        <td class="col-action no-print">
            <button class="btn-del-row" title="Eliminar Fila" onclick="eliminarFila(this)">✕</button>
        </td>
    `;

    tbody.appendChild(tr);
}

// Add a new row to the end of the table
function agregarFila() {
    const nextIndex = tbody.children.length + 1;
    crearFila(nextIndex);
    actualizarNumeracion();
}

// Remove a row from the table
function eliminarFila(btn) {
    const row = btn.closest("tr");
    if (row) {
        row.remove();
        actualizarNumeracion();
    }
}

// Update row numbers sequentially (1, 2, 3...)
function actualizarNumeracion() {
    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row, i) => {
        const noCell = row.querySelector(".col-no");
        if (noCell) noCell.textContent = i + 1;
    });
}

// Clear all inputs and reset table to 17 empty rows
function limpiarTabla() {
    const lugar = document.getElementById("lugarInput");
    const dia = document.getElementById("fechaDia");
    const mes = document.getElementById("fechaMes");
    const ano = document.getElementById("fechaAno");
    const actividades = document.getElementById("actividadesInput");

    if (lugar) lugar.value = "";
    if (dia) dia.value = "";
    if (mes) mes.value = "";
    if (ano) ano.value = "";
    if (actividades) actividades.value = "";

    inicializarTablaVacia(17);
}

// Download Standalone Fillable/Editable PDF
function generarPDFEditable() {
    const link = document.createElement('a');
    link.href = 'Formato_Galapa_Editable.pdf';
    link.download = 'Formato_Galapa_Editable.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
    limpiarTabla();
});
