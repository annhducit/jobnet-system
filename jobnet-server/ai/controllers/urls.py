from django.urls import path
from . import controller

urlpatterns  = [
    path('', controller.askGPT),
    path('post/generate', controller.generatePost),
    path('post/parseJD', controller.parseJD)
]