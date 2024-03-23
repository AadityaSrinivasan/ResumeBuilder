import os
import subprocess

def fill_latex_template(name, email, education, experience, skills):
    template = fr"""
\documentclass{{article}}
\usepackage{{enumitem}}
\usepackage[left=0.5in,top=0.5in,right=0.5in,bottom=0.5in]{{geometry}}
\title{{Resume}}
\author{{}}
\date{{\vspace{{-5ex}}}}
\begin{{document}}
\maketitle

\section*{{Personal Information}}
\begin{{itemize}}
    \item \textbf{{Name:}} {name}
    \item \textbf{{Email:}} {email}
\end{{itemize}}

\section*{{Education}}
\begin{{itemize}}
{education}
\end{{itemize}}

\section*{{Experience}}
\begin{{itemize}}
{experience}
\end{{itemize}}

\section*{{Skills}}
\begin{{itemize}}
{skills}
\end{{itemize}}

\end{{document}}
"""
    return template

def create_latex_file(template_content):
    with open("resume.tex", "w") as file:
        file.write(template_content)

def compile_to_pdf():
    subprocess.run(["pdflatex", "-interaction=nonstopmode", "resume.tex"])
    # Clean up auxiliary files
    for file in ["resume.aux", "resume.log"]:
        os.remove(file)

def main():
    # Get inputs
    name = input("Enter your name: ")
    email = input("Enter your email: ")
    education = input("Enter your education details: ")
    experience = input("Enter your experience details: ")
    skills = input("Enter your skills: ")

    # Fill in LaTeX template
    template_content = fill_latex_template(name, email, education, experience, skills)

    # Create LaTeX file
    create_latex_file(template_content)

    # Compile LaTeX to PDF
    compile_to_pdf()

    print("Resume generated successfully!")

if __name__ == "__main__":
    main()
