from resume_parser import resumeparse
from pyresparser import ResumeParser
data = resumeparse.read_file("/Users/sayok/Desktop/kirthiResume.pdf")
data= ResumeParser("/Users/sayok/Desktop/kirthiResume.pdf").get_extracted_data()
for key, value in data.items():
        print(f"{key}: {value}")