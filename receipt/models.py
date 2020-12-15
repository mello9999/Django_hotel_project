from django.db import models
from django.contrib.auth.models import User

class Receipt(models.Model):
    receipt_no = models.IntegerField(primary_key=True)
    date = models.DateField(null=True)
    account_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='account_id')
    payment_method = models.CharField(max_length=10)
    payment_reference  = models.FloatField(null=True, blank=True)
    total_received = models.FloatField(null=True, blank=True)
    remarks = models.CharField(max_length=255, null=True, blank=True)
    class Meta:
        db_table = "receipt"
        managed = False