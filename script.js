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

// Core helper function to populate PDF template using pdf-lib
async function construirPDF(flatten = false) {
    const response = await fetch('Formato_Galapa_Editable.pdf');
    if (!response.ok) {
        throw new Error(`No se pudo cargar la plantilla PDF. Estado: ${response.status}`);
    }
    const existingPdfBytes = await response.arrayBuffer();

    // Load PDF with pdf-lib
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // Populate header / metadata fields
    const lugarVal = document.getElementById("lugarInput")?.value || "";
    const diaVal = document.getElementById("fechaDia")?.value || "";
    const mesVal = document.getElementById("fechaMes")?.value || "";
    const anoVal = document.getElementById("fechaAno")?.value || "";
    const actividadesVal = document.getElementById("actividadesInput")?.value || "";

    try { form.getTextField("lugar").setText(lugarVal); } catch (e) { }
    try { form.getTextField("dia").setText(diaVal); } catch (e) { }
    try { form.getTextField("mes").setText(mesVal); } catch (e) { }
    try { form.getTextField("ano").setText(anoVal); } catch (e) { }
    try { form.getTextField("actividades").setText(actividadesVal); } catch (e) { }

    // Populate table rows (1 to 17)
    const rows = document.querySelectorAll("#tablaBody tr");
    rows.forEach((row, index) => {
        const i = index + 1;
        if (i > 17) return;

        const inputs = row.querySelectorAll("input[type='text']");
        const check = row.querySelector("input[type='checkbox']");

        const idVal = inputs[0]?.value || "";
        const nombreVal = inputs[1]?.value || "";
        const telVal = inputs[2]?.value || "";
        const firmaVal = inputs[3]?.value || "";

        try { form.getTextField(`id_${i}`).setText(idVal); } catch (e) { }
        try { form.getTextField(`nombre_${i}`).setText(nombreVal); } catch (e) { }
        try { form.getTextField(`tel_${i}`).setText(telVal); } catch (e) { }
        try { form.getTextField(`firma_${i}`).setText(firmaVal); } catch (e) { }

        try {
            const checkBoxField = form.getCheckBox(`asist_${i}`);
            if (check && check.checked) {
                checkBoxField.check();
            } else {
                checkBoxField.uncheck();
            }
        } catch (e) { }
    });

    // Flatten form fields if non-editable PDF requested
    if (flatten) {
        form.flatten();
    }

    return await pdfDoc.save();
}

// Download Standalone Standard / Flattened PDF (Read-Only)
async function generarPDFNormal() {
    try {
        const pdfBytes = await construirPDF(true);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Formato_Galapa_Asistencia_Normal.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    } catch (err) {
        console.error("Error al generar el PDF normal:", err);
        alert("Ocurrió un error al generar el PDF normal: " + err.message);
    }
}

// Download Fillable / Editable PDF (AcroForm)
async function generarPDFEditable() {
    try {
        const pdfBytes = await construirPDF(false);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Formato_Galapa_Asistencia_Editable.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    } catch (err) {
        console.error("Error al generar el PDF editable:", err);
        alert("Ocurrió un error al generar el PDF editable: " + err.message);
    }
}

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
    limpiarTabla();
});
