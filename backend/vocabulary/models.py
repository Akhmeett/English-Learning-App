from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=50)

class Word(models.Model):
    english = models.CharField(max_length=200)
    kazakh = models.CharField(max_length=200)
    example = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)