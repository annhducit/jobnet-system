from django.urls import path

from . import views

urlpatterns = [
    path("", views.ChatAPIView.as_view())
]
