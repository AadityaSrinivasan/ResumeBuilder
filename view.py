from flask import Blueprint, render_template, request
from io import BytesIO
from readRes import*
view = Blueprint(__name__,"view")


uploaded_pdf = None


@view.route("/",  methods = ['GET', "POST"])
def home():
    global uploaded_pdf
    if request.method == 'POST':
        if 'pdf_file' in request.files:
            pdf_file = request.files['pdf_file']
            if pdf_file.filename != '':
                pdf_content = pdf_file.read()
                pdf_file.seek(0)  # Reset the file pointer
                text = extract_text_from_pdf(BytesIO(pdf_content))
                analysis_results = analyzeRes(text)
                

    return render_template("index.html")