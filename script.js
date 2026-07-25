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

// Generate PDF directly in client browser using PDF-Lib (Works on GitHub Pages & Mobile)
async function generarPDFEditable() {
    const btn = document.querySelector("button[onclick='generarPDFEditable()']");
    const originalText = btn ? btn.innerHTML : "";
    if (btn) btn.innerHTML = "Generando PDF...";

    try {
        if (typeof PDFLib === 'undefined') {
            throw new Error("La librería PDF-Lib no está cargada en el navegador.");
        }

        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([792, 612]); // Letter Landscape dimensions (points)
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const width = 792;
        const height = 612;

        // 1. Official Header Image Banner
        try {
            const imgRes = await fetch("encabezado_oficial.png");
            if (imgRes.ok) {
                const imgBytes = await imgRes.arrayBuffer();
                const pngImage = await pdfDoc.embedPng(imgBytes);
                page.drawImage(pngImage, {
                    x: 30,
                    y: height - 85,
                    width: width - 60,
                    height: 70
                });
            }
        } catch (e) {
            console.warn("No se pudo cargar la imagen del encabezado:", e);
        }

        // 2. Main Title
        const titleText = "LISTADO DE ASISTENCIA Y ACTIVIDADES A DESARROLLAR";
        const titleWidth = fontBold.widthOfTextAtSize(titleText, 11);
        page.drawText(titleText, {
            x: (width - titleWidth) / 2,
            y: height - 102,
            size: 11,
            font: fontBold,
            color: rgb(0, 0, 0)
        });
        page.drawLine({
            start: { x: 30, y: height - 107 },
            end: { x: width - 30, y: height - 107 },
            thickness: 1.5,
            color: rgb(0, 0, 0)
        });

        // 3. Metadata Section
        // Row 1: Lugar & Fecha Box
        page.drawRectangle({
            x: 30,
            y: height - 136,
            width: width - 60,
            height: 25,
            borderWidth: 1.5,
            borderColor: rgb(0, 0, 0)
        });

        page.drawText("LUGAR DE CONCENTRACIÓN:", {
            x: 35,
            y: height - 124,
            size: 8.5,
            font: fontBold,
            color: rgb(0, 0, 0)
        });

        const lugarVal = document.getElementById("lugarInput")?.value || "";
        if (lugarVal) {
            page.drawText(lugarVal.toUpperCase(), {
                x: 185,
                y: height - 124,
                size: 8.5,
                font: font,
                color: rgb(0, 0, 0)
            });
        }

        page.drawLine({
            start: { x: width - 180, y: height - 136 },
            end: { x: width - 180, y: height - 111 },
            thickness: 1.5,
            color: rgb(0, 0, 0)
        });

        page.drawText("FECHA:", {
            x: width - 175,
            y: height - 124,
            size: 8.5,
            font: fontBold,
            color: rgb(0, 0, 0)
        });

        // Date Sub-boxes
        page.drawRectangle({ x: width - 130, y: height - 133, width: 25, height: 18, borderWidth: 1, borderColor: rgb(0, 0, 0) });
        page.drawRectangle({ x: width - 102, y: height - 133, width: 25, height: 18, borderWidth: 1, borderColor: rgb(0, 0, 0) });
        page.drawRectangle({ x: width - 74, y: height - 133, width: 40, height: 18, borderWidth: 1, borderColor: rgb(0, 0, 0) });

        const diaVal = document.getElementById("fechaDia")?.value || "";
        const mesVal = document.getElementById("fechaMes")?.value || "";
        const anoVal = document.getElementById("fechaAno")?.value || "";

        if (diaVal) page.drawText(diaVal, { x: width - 122, y: height - 125, size: 8.5, font: font });
        if (mesVal) page.drawText(mesVal, { x: width - 94, y: height - 125, size: 8.5, font: font });
        if (anoVal) page.drawText(anoVal, { x: width - 68, y: height - 125, size: 8.5, font: font });

        // Row 2: Actividades Box
        page.drawRectangle({
            x: 30,
            y: height - 174,
            width: width - 60,
            height: 34,
            borderWidth: 1.5,
            borderColor: rgb(0, 0, 0)
        });

        page.drawText("ACTIVIDADES A DESARROLLAR:", {
            x: 35,
            y: height - 150,
            size: 8.5,
            font: fontBold,
            color: rgb(0, 0, 0)
        });

        const actVal = document.getElementById("actividadesInput")?.value || "";
        if (actVal) {
            const lines = actVal.split('\n');
            let actY = height - 150;
            lines.slice(0, 2).forEach((line, idx) => {
                page.drawText(line.substring(0, 110), {
                    x: 190,
                    y: actY - (idx * 11),
                    size: 8,
                    font: font,
                    color: rgb(0, 0, 0)
                });
            });
        }

        // 4. Main Attendance Table Grid
        const tableTop = height - 180;
        const tableBottom = 55;
        const tableHeight = tableTop - tableBottom;
        const headerHeight = 22;

        const rows = tbody.querySelectorAll("tr");
        const totalRows = Math.max(rows.length, 17);
        const rowHeight = (tableHeight - headerHeight) / totalRows;

        const xNo = 30;
        const xId = 65;
        const xName = 210;
        const xTel = 480;
        const xFirma = 600;
        const xAsist = 735;
        const xEnd = width - 30;

        // Table Header Fill
        page.drawRectangle({
            x: xNo,
            y: tableTop - headerHeight,
            width: xEnd - xNo,
            height: headerHeight,
            color: rgb(0.945, 0.96, 0.976),
            borderWidth: 1.5,
            borderColor: rgb(0, 0, 0)
        });

        // Vertical lines
        [xId, xName, xTel, xFirma, xAsist].forEach(x => {
            page.drawLine({
                start: { x: x, y: tableTop },
                end: { x: x, y: tableBottom },
                thickness: 1,
                color: rgb(0, 0, 0)
            });
        });

        // Outer border
        page.drawRectangle({
            x: xNo,
            y: tableBottom,
            width: xEnd - xNo,
            height: tableTop - tableBottom,
            borderWidth: 1.5,
            borderColor: rgb(0, 0, 0)
        });

        // Helper for Centered Header Labels
        const drawCentered = (text, x1, x2, y, fSize = 7.5, isBold = true) => {
            const textWidth = (isBold ? fontBold : font).widthOfTextAtSize(text, fSize);
            const x = (x1 + x2) / 2 - textWidth / 2;
            page.drawText(text, { x: x, y: y, size: fSize, font: isBold ? fontBold : font, color: rgb(0, 0, 0) });
        };

        drawCentered("No", xNo, xId, tableTop - 14);
        drawCentered("NÚMERO DE IDENTIFICACIÓN", xId, xName, tableTop - 14);
        drawCentered("NOMBRES Y APELLIDOS", xName, xTel, tableTop - 14);
        drawCentered("TELÉFONO", xTel, xFirma, tableTop - 14);
        drawCentered("FIRMA O HUELLA", xFirma, xAsist, tableTop - 14);
        drawCentered("ASIST.", xAsist, xEnd, tableTop - 14);

        // Render Table Rows
        for (let i = 0; i < totalRows; i++) {
            const yCurr = tableTop - headerHeight - ((i + 1) * rowHeight);

            // Horizontal row line
            page.drawLine({
                start: { x: xNo, y: yCurr },
                end: { x: xEnd, y: yCurr },
                thickness: 1,
                color: rgb(0, 0, 0)
            });

            // Row index
            drawCentered(String(i + 1), xNo, xId, yCurr + (rowHeight / 2) - 3, 7.5, true);

            // Populate row data from DOM inputs
            if (i < rows.length) {
                const tr = rows[i];
                const inputs = tr.querySelectorAll("input");
                const idVal = inputs[0]?.value || "";
                const nombreVal = inputs[1]?.value || "";
                const telVal = inputs[2]?.value || "";
                const firmaVal = inputs[3]?.value || "";
                const asistChecked = inputs[4]?.checked || false;

                if (idVal) drawCentered(idVal, xId, xName, yCurr + (rowHeight / 2) - 3, 7.5, true);
                if (nombreVal) {
                    page.drawText(nombreVal.toUpperCase().substring(0, 50), {
                        x: xName + 5,
                        y: yCurr + (rowHeight / 2) - 3,
                        size: 7.5,
                        font: fontBold,
                        color: rgb(0, 0, 0)
                    });
                }
                if (telVal) drawCentered(telVal, xTel, xFirma, yCurr + (rowHeight / 2) - 3, 7.5, false);
                if (firmaVal) {
                    page.drawText(firmaVal.substring(0, 30), {
                        x: xFirma + 5,
                        y: yCurr + (rowHeight / 2) - 3,
                        size: 7.5,
                        font: font,
                        color: rgb(0, 0, 0)
                    });
                }
                if (asistChecked) {
                    const boxX = (xAsist + xEnd) / 2 - 5;
                    const boxY = yCurr + (rowHeight / 2) - 5;
                    page.drawRectangle({
                        x: boxX,
                        y: boxY,
                        width: 10,
                        height: 10,
                        color: rgb(0, 0, 0)
                    });
                    page.drawText("✓", {
                        x: boxX + 2,
                        y: boxY + 2,
                        size: 8,
                        font: fontBold,
                        color: rgb(1, 1, 1)
                    });
                }
            }
        }

        // 5. Page Indicator
        page.drawText("PÁG. 1", {
            x: width - 60,
            y: 42,
            size: 8,
            font: fontBold,
            color: rgb(0, 0, 0)
        });

        // 6. Green Footer Banner
        page.drawRectangle({
            x: 0,
            y: 0,
            width: width,
            height: 32,
            color: rgb(0.533, 0.768, 0.145)
        });

        const greenDark = rgb(0.058, 0.356, 0.152);
        page.drawText("Dirección: Calle 13 No. 17-117 Galapa, Atlántico", { x: 30, y: 18, size: 7.5, font: fontBold, color: greenDark });
        page.drawText("Correo institucional: contactenos@galapa-atlantico.gov.co", { x: 30, y: 7, size: 7.5, font: fontBold, color: greenDark });

        page.drawText("Línea de servicio a la ciudadanía: (+57) 3160272493", { x: width / 2 - 100, y: 18, size: 7.5, font: fontBold, color: greenDark });
        page.drawText("www.galapa-atlantico.gov.co    NIT: 890.102.472-0", { x: width / 2 - 100, y: 7, size: 7.5, font: fontBold, color: greenDark });

        page.drawText("@AlcaldiaGalapa", { x: width - 90, y: 12, size: 7.5, font: fontBold, color: greenDark });

        // 7. Generate PDF bytes & Trigger Browser Download
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Formato_Asistencia_Galapa_${new Date().toISOString().slice(0, 10)}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (err) {
        console.error("Error al generar PDF en JavaScript:", err);
        alert("Ocurrió un error al generar el PDF: " + err.message);
    } finally {
        if (btn) btn.innerHTML = originalText;
    }
}

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
    limpiarTabla();
});
