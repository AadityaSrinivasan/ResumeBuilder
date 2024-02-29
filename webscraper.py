import requests
from bs4 import BeautifulSoup
from bs4.element import Tag
from readRes import *

def get_skills_from_website(url):
    # Check if the URL is valid
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx and 5xx status codes)
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to fetch data from {url}. {e}")
        return 0

    # If the response is successful, continue with parsing
    soup = BeautifulSoup(response.content, 'html.parser')
    rawTxt = str(soup)
    skills = extract_skills(rawTxt)

    return skills


