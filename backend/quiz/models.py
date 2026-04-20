from django.db import models
from django.contrib.auth.models import User

class QuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    total = models.IntegerField()
    level = models.CharField(max_length=10)
    duration = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    