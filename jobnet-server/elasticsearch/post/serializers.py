from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from rest_framework import serializers

from .documents import PostDocument
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Post
        # document = PostDocument
        fields = ("id", "title", "salary","position", "query", "vector", "createdAt")
