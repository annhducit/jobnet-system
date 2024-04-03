# Mapping between Model and Elastic 
from django_elasticsearch_dsl import fields, Document, DEDField, Field
from django_elasticsearch_dsl.registries import registry

from .models import Post

# Create Field
class DenseVector(DEDField, Field):
    name = 'dense_vector'
    def __init__(self, attr=None, **kwargs):
        dims = 768
        super(DenseVector, self).__init__(attr=attr, dims=dims, **kwargs)

# Create your models here.
@registry.register_document
class PostDocument(Document):
    id = fields.IntegerField(
            attr='id'
        )
    title = fields.TextField(
        attr='title',
        fields={
            'raw': {
                'type': 'keyword',
                
            }
        },
    )
    salary = fields.TextField(
        attr='salary',
        fields={
            'raw': {
                'type': 'keyword',
            }
        },
    )

    position = fields.TextField(
        attr='position',
        fields={
            'raw': {
                'type': 'keyword',
                
            }
        },
    )

    query = fields.TextField(
        attr='query',
        fields={
            'raw': {
                'type': 'keyword',
            }
        },
    )
    vector = DenseVector(attr='vector')
    createdAt = fields.DateField(
        attr='createdAt'
    )
    
    class Django(object):
        model = Post  # Link to the Django model

    class Index:
        name = 'post'  # Name of the Elasticsearch index
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 1,
        }