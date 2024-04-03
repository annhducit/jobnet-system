from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from elasticsearch import Elasticsearch

from .serializers import PostSerializer
from .documents import PostDocument
import json

from .embeddings import EmbeddingVector


# Create your views here.


class PostApiView(APIView):
    serializer_class = PostSerializer
    document = PostDocument
    es = Elasticsearch("http://localhost:9200")

    def get(self, request, *args, **kwargs):
        query = request.GET.get("query")
        vector = EmbeddingVector().embedQuery(query)
        results = self.es.search(
            index="post", 
            body={
                "knn": {
                    "field": "vector",
                    "query_vector": vector,
                    "num_candidates": 10,
                    "k": 3
                }
            }
        )
        return Response({"posts": results["hits"]['hits']}, status=status.HTTP_200_OK)
 
    def post(self, request, *args, **kwargs):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        id = body["id"]
        title = body["title"]
        salary = body["salary"]
        position = body["position"]
        resForEmbedding = EmbeddingVector().combineAndEmbeding(title, salary, position)
        vector = resForEmbedding['result']['vector']
        query = resForEmbedding['result']['queryCombine']

        post = {
            'id': id,
            'title': title,
            'salary': salary,
            'position': position,
            'query': query,
            'vector': vector,
            'createdAt': f"{datetime.today().strftime('%Y-%m-%d')}"
        }

        
        serializer = self.serializer_class(data=post)
        if serializer.is_valid() and type(post["vector"]) is list and len(post["vector"]) >= 768:
            
            self.es.index(
                index="post",
                document= post
            )
            return Response(post, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PostDetailApiView(APIView):
    serializer_class = PostSerializer
    document = PostDocument
    es = Elasticsearch("http://localhost:9200")

    def get_object(self, postId):
        result = self.es.search(
            index="post", 
            query={
               "bool": {
                    "must": [
                        {
                            "match": {
                                "id": postId
                            }
                        }
                    ]
                }
            }
        )["hits"]['hits']
        return None if len(result) == 0 else result[0]
    
    def get(self, request, postId, *args, **kwargs):
        document = self.get_object(postId)
        if document is None:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            ) 
        
        post = document["_source"]
        serializer = self.serializer_class(data = post) 
        if serializer.is_valid() and type(post["vector"]) is list and len(post["vector"]) >= 768: 
            if serializer.data is not None:
                return Response({
                    "res": post
                }, status=status.HTTP_200_OK)
        return Response({
            {"res": serializer.errors},
        }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, postId, *args, **kwargs):
        post = self.get_object(postId)
        if post is None:
            return Response(
                {"res": f"Post with id = {postId} does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        self.es.delete("post", post["_id"])
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
