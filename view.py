from flask import Blueprint, render_template, request
from io import BytesIO
from readRes import*
from pdf2image import convert_from_bytes
import base64 
import tempfile

view = Blueprint(__name__,"view")
global analysis_results
analysis_results = {}
uploaded_pdf = None

def image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

@view.route("/",  methods = ['GET', "POST"])
def home():
    pdf_image = None
    nl = '\n'
    global analysis_results
    if request.method == 'POST':
        if 'pdf_file' in request.files:
            pdf_file = request.files['pdf_file']
            if pdf_file.filename != '':
                pdf_content = pdf_file.read()
                with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                    temp_file.write(pdf_content)
                temp_file_path = temp_file.name

                pdf_images = convert_from_bytes(pdf_content, dpi=200, first_page=1, last_page=1)
                if pdf_images:
                    pdf_image = pdf_images[0]
                pdf_file.seek(0)  # Reset the file pointer
                text = extract_text_from_pdf(BytesIO(pdf_content))
                analysis_results = analyzeRes(text, temp_file_path)
                
    if analysis_results:
        name = f"{analysis_results.get('name')}"
        number = f"{analysis_results.get('number')}"
        email = f"{analysis_results.get('email')}"
        website = analysis_results.get('website',[])
        educations = analysis_results.get('education')
        skills =', '.join(analysis_results.get('skills'))
    else:
        name = ""
        number = ""
        email = ""
        website = ""
        educations = []
        skills = ""

    return render_template("index.html", pdf_image= pdf_image, image_to_base64=image_to_base64,name_text=name, number_text=number,email_text=email,websites=website, educations=educations, skills_text=skills)

@view.route('/update_data', methods=['POST'])
def update_data():
    field = request.json['field']
    value = request.json['value']
    print(field)
    print(value)
    # Update the analysis_results or perform necessary actions with field and value
    analysis_results[field] = value
    for key, value in analysis_results.items():
        print(f"{key}: {value}")
    # Return a response if needed
    return 'Data received successfully'

@view.route('/update_dataList', methods=['POST'])
def update_dataList():
    field = request.json['field']
    value = request.json['value']
    index = request.json['index']
    # Update the analysis_results or perform necessary actions with field and value
    print(index)
    analysis_results[field][int(index)-1] = value
    for key, value in analysis_results.items():
        print(f"{key}: {value}")
    # Return a response if needed
    return 'Data received successfully'


