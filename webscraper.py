import requests
from bs4 import BeautifulSoup
from bs4.element import Tag
from readRes import *

def get_skills_from_website(url):
    blocks = ["p", "h1", "h2", "h3", "h4", "h5", "blockquote", "ul"]

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    rawTxt = str(soup)
    skills = extract_skills(rawTxt)


    return skills


