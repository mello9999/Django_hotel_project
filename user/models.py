from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Room(models.Model):
    room_code = models.CharField(max_length=100, primary_key=True)
    room_name = models.CharField(max_length=100, null=True)
    units = models.FloatField(null=True)
    class Meta:
        db_table = "room"
        managed = False
    def __str__(self):
        return self.room_code

class PaymentMethod(models.Model):
    payment_method = models.CharField(max_length=100, primary_key=True ,null=False)
    payment_reference = models.CharField(max_length=100 ,null=False)
    class Meta:
        db_table = "payment_method"
        managed = False
    def __str__(self):
        return self.payment_method

