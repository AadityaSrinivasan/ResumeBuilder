from flask import Blueprint, render_template,  jsonify, request, url_for, redirect
from io import BytesIO
from readRes import*
from pdf2image import convert_from_bytes
import base64 
import tempfile
from readRes import Education, Project
from webscraper import get_skills_from_website
from latex import latexPDF

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
        if key == 'education':
            for index, x in enumerate(value):
                print(f'Education {index + 1}: {x}')
        elif key == "projects":
            for index, x in enumerate(value):
                print(f'Project {index + 1}: {x}')
        elif key == "experiences":
            for index, x in enumerate(value):
                print(f'Experience {index + 1}: {x}')
        else:
            print(f"{key}: {value}")


@view.route("/",  methods = ['GET', "POST"])
def home(pdf_image = None):
    print("inside sayok's mother")
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

                pdf_file.seek(0)  # Reset the file pointer
                text = extract_text_from_pdf(BytesIO(pdf_content))
                
                analysis_results = analyzeRes(text, temp_file_path)
                uploaded_pdf = pdf_file
                print(analysis_results)

            elif uploaded_pdf != None:
                print('gabagoo')
    
    if analysis_results:
        name = f"{analysis_results.get('name')}"
        number = f"{analysis_results.get('number')}"
        email = f"{analysis_results.get('email')}"
        website = analysis_results.get('website',[])
        educations = analysis_results.get('education')
        experiences = analysis_results.get('experience')
        skills =', '.join(analysis_results.get('skills'))
        pdf_image = latexPDF(analysis_results)
        printData()
        print("image created")
        projects = analysis_results.get('projects')
    else:
        name = ""
        number = ""
        email = ""
        website = []
        educations = []
        skills = ""
        projects = []
        experiences = []
    
    #function fo latex, access the stuff from analysis_results
    
    return render_template("index.html", pdf_image= pdf_image, image_to_base64=image_to_base64,name_text=name, number_text=number,email_text=email,websites=website, educations=educations, skills_text=skills, projects = projects, experiences = experiences)

@view.route('/update_data', methods=['POST'])
def update_data():
    

    field = request.json['field']
    value = request.json['value']
    # Update the analysis_results or perform necessary actions with field and value
    analysis_results[field] = value
    printData()
    print("Update")
    pdf_image = latexPDF(analysis_results)
    # Return a response if needed
    
    return home(pdf_image)



@view.route('/update_dataList', methods=['POST'])
def update_dataList():
    print("in dataList")
    field = request.json['field']
    value = request.json['value']
    index = request.json['index']
    if field == 'eduName':
        if 'education' not in analysis_results:
            analysis_results['education'] = [Education(value, 0.00)]
        elif len(analysis_results['education']) >= int(index):
            analysis_results['education'][int(index)-1].name = value
            print('old name')
            printData()
        else:
            print('new edu')
            analysis_results['education'].append(Education(value, 0.00))
            
            printData()
        return 'Data received successfully'
    elif field == 'eduGPA':
        if 'education' not in analysis_results:
            analysis_results['education'] = [Education("", value)]
        elif len(analysis_results['education']) >= int(index):
            print('old gpa')
            analysis_results['education'][int(index)-1].gpa = value
            printData()
        else:
             
            analysis_results['education'].append(Education("", value))
            printData()
        return 'Data received successfully'
    #add elifs for the dif field for Projects and Experiences
    elif field == 'projName':
        if 'projects' not in analysis_results:
            analysis_results['projects'] = [Project(name = value)]
        elif len(analysis_results['projects']) >= int(index):
            analysis_results['projects'][int(index)-1].name = value
            printData()
        else:
            
            analysis_results['projects'].append(Project(name = value))
            printData()
        return 'Data received successfully'
    elif field == 'projTech':
        if 'projects' not in analysis_results:
            analysis_results['projects'] = [Project(tech = value)]
            printData()
        elif len(analysis_results['projects']) >= int(index):
            analysis_results['projects'][int(index)-1].tech = value
            printData()
        else:
            
            analysis_results['project'].append(Project(tech = value))
            printData()
        return 'Data received successfully'
    elif field == 'projDate':
        if 'projects' not in analysis_results:
            analysis_results['projects'] = [Project(date=value)]
            printData()
        elif len(analysis_results['projects']) >= int(index):
            analysis_results['projects'][int(index)-1].date = value
            printData()
        else:
            analysis_results['project'].append(Project(date= value))
            printData()
        return 'Data received successfully'
    elif field == 'projInfo':
        if 'projects' not in analysis_results:
            analysis_results['projects'] = [Project(info=value)]
            printData()
        elif len(analysis_results['projects']) >= int(index):
            analysis_results['projects'][int(index)-1].info = value
            printData()
        else:
            
            analysis_results['project'].append(Project(info= value))
            printData()
        return 'Data received successfully'
    elif field == 'experienceTitle':
        if 'experiences' not in analysis_results:
            analysis_results['experiences'] = [Experience(title=value)]
            printData()
        elif len(analysis_results['experiences']) >= int(index):
            analysis_results['experiences'][int(index)-1].title = value
            printData()
        else:
            
            analysis_results['experiences'].append(Experience(title=value))
            printData()
        return 'Data received successfully'
    elif field == 'experienceCompany':
        if 'experiences' not in analysis_results:
            analysis_results['experiences'] = [Experience(company=value)]
            printData()
        elif len(analysis_results['experiences']) >= int(index):
            analysis_results['experiences'][int(index)-1].company = value
            printData()
        else:
           
            analysis_results['experiences'].append(Experience(company=value))
            printData()
        return 'Data received successfully'
    elif field == 'experienceStartDate':
        if 'experiences' not in analysis_results:
            analysis_results['experiences'] = [Experience(startDate=value)]
            printData()
        elif len(analysis_results['experiences']) >= int(index):
            analysis_results['experiences'][int(index)-1].startDate = value
            printData()
        else:
           
            analysis_results['experiences'].append(Experience(startDate=value))
            printData()
        return 'Data received successfully'
    elif field == 'experienceEndDate':
        if 'experiences' not in analysis_results:
            analysis_results['experiences'] = [Experience(endDate=value)]
            printData()
        elif len(analysis_results['experiences']) >= int(index):
            analysis_results['experiences'][int(index)-1].endDate = value
            printData()
        else:
           
            analysis_results['experiences'].append(Experience(endDate=value))
            printData()
        return 'Data received successfully'
    elif field == 'experienceInfo':
        if 'experiences' not in analysis_results:
            analysis_results['experiences'] = [Experience(info=value)]
            printData()
        elif len(analysis_results['experiences']) >= int(index):
            analysis_results['experiences'][int(index)-1].info = value
            printData()
        else:
            
            analysis_results['experiences'].append(Experience(info=value))
            printData()
        return 'Data received successfully'
    elif field!= 'eduName':
        # Update the analysis_results or perform necessary actions with field and value
        if(int(index) > len( analysis_results[field])):
            analysis_results[field].append(value)
            printData()
        else:
            analysis_results[field][int(index)-1] = value
        printData()
        # Return a response if needed
        return 'Data received successfully'


@view.route('/update_educations', methods=['POST'])
def update_educations():
    print("in update educations gabgbabg")
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

 
        
    