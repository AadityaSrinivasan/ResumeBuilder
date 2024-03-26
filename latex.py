import os
import subprocess  # Add this line to import the subprocess module
import matplotlib.pyplot as plt
from pdf2image import convert_from_path, convert_from_bytes


def convert_pdf_to_image(pdf_path):
    with open(pdf_path, "rb") as pdf_file:
        pdf_content = pdf_file.read()
        pdf_images = convert_from_bytes(pdf_content, dpi=200, first_page=1, last_page=1)
        if pdf_images:
            pdf_image = pdf_images[0]
            return pdf_image
    return None



def fill_latex_template(name, email, education, experience, skills):
    with open("template.tex", "r") as file:
        template_content = file.read()

    # Replace placeholders with actual content
    template_content = template_content.replace("%%NAME%%", name)
    template_content = template_content.replace("%%EMAIL%%", email)
    template_content = template_content.replace("%%EDUCATION%%", education)
    template_content = template_content.replace("%%EXPERIENCE%%", experience)
    template_content = template_content.replace("%%SKILLS%%", skills)

    return template_content

def create_latex_file(template_content):
    with open("resume.tex", "w") as file:
        file.write(template_content)

def compile_to_pdf():
    subprocess.run(["pdflatex", "-interaction=nonstopmode", "resume.tex"])
    # Clean up auxiliary files
    for file in ["resume.aux", "resume.log"]:
        os.remove(file)

def generate_education_section(educations):
    education_code = ""
    for education in educations:
        education_code += "\\resumeSubheading{" + education['institution'] + "}{" + education['location'] + "}{" + education['degree'] + "}{" + education['date'] + "}\n"
    return education_code

import os
import subprocess  # Add this line to import the subprocess module

def fill_latex_template(name, email, education, experience, skills):
    with open("template.tex", "r") as file:
        template_content = file.read()

    # Replace placeholders with actual content
    template_content = template_content.replace("%%NAME%%", name)
    template_content = template_content.replace("%%EMAIL%%", email)
    template_content = template_content.replace("%%EDUCATION%%", education)
    template_content = template_content.replace("%%EXPERIENCE%%", experience)
    template_content = template_content.replace("%%SKILLS%%", skills)

    return template_content

def create_latex_file(template_content):
    with open("resume.tex", "w") as file:
        file.write(template_content)

def compile_to_pdf():
    subprocess.run(["pdflatex", "-interaction=nonstopmode", "resume.tex"])
    # Clean up auxiliary files
    for file in ["resume.aux", "resume.log"]:
        os.remove(file)

def generate_education_section(educations):
    education_code = ""
    for education in educations:
        name = education.name.replace("&", "\\&")  # Replace '&' with '\&'
        education_code += "\\resumeSubheading{" + name + "}{" + education.gpa + "}{" + "CPCS" + "}{"  "}\n"
    return education_code



def latexPDF(analysis_results):
    # Get inputs from analysis_results
    name = analysis_results.get('name', "")
    email = analysis_results.get('email', "")
    experience = analysis_results.get('experience', "")
    skills = ", ".join(analysis_results.get('skills', []))

    # Generate education section
    educations = analysis_results.get('education')
    print()
    education_section = generate_education_section(educations)

    # Fill in LaTeX template
    template_content = fill_latex_template(name, email, education_section, experience, skills)

    # Create LaTeX file
    create_latex_file(template_content)

    # Compile LaTeX to PDF
    try:
        compile_to_pdf()
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while compiling LaTeX to PDF: {e}")
        return None

    # Convert PDF to image
    pdf_image = convert_pdf_to_image("resume.pdf")
    

    print("Resume generated successfully!")
    return pdf_image
