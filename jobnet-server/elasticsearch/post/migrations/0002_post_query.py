# Generated by Django 4.2.5 on 2024-01-18 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='query',
            field=models.TextField(default=''),
        ),
    ]
