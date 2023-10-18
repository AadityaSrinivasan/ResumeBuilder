import openai

API_KEY = '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'

openai.api_key = API_KEY

completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", messages=[{"role": "user", "content": "What is my name?"}])
print(completion)

