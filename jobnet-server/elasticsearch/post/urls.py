from django.urls import path, include
from .views import (
    PostApiView, PostDetailApiView
)

urlpatterns = [
    path('', PostApiView.as_view()),
    path('/<int:postId>', PostDetailApiView.as_view())
]