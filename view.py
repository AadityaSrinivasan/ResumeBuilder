from flask import Blueprint, render_template,  jsonify, request
from io import BytesIO
from readRes import*
from pdf2image import convert_from_bytes
import base64 
import tempfile
from readRes import Education
from webscraper import get_skills_from_website

view = Blueprint(__name__,"view")
global analysis_results
global web_keywords
web_keywords = []
analysis_results = {}
uploaded_pdf = None


def image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

def printData():
    for key, value in analysis_results.items():
        if key!= 'education':
            print(f"{key}: {value}")
        else:
            for index, x in enumerate(value):
                print(f'Education {index + 1}: {x}')


@view.route("/",  methods = ['GET', "POST"])
def home():
    pdf_image = None
    nl = '\n'
    global analysis_results
    if request.method == 'POST':
        if 'text' in request.form:
            #get webiste
            text = request.form['text']
            web_keywords_ = get_skills_from_website(text)
            if web_keywords_ != 0:
                web_keywords = web_keywords_
                print(web_keywords) #this is wehre you would do studff w da keywords
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
                uploaded_pdf = pdf_file
            elif uploaded_pdf != None:
                print('gabagoo')
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
    # Update the analysis_results or perform necessary actions with field and value
    analysis_results[field] = value
    printData()
    # Return a response if needed
    return 'Data received successfully'

@view.route('/update_dataList', methods=['POST'])
def update_dataList():
    print("in dataList")
    field = request.json['field']
    value = request.json['value']
    index = request.json['index']
    if field == 'eduName':
        analysis_results['education'][int(index)-1].name = value
        printData()
        return 'Data received successfully'
    elif field == 'eduGPA':
        analysis_results['education'][int(index)-1].gpa = value
        printData()
        return 'Data received successfully'
    elif field!= 'eduName':
        # Update the analysis_results or perform necessary actions with field and value
        if(int(index) > len( analysis_results[field])):
            analysis_results[field].append(value)
        else:
            analysis_results[field][int(index)-1] = value
        printData()
        # Return a response if needed
        return 'Data received successfully'


@view.route('/update_educations', methods=['POST'])
def update_educations():
    #gotta fix bc when you delete more than once the indexes can become messed up.
    index = request.json['index']
    print(int(index)-1)
    del analysis_results['education'][int(index)-1]
    printData()
    return 'Data received successfully'

@view.route('/update_website', methods=['POST'])
def update_websites():
    #gotta fix bc when you delete more than once the indexes can become messed up.
    index = request.json['index']
    print(int(index)-1)
    del analysis_results['website'][int(index)-1]
    printData()
    return 'Data received successfully'

# get inp ut from website scraper

 
        
    