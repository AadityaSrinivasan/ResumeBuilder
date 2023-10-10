#key
#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
#pip install openai
import openai
import os
import pandas as pd
import time

openai.api_key = '<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>'

def get_completion(prompt, model="gpt-3.5-turbo"):

messages = [{"role": "user", "content": prompt}]

response = openai.ChatCompletion.create(

model=model,

messages=messages,

temperature=0,

)

return response.choices[0].message["content"]
