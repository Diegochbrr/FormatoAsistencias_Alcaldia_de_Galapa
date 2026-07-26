// Element references
const pagesContainer = document.getElementById("pagesContainer");

// Create HTML element for a single 17-person page sheet
function crearElementoPagina(pageNum = 1) {
    const div = document.createElement("div");
    div.className = "page";
    div.dataset.pageNum = pageNum;

    div.innerHTML = `
        <div class="page-header-actions no-print">
            <button class="btn-del-page" title="Eliminar esta página" onclick="eliminarPagina(this)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Eliminar Página
            </button>
        </div>
        <div class="page-content">
            <div class="header-banner-container">
                <img src="encabezado_oficial.png" class="header-banner-img" alt="Encabezado Oficial Galapa">
            </div>
            <div class="main-title">
                LISTADO DE ASISTENCIA Y ACTIVIDADES A DESARROLLAR
            </div>
            <div class="form-section">
                <div class="form-row">
                    <div class="form-cell" style="flex: 1;">
                        <span class="form-label">LUGAR DE CONCENTRACIÓN:</span>
                        <input type="text" class="form-input lugar-input">
                    </div>
                    <div class="date-container">
                        <span class="form-label">FECHA:</span>
                        <div class="date-box-wrap">
                            <input type="text" maxlength="2" class="fecha-dia">
                            <input type="text" maxlength="2" class="fecha-mes">
                            <input type="text" maxlength="4" class="fecha-ano">
                        </div>
                    </div>
                </div>
                <div class="activities-row">
                    <span class="form-label">ACTIVIDADES A DESARROLLAR:</span>
                    <textarea class="activities-textarea actividades-input" rows="2"></textarea>
                </div>
            </div>
            <div class="table-container">
                <table class="attendance-table">
                    <thead>
                        <tr>
                            <th class="col-no">No</th>
                            <th class="col-id">NÚMERO DE IDENTIFICACIÓN</th>
                            <th class="col-name">NOMBRES Y APELLIDOS</th>
                            <th class="col-tel">TELÉFONO</th>
                            <th class="col-firma">FIRMA O HUELLA</th>
                            <th class="col-asist">ASIST.</th>
                        </tr>
                    </thead>
                    <tbody class="tabla-body">
                    </tbody>
                </table>
            </div>
        </div>
        <div class="page-footer-container">
            <div class="footer-banner">
                <div class="footer-col">
                    <span>Dirección: Calle 13 No. 17-117 Galapa, Atlántico</span>
                    <span>Correo institucional: contactenos@galapa-atlantico.gov.co</span>
                </div>
                <div class="footer-col" style="text-align: center;">
                    <span>Línea de servicio a la ciudadanía: (+57) 3160272493</span>
                    <span>www.galapa-atlantico.gov.co &nbsp;&nbsp; NIT: 890.102.472-0</span>
                </div>
                <div class="footer-col-right">
                    <div class="social-icons">
                        <svg class="social-icon" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                        <svg class="social-icon" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        <svg class="social-icon" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </div>
                    <span>AlcaldiaGalapa</span>
                </div>
            </div>
        </div>
    `;

    // Populate 17 empty rows
    const tbody = div.querySelector(".tabla-body");
    for (let i = 1; i <= 17; i++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="col-no"></td>
            <td class="col-id"><input type="text" class="cell-input center bold"></td>
            <td class="col-name"><input type="text" class="cell-input bold uppercase"></td>
            <td class="col-tel"><input type="text" class="cell-input center"></td>
            <td class="col-firma"><input type="text" class="cell-input"></td>
            <td class="col-asist check-cell"><input type="checkbox" class="check-box-input"></td>
        `;
        tbody.appendChild(tr);
    }

    return div;
}

// Add a new 17-person page
function agregarPagina() {
    const container = document.getElementById("pagesContainer");
    if (!container) return;

    const page1 = container.querySelector(".page");
    const newPageNum = container.children.length + 1;
    const newPage = crearElementoPagina(newPageNum);

    // Auto-copy metadata (lugar, fecha, actividades) from Page 1 to new page for user convenience
    if (page1) {
        const lugar1 = page1.querySelector(".lugar-input")?.value || "";
        const dia1 = page1.querySelector(".fecha-dia")?.value || "";
        const mes1 = page1.querySelector(".fecha-mes")?.value || "";
        const ano1 = page1.querySelector(".fecha-ano")?.value || "";
        const actividades1 = page1.querySelector(".actividades-input")?.value || "";

        const newLugar = newPage.querySelector(".lugar-input");
        const newDia = newPage.querySelector(".fecha-dia");
        const newMes = newPage.querySelector(".fecha-mes");
        const newAno = newPage.querySelector(".fecha-ano");
        const newAct = newPage.querySelector(".actividades-input");

        if (newLugar) newLugar.value = lugar1;
        if (newDia) newDia.value = dia1;
        if (newMes) newMes.value = mes1;
        if (newAno) newAno.value = ano1;
        if (newAct) newAct.value = actividades1;
    }

    container.appendChild(newPage);
    actualizarNumeracionGeneral();
}

// Check if a specific page sheet contains any filled table data or inputs
function paginaTieneDatos(page) {
    if (!page) return false;

    // Check table text inputs (cédula, nombre, teléfono, firma)
    const tableInputs = page.querySelectorAll(".tabla-body input[type='text']");
    for (let input of tableInputs) {
        if (input.value.trim() !== "") return true;
    }

    // Check table attendance checkboxes
    const checkBoxes = page.querySelectorAll(".tabla-body input[type='checkbox']");
    for (let check of checkBoxes) {
        if (check.checked) return true;
    }

    return false;
}

// Delete a page
function eliminarPagina(btn) {
    const container = document.getElementById("pagesContainer");
    if (!container) return;

    const pages = container.querySelectorAll(".page");
    if (pages.length <= 1) {
        alert("Debe haber al menos una página en el documento.");
        return;
    }

    const page = btn.closest(".page");
    if (page) {
        if (paginaTieneDatos(page)) {
            const confirmar = confirm("Esta página contiene datos de asistencia ingresados. ¿Está seguro de que desea eliminarla?");
            if (!confirmar) return;
        }
        page.remove();
        actualizarNumeracionGeneral();
    }
}

// Re-index all row numbers sequentially (1..17, 18..34, 35..51) across all pages
function actualizarNumeracionGeneral() {
    const container = document.getElementById("pagesContainer");
    if (!container) return;

    const pages = container.querySelectorAll(".page");
    let totalRowCounter = 0;

    pages.forEach((page, pageIndex) => {
        // Show delete button only if there is more than 1 page
        const delBtn = page.querySelector(".btn-del-page");
        if (delBtn) {
            delBtn.style.display = (pages.length > 1) ? "inline-flex" : "none";
        }

        const rows = page.querySelectorAll(".tabla-body tr");
        rows.forEach(row => {
            totalRowCounter++;
            const noCell = row.querySelector(".col-no");
            if (noCell) noCell.textContent = totalRowCounter;
        });
    });
}

// Clear all inputs and reset to 1 page
function limpiarTabla() {
    if (hayDatosIngresados()) {
        const confirmar = confirm("¿Está seguro de que desea borrar todos los datos ingresados en el documento?");
        if (!confirmar) return;
    }

    const container = document.getElementById("pagesContainer");
    if (!container) return;

    container.innerHTML = "";
    const page1 = crearElementoPagina(1);
    container.appendChild(page1);
    actualizarNumeracionGeneral();
}

// Core helper function to populate multi-page PDF document using pdf-lib
async function construirPDF(flatten = false) {
    const response = await fetch('Formato_Galapa_Editable.pdf');
    if (!response.ok) {
        throw new Error(`No se pudo cargar la plantilla PDF. Estado: ${response.status}`);
    }
    const templatePdfBytes = await response.arrayBuffer();

    const pages = document.querySelectorAll("#pagesContainer .page");

    // Single-page optimization for Editable mode to preserve AcroForm interactive fields
    if (!flatten && pages.length === 1) {
        const pageEl = pages[0];
        const pdfDoc = await PDFLib.PDFDocument.load(templatePdfBytes);
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        const form = pdfDoc.getForm();

        // Extract header values from HTML element
        const lugarVal = pageEl.querySelector(".lugar-input")?.value || "";
        const diaVal = pageEl.querySelector(".fecha-dia")?.value || "";
        const mesVal = pageEl.querySelector(".fecha-mes")?.value || "";
        const anoVal = pageEl.querySelector(".fecha-ano")?.value || "";
        const actividadesVal = pageEl.querySelector(".actividades-input")?.value || "";

        try { form.getTextField("lugar").setText(lugarVal); } catch (e) { }
        try { form.getTextField("dia").setText(diaVal); } catch (e) { }
        try { form.getTextField("mes").setText(mesVal); } catch (e) { }
        try { form.getTextField("ano").setText(anoVal); } catch (e) { }
        try { form.getTextField("actividades").setText(actividadesVal); } catch (e) { }

        // Extract 17 table rows
        const rows = pageEl.querySelectorAll(".tabla-body tr");
        rows.forEach((row, rIndex) => {
            const i = rIndex + 1;
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

        // Set explicit white background [1, 1, 1] on widgets to override default blue field highlight
        const fields = form.getFields();
        fields.forEach(field => {
            try {
                field.acroField.getWidgets().forEach(widget => {
                    let mk = widget.dict.lookup(PDFLib.PDFName.of('MK'));
                    if (!mk || typeof mk.set !== 'function') {
                        mk = pdfDoc.context.obj({});
                        widget.dict.set(PDFLib.PDFName.of('MK'), mk);
                    }
                    const whiteArray = pdfDoc.context.obj([1, 1, 1]);
                    mk.set(PDFLib.PDFName.of('BG'), whiteArray);
                    mk.delete(PDFLib.PDFName.of('BC'));
                });
            } catch (e) { }
        });

        form.updateFieldAppearances(font);
        return await pdfDoc.save();
    }

    // Multi-page or Flatten (Normal PDF)
    const outputPdf = await PDFLib.PDFDocument.create();
    const allFieldRefs = [];

    for (let pIndex = 0; pIndex < pages.length; pIndex++) {
        const pageEl = pages[pIndex];
        const pageSuffix = pIndex === 0 ? "" : `_p${pIndex + 1}`;

        // Load a fresh instance of the template for this page
        const tempDoc = await PDFLib.PDFDocument.load(templatePdfBytes);
        const font = await tempDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        const form = tempDoc.getForm();

        // Extract values from this HTML page element
        const lugarVal = pageEl.querySelector(".lugar-input")?.value || "";
        const diaVal = pageEl.querySelector(".fecha-dia")?.value || "";
        const mesVal = pageEl.querySelector(".fecha-mes")?.value || "";
        const anoVal = pageEl.querySelector(".fecha-ano")?.value || "";
        const actividadesVal = pageEl.querySelector(".actividades-input")?.value || "";

        try { form.getTextField("lugar").setText(lugarVal); } catch (e) { }
        try { form.getTextField("dia").setText(diaVal); } catch (e) { }
        try { form.getTextField("mes").setText(mesVal); } catch (e) { }
        try { form.getTextField("ano").setText(anoVal); } catch (e) { }
        try { form.getTextField("actividades").setText(actividadesVal); } catch (e) { }

        // Extract 17 table rows for this page
        const rows = pageEl.querySelectorAll(".tabla-body tr");
        rows.forEach((row, rIndex) => {
            const i = rIndex + 1;
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

        // Set explicit white background [1, 1, 1] on widgets to override default blue field highlight
        const tempFields = form.getFields();
        tempFields.forEach(field => {
            try {
                field.acroField.getWidgets().forEach(widget => {
                    let mk = widget.dict.lookup(PDFLib.PDFName.of('MK'));
                    if (!mk || typeof mk.set !== 'function') {
                        mk = tempDoc.context.obj({});
                        widget.dict.set(PDFLib.PDFName.of('MK'), mk);
                    }
                    const whiteArray = tempDoc.context.obj([1, 1, 1]);
                    mk.set(PDFLib.PDFName.of('BG'), whiteArray);
                    mk.delete(PDFLib.PDFName.of('BC'));
                });
            } catch (e) { }
        });

        form.updateFieldAppearances(font);

        if (flatten) {
            form.flatten();
        } else if (pIndex > 0) {
            // For multi-page editable PDF: rename fields on page 2, 3... to make them unique & independent
            form.getFields().forEach(field => {
                try {
                    const dict = field.acroField.dict;
                    const currentName = field.getName();
                    dict.set(PDFLib.PDFName.of('T'), PDFLib.PDFString.of(currentName + pageSuffix));
                } catch (e) { }
            });
        }

        // Copy the populated page into the output document
        const [copiedPage] = await outputPdf.copyPages(tempDoc, [0]);
        outputPdf.addPage(copiedPage);

        // Collect field references if generating an editable multi-page document
        if (!flatten) {
            const pageAnnotsRef = copiedPage.node.get(PDFLib.PDFName.of('Annots'));
            if (pageAnnotsRef) {
                const pageAnnots = outputPdf.context.lookup(pageAnnotsRef);
                if (pageAnnots instanceof PDFLib.PDFArray) {
                    for (let i = 0; i < pageAnnots.size(); i++) {
                        allFieldRefs.push(pageAnnots.get(i));
                    }
                }
            }
        }
    }

    // Attach AcroForm catalog to outputPdf if generating an editable document
    if (!flatten && allFieldRefs.length > 0) {
        const acroFormDict = outputPdf.context.obj({
            Fields: allFieldRefs,
            NeedAppearances: false
        });
        const acroFormRef = outputPdf.context.register(acroFormDict);
        outputPdf.catalog.set(PDFLib.PDFName.of('AcroForm'), acroFormRef);
    }

    return await outputPdf.save();
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

// Check if any form fields or table inputs have data filled
function hayDatosIngresados() {
    const container = document.getElementById("pagesContainer");
    if (!container) return false;

    const textInputs = container.querySelectorAll("input[type='text'], textarea");
    for (let input of textInputs) {
        if (input.value.trim() !== "") return true;
    }

    const checkBoxes = container.querySelectorAll("input[type='checkbox']");
    for (let check of checkBoxes) {
        if (check.checked) return true;
    }

    return false;
}

// Warn user before closing or refreshing the page if form contains data
window.addEventListener("beforeunload", (event) => {
    if (hayDatosIngresados()) {
        event.preventDefault();
        event.returnValue = "";
    }
});

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
    limpiarTabla();
});
