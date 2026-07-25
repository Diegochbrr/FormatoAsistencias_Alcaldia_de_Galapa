import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def generar_pdf_editable():
    output_path = "Formato_Galapa_Editable.pdf"
    header_img_path = "encabezado_oficial.png"
    
    # Letter Landscape dimensions in points (792 x 612 pts = 11 x 8.5 in)
    width, height = landscape(letter)
    
    c = canvas.Canvas(output_path, pagesize=landscape(letter))
    c.setTitle("Formato de Asistencias Galapa - Editable")
    
    # 1. Draw Header Image
    if os.path.exists(header_img_path):
        # Header banner at top 100 pts height
        c.drawImage(header_img_path, 30, height - 90, width=width - 60, height=75, preserveAspectRatio=False)
        
    # 2. Draw Title
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(width / 2, height - 105, "LISTADO DE ASISTENCIA Y ACTIVIDADES A DESARROLLAR")
    c.setLineWidth(1.5)
    c.line(30, height - 110, width - 30, height - 110)
    
    # 3. Form Metadata Section
    # Row 1: Lugar & Fecha
    c.rect(30, height - 142, width - 60, 26, stroke=1, fill=0)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(35, height - 130, "LUGAR DE CONCENTRACIÓN:")
    
    # Date Label & Box
    c.line(width - 180, height - 142, width - 180, height - 116)
    c.drawString(width - 175, height - 130, "FECHA:")
    
    # Date Sub-boxes
    c.rect(width - 130, height - 138, 25, 18, stroke=1, fill=0)
    c.rect(width - 102, height - 138, 25, 18, stroke=1, fill=0)
    c.rect(width - 74, height - 138, 40, 18, stroke=1, fill=0)
    
    # Form Fields: Lugar & Fecha Inputs
    c.acroForm.textfield(name="lugar", x=185, y=height - 138, width=width - 370, height=18, borderWidth=0, textColor=colors.black, fontSize=9)
    c.acroForm.textfield(name="dia", x=width - 129, y=height - 137, width=23, height=16, borderWidth=0, textColor=colors.black, fontSize=9, fontName="Helvetica")
    c.acroForm.textfield(name="mes", x=width - 101, y=height - 137, width=23, height=16, borderWidth=0, textColor=colors.black, fontSize=9, fontName="Helvetica")
    c.acroForm.textfield(name="ano", x=width - 73, y=height - 137, width=38, height=16, borderWidth=0, textColor=colors.black, fontSize=9, fontName="Helvetica")
    
    # Row 2: Actividades
    c.rect(30, height - 182, width - 60, 36, stroke=1, fill=0)
    c.drawString(35, height - 156, "ACTIVIDADES A DESARROLLAR:")
    c.acroForm.textfield(name="actividades", x=190, y=height - 178, width=width - 225, height=28, borderWidth=0, textColor=colors.black, fontSize=9)
    
    # 4. Main Attendance Table (17 Rows)
    table_top = height - 190
    table_bottom = 55
    table_height = table_top - table_bottom
    row_height = (table_height - 24) / 17
    
    # Column X coordinates
    # Total width: width - 60 = 732 pts
    x_no = 30
    x_id = 65
    x_name = 210
    x_tel = 480
    x_firma = 600
    x_asist = 735
    x_end = width - 30
    
    # Draw Table Header Box
    c.setFillColor(colors.HexColor("#F1F5F9"))
    c.rect(x_no, table_top - 24, x_end - x_no, 24, stroke=1, fill=1)
    c.setFillColor(colors.black)
    c.line(x_id, table_top, x_id, table_bottom)
    c.line(x_name, table_top, x_name, table_bottom)
    c.line(x_tel, table_top, x_tel, table_bottom)
    c.line(x_firma, table_top, x_firma, table_bottom)
    c.line(x_asist, table_top, x_asist, table_bottom)
    
    # Draw Table Outer Border
    c.rect(x_no, table_bottom, x_end - x_no, table_top - table_bottom, stroke=1, fill=0)
    
    # Header Labels
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString((x_no + x_id)/2, table_top - 15, "No")
    c.drawCentredString((x_id + x_name)/2, table_top - 15, "NÚMERO DE IDENTIFICACIÓN")
    c.drawCentredString((x_name + x_tel)/2, table_top - 15, "NOMBRES Y APELLIDOS")
    c.drawCentredString((x_tel + x_firma)/2, table_top - 15, "TELÉFONO")
    c.drawCentredString((x_firma + x_asist)/2, table_top - 15, "FIRMA O HUELLA")
    c.drawCentredString((x_asist + x_end)/2, table_top - 15, "ASIST.")
    
    # Draw 17 Rows & Fields
    c.setFont("Helvetica", 8)
    for i in range(1, 18):
        y_curr = table_top - 24 - (i * row_height)
        c.line(x_no, y_curr, x_end, y_curr)
        
        # Row Number
        c.drawCentredString((x_no + x_id)/2, y_curr + 6, str(i))
        
        # Interactive Text Fields
        c.acroForm.textfield(name=f"id_{i}", x=x_id + 2, y=y_curr + 2, width=(x_name - x_id) - 4, height=row_height - 4, borderWidth=0, textColor=colors.black, fontSize=8)
        c.acroForm.textfield(name=f"nombre_{i}", x=x_name + 2, y=y_curr + 2, width=(x_tel - x_name) - 4, height=row_height - 4, borderWidth=0, textColor=colors.black, fontSize=8)
        c.acroForm.textfield(name=f"tel_{i}", x=x_tel + 2, y=y_curr + 2, width=(x_firma - x_tel) - 4, height=row_height - 4, borderWidth=0, textColor=colors.black, fontSize=8)
        c.acroForm.textfield(name=f"firma_{i}", x=x_firma + 2, y=y_curr + 2, width=(x_asist - x_firma) - 4, height=row_height - 4, borderWidth=0, textColor=colors.black, fontSize=8)
        
        # Interactive Checkbox for Asist
        c.acroForm.checkbox(name=f"asist_{i}", x=(x_asist + x_end)/2 - 6, y=y_curr + 3, size=11, borderWidth=1, buttonStyle='check')
    
    # 6. Custom Footer Green Banner
    c.setFillColor(colors.HexColor("#88C425"))
    c.rect(0, 0, width, 32, stroke=0, fill=1)
    c.setFillColor(colors.HexColor("#0F5B27"))
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(30, 18, "Dirección: Calle 13 No. 17-117 Galapa, Atlántico")
    c.drawString(30, 8, "Correo institucional: contactenos@galapa-atlantico.gov.co")
    
    c.drawCentredString(width / 2, 18, "Línea de servicio a la ciudadanía: (+57) 3160272493")
    c.drawCentredString(width / 2, 8, "www.galapa-atlantico.gov.co    NIT: 890.102.472-0")
    
    c.drawRightString(width - 30, 12, "@AlcaldiaGalapa")
    
    c.save()
    print(f"PDF Editable creado exitosamente en: {output_path}")

if __name__ == "__main__":
    generar_pdf_editable()
