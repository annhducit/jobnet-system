import openai
import os

from dotenv import load_dotenv

from rest_framework import generics, status
from rest_framework.response import Response

from .serializers import ChatRequestSerializer

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatAPIView(generics.GenericAPIView):

    serializer_class = ChatRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = self.perform_call_open_ai(serializer)
        return Response(data, status=status.HTTP_201_CREATED)

    def perform_call_open_ai(self, serializer):
        messages = serializer.validated_data.get('messages')
        system_message = {
            "role": "assistant",
            "content": "You are a helpful assistant. Your task is to provide short and concise answers."
        }
        messages.insert(0, system_message)
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=60
        )
        return completion.choices[0].message
