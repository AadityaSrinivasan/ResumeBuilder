from flask import Blueprint, render_template, request
from io import BytesIO
from readRes import*
from pdf2image import convert_from_bytes
import base64 

view = Blueprint(__name__,"view")


uploaded_pdf = None

def image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

@view.route("/",  methods = ['GET', "POST"])
def home():
    pdf_image = None

    if request.method == 'POST':
        if 'pdf_file' in request.files:
            pdf_file = request.files['pdf_file']
            if pdf_file.filename != '':
                pdf_content = pdf_file.read()
                pdf_images = convert_from_bytes(pdf_content, dpi=200, first_page=1, last_page=1)
                if pdf_images:
                    pdf_image = pdf_images[0]
                pdf_file.seek(0)  # Reset the file pointer
                text = extract_text_from_pdf(BytesIO(pdf_content))
                analysis_results = analyzeRes(text)
                print(analysis_results)
                

    return render_template("index.html", pdf_image= pdf_image, image_to_base64=image_to_base64)