from django.db import models

class RoomType(models.Model):
    type = models.CharField(max_length=100, primary_key=True ,null=False)
    number = models.IntegerField()
    available = models.IntegerField()
    price = models.FloatField(null=True, blank=True)
    exprice = models.FloatField(null=True, blank=True)
    class Meta:
        db_table = "roomtype"
        managed = True
