import requests
from bs4 import BeautifulSoup
from bs4.element import Tag

blocks = ["p", "h1", "h2", "h3", "h4", "h5", "blockquote", "ul"]

url = "https://jobs.jobvite.com/xylem/job/oJEMqfwj?nl=1&nl=1&fr=false&ref=Simplify"

def getTextFromWebstie(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    output = ''
    for element in soup.find_all(blocks):
        if isinstance(element, Tag):
            if element.name == 'ul':
                for li in element.find_all('li'):
                    output += '{} '.format(li.get_text(strip=True))
            else:
                output += '{} '.format(element.get_text(strip=True))

print(getTextFromWebstie(url))
