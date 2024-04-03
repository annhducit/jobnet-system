from django.db import models
from elasticsearch_dsl import DenseVector
from datetime import datetime

# Create your models here.

class Post(models.Model):
    id = models.UUIDField(primary_key=True)
    title = models.TextField()
    salary = models.TextField()
    position = models.TextField()
    query = models.TextField(default='')
    vector = DenseVector(768)
    createdAt = models.DateField(default=datetime.today().strftime('%Y-%m-%d'))

    
    def __str__(self):
        return f'Post(id={self.id}, title={self.title}, salary={self.salary}, position={self.position}, query={self.query}, vector={self.vector})'


