from pdfminer.high_level import extract_text
import nltk
from pyresparser import ResumeParser
from nltk.corpus import stopwords
import spacy
import re
from spacy.matcher import Matcher
import subprocess

'''
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')'''

def read_skills_from_file(file_path):
    skills = []
    with open(file_path, 'r') as file:
        for line in file:
            skills.append(line.strip())
    return skills

SKILLS_FILE = 'skills.txt'
SKILLS_DB = read_skills_from_file(SKILLS_FILE)


PHONE_REG = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
EMAIL_REG = re.compile(r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+', re.I)
'''SKILLS_DB = [
    'machine learning',
    'data science',
    'python',
    'word',
    'excel',
    'English',
]'''
nlp = spacy.load('en_core_web_sm')
STOPWORDS = set(stopwords.words('english'))
EDUCATION_WORDS = [
    'school',
    'college',
    'univer',
    'academy',
    'faculty',
    'institute',
    'faculdades',
    'Schola',
    'schule',
    'lise',
    'lyceum',
    'lycee',
    'polytechnic',
    'kolej',
    'ünivers',
    'okul',
    
]

class Education:
    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa
    
    def __str__(self):
        return f"{self.name} GPA: {self.gpa}"

class Experience:
    def __init__(self, title, company, startDate, endDate, info):
        self.title = title
        self.company = company
        self.startDate = startDate
        self.endDate = endDate #0 meanns currently working
        self.info = info

    
    def __str__(self):
        return f"{self.name} GPA: {self.gpa}"
    
class Project:
    def __init__(self, name, tech,info, date):
        self.name = name
        self.tech = tech
        self.info = info
        self.date = date
    
    def __str__(self):
        return f"Project Name: {self.name}\nTechnology: {self.tech}\nInfo: {self.info}"

institution_patterns = [
    [{"LOWER": "college"}, {"POS": "ADP", "OP": "?"}, {"POS": "PROPN", "OP": "+"}],
    [{"LOWER": "university"}, {"POS": "ADP", "OP": "?"}, {"POS": "PROPN", "OP": "+"}],
    [{"POS": "PROPN", "OP": "+"}, {"LOWER": "college"}],
    [{"POS": "PROPN", "OP": "+"}, {"LOWER": "university"}],
    [{"LOWER": "highschool"}],
    [{"LOWER": "high"}, {"LOWER": "school"}],
]



def extract_text_from_pdf(pdf_path):
    
    return extract_text(pdf_path)
 
def extract_names(txt):
    person_names = []
 
    for sent in nltk.sent_tokenize(txt):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'PERSON':
                person_names.append(
                    ' '.join(chunk_leave[0] for chunk_leave in chunk.leaves())
                )
 
    return person_names

def extract_namesPP(pdf_path):
    data = ResumeParser(pdf_path).get_extracted_data()
    return data.get("name", "Name not found")

def extract_phone_number(resume_text):
    phone = re.findall(PHONE_REG, resume_text)
 
    if phone:
        number = ''.join(phone[0])
 
        if resume_text.find(number) >= 0 and len(number) < 16:
            return number
    return None

def extract_emails(resume_text):
    return re.findall(EMAIL_REG, resume_text)

def extract_skills(input_text):
    stop_words = set(nltk.corpus.stopwords.words('english'))
    word_tokens = nltk.tokenize.word_tokenize(input_text)
 
    # remove the stop words
    filtered_tokens = [w for w in word_tokens if w not in stop_words]
 
    # remove the punctuation
    filtered_tokens = [w for w in word_tokens if w.isalpha()]
 
    # generate bigrams and trigrams (such as artificial intelligence)
    bigrams_trigrams = list(map(' '.join, nltk.everygrams(filtered_tokens, 2, 3)))
 
    # we create a set to keep the results in.
    found_skills = set()
 
    # we search for each token in our skills database
    for token in filtered_tokens:
        if token.lower() in SKILLS_DB:
            found_skills.add(token)
 
    # we search for each bigram and trigram in our skills database
    for ngram in bigrams_trigrams:
        if ngram.lower() in SKILLS_DB:
            found_skills.add(ngram)
 
    return found_skills

def extract_education_name(sentence, keyword):
    # Use regular expressions to extract the education name
    pattern = r'\b' + re.escape(keyword) + r'\b(.+)'  # Matches "keyword" followed by the institution name
    match = re.search(pattern, sentence, re.IGNORECASE)
    
    if match:
        return match.group(1).strip()
    else:
        return None
    
def extract_educationS(sentence):
    # Process the input sentence with spaCy
    doc = nlp(sentence)
    
    # Initialize a list to store education-related words
    education_keywords = ["college", "university", "school"]
    
    # Initialize a variable to store the detected education name
    education_name = None
    
    # Iterate through the tokens in the sentence
    for token in doc:
        # Check if the token is in the education keywords and is not a stopword
        if token.text.lower() in education_keywords and token.text.lower() not in STOPWORDS:
            
            # Get the text surrounding the keyword to extract the education name
            education_name = sentence
            #break  # Stop searching after the first match
    
    return education_name


def reduceEDU(sentence):
    # Process the input sentence with spaCy
    doc = nlp(sentence)
    
    # Initialize a variable to store the detected education name
    education_name = None
    
    # Iterate through named entities in the sentence
    for ent in doc.ents:
        if ent.label_ == "ORG" or ent.label_ == "EDU":  # Check for organization or education labels
            education_name = ent.text
            break  # Stop searching after the first match
    
    return education_name


def getGPA(sentence):
    # Check if the sentence contains the word "unweighted" (case-insensitive)
    if re.search(r'unweighted', sentence, re.IGNORECASE):
        return []

    gpa_pattern = r'\b[0-4]\.\d{1,4}\b'
    gpas = re.findall(gpa_pattern, sentence)
    
    if gpas:
        return gpas
    else:
        return []
    
def refineEdus(edus):
    sorted_education_list = sorted(edus, key=len)
    # Initialize a new list to store the unique values
    

    # Iterate through the list and compare each string with all other strings
    numLen = 0
    for i in range(0,len(sorted_education_list)):
        j = i
        while(j< len(sorted_education_list)):
            if sorted_education_list[i] in sorted_education_list[j] and i!=j:
                sorted_education_list.pop(j)
                j-=1
            else:
                j+=1
    return sorted_education_list

def extract_education(input_text):
    organizations = []
    education = set()
    gpa = []
    # first get all the organization names using nltk
    for sent in nltk.sent_tokenize(input_text):
        temp = sent.split('\n')
        line = [item for item in temp if item != ""]
        for sentence in line:
            gpa += getGPA(sentence)
            edu = extract_educationS(sentence)
            
            if edu is not None:
                education.add(edu)
    educations = set()
    for index, sentence in enumerate(education, 0):
        
        edu =  reduceEDU(sentence)
        
        if edu is not None:
            matcher = Matcher(nlp.vocab)
            for pattern in institution_patterns:
                matcher.add("EducationalInstitution", [pattern])
            doc = nlp(edu)
            matches = matcher(doc)
            if matches:
                educations.add(edu)
    
    finalEducations = refineEdus(list(educations))
    
    if len(gpa) != len(finalEducations):
        gpa += ["0.00"] * (len(finalEducations) - len(gpa))
    for index, element in enumerate(finalEducations):
        finalEducations[index] = Education(element, gpa[index])

    return finalEducations

def getWebsites(text):
    website_pattern = r'\b(?:https?://|www\.)\S+\b|\b\S+@\w+\.\w+\b'

    # Use re.findall to extract websites from the text
    websites = re.findall(website_pattern, text)
    print(websites)
    return websites



def analyzeRes(text, pdfpath):
    results = {}
    #names = extract_names(text)
    names = extract_namesPP(pdfpath)
    number = extract_phone_number(text)
    email= extract_emails(text)
    skills = extract_skills(text)

    education = extract_education(text)
    websites = getWebsites(text)


    if names:
        results['name'] = names
    if number:
        results['number'] = number
    if email:
        results['email'] = email[0]
    if skills:
        results['skills'] = list(skills)

    if education:
        results['education'] = education
        
    if websites:
        websites = [element for element in websites if element not in email[0]]
        results['website'] = websites

    
    

    return results

