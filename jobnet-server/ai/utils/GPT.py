import openai
from django.conf import settings
openai.api_key = settings.OPENAI_APIKEY


class GPT:
    def chat(ques):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "user",
                "content": ques
            }]
        )
        return response.choices[0].message["content"]
