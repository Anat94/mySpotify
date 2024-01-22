from django.db import models

class Users(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=200)
    password = models.CharField(default=200)
    name = models.CharField(max_length=200)
    birth_date = models.DateField()
    gender = models.CharField(max_length=200)