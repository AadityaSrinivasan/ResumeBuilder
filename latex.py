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
        education_code += "\\resumeSubheading{" + education['institution'] + "}{" + education['location'] + "}{" + education['degree'] + "}{" + education['date'] + "}\n"
    return education_code


def main():
    # Get inputs
    name = input("Enter your name: ")
    email = input("Enter your email: ")
    experience = input("Enter your experience details: ")
    skills = input("Enter your skills: ")

    # Generate education section
    educations = [
        {
            'institution': 'Texas AM University',
            'location': 'College Station, TX',
            'degree': 'Bachelor of Science in Computer Science, Minor in Mathematics. GPA -- 3.931',
            'date': 'Aug. 2022 -- May 2026'
        },
        {
            'institution': 'Test University',
            'location': 'Test City, TX',
            'degree': 'Bachelor of Arts in Psychology',
            'date': 'Sept. 2021 -- May 2025'
        },
        {
            'institution': 'Another Test College',
            'location': 'Testtown, TX',
            'degree': 'Bachelor of Science in Biology',
            'date': 'Aug. 2019 -- May 2023'
        }
    ]
    education_section = generate_education_section(educations)

    # Fill in LaTeX template
    template_content = fill_latex_template(name, email, education_section, experience, skills)

    # Create LaTeX file
    create_latex_file(template_content)

    # Compile LaTeX to PDF
    compile_to_pdf()

    print("Resume generated successfully!")
    print(education_section)

if __name__ == "__main__":
    main()
