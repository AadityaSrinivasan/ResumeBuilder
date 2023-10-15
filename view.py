from flask import Blueprint, render_template, request

view = Blueprint(__name__,"view")


uploaded_pdf = None

@view.route("/")
def home():
    global uploaded_pdf
    if request.method == 'POST':
        if 'pdf_file' in request.files:
            pdf_file = request.files['pdf_file']
            if pdf_file.filename != '':
                uploaded_pdf = pdf_file.read()
                pdf_filename = pdf_file.filename

    return render_template("index.html")