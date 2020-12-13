from django.db import models
from django.contrib.auth.models import User

class Room(models.Model):
    room_id = models.IntegerField(primary_key=True)
    room_name = models.CharField(max_length=100, null=True)
    units = models.FloatField(null=True)
    class Meta:
        db_table = "room"
        managed = True
    def __str__(self):
        return self.room_id


class Reservation(models.Model):
    booking_id = models.IntegerField(primary_key=True)
    check_in = models.DateField(null=True, blank=True)
    check_out = models.DateField(null=True, blank=True)
    no_adult = models.IntegerField()
    no_child = models.IntegerField()
    no_room = models.IntegerField()
    no_extra_bed = models.IntegerField()
    account_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id')
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE, db_column='room_id')
    class Meta:
        db_table = "reservation"
        managed = True
    def __str__(self):
        return self.booking_id
