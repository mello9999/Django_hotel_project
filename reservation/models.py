from django.db import models
from django.contrib.auth.models import User
from roomtype.models import RoomType
class Reservation(models.Model):
    booking_id = models.IntegerField(primary_key=True)
    check_in = models.DateField(null=True, blank=True)
    check_out = models.DateField(null=True, blank=True)
    no_adult = models.IntegerField()
    no_child = models.IntegerField()
    no_room = models.IntegerField()
    extra_bed = models.BooleanField()
    account_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='account_id')
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, db_column='room_type')
    class Meta:
        db_table = "reservation"
        managed = True
    def __str__(self):
        return self.booking_id
