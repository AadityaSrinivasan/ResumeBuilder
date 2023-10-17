from flask import Blueprint, render_template, request
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from readRes import read
view = Blueprint(__name__,"view")


uploaded_pdf = None


@view.route("/",  methods = ['GET', "POST"])
def home():
    global uploaded_pdf
    if request.method == 'POST':
        if 'pdf_file' in request.files:
            pdf_file = request.files['pdf_file']
            if pdf_file.filename != '':
                uploaded_pdf = pdf_file.read()
                read(uploaded_pdf)

    return render_template("index.html")