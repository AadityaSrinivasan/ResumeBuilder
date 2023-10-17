from flask import Blueprint, render_template, request
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from readRes import read
view = Blueprint(__name__,"view")


uploaded_pdf = None


@view.route("/",  methods = ['GET', "POST"])
def home():
    global uploaded_pdf
    print('1')
    if request.method == 'POST':
        print('2')
        if 'pdf_file' in request.files:
            print('3')
            pdf_file = request.files['pdf_file']
            if pdf_file.filename != '':
                print("hi")
                uploaded_pdf = pdf_file.read()
                read(uploaded_pdf)

    return render_template("index.html")