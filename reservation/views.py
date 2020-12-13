from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import get_object_or_404
from django.views.generic import View
from django.http import JsonResponse
from django import forms
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.forms.models import model_to_dict
from django.db.models import Max
from django.db import connection

from reservation.models import *
import json

# Create your views here.
class ReservationList(View):
    def get(self, request):
        reservation = list(Reservation.objects.all().values())        
        data = dict()
        data['reservation'] = reservation
        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response

class ReservationDetail(View):
    def get(self, request, pk):
        reservation = get_object_or_404(Reservation, pk=pk)
        data = dict()
        
        data['reservation'] = model_to_dict(reservation)
        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response

class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = '__all__'

@method_decorator(csrf_exempt, name='dispatch')
class ReservationCreate(View):
    def post(self, request):
        data = dict()
        request.POST = request.POST.copy()
        if Reservation.objects.count() != 0:
            booking_id_max = Reservation.objects.aggregate(Max('booking_id'))['booking_id__max']
            next_booking_id = booking_id_max+1
        else:
            next_booking_id = 0
        request.POST['booking_id'] = next_booking_id
        request.POST['check_in'] = reFormatDateMMDDYYYY(request.POST['check_in'])
        request.POST['check_out'] = reFormatDateMMDDYYYY(request.POST['check_out'])
        request.POST['no_adult'] = reFormatNumber(request.POST['no_adult'])
        request.POST['no_child'] = reFormatNumber(request.POST['no_child'])
        request.POST['no_room'] = reFormatNumber(request.POST['no_room'])
        request.POST['no_extra_bed'] = reFormatNumber(request.POST['no_extra_bed'])

        form = ReservationForm(request.POST)
        
        if form.is_valid():
            reservation = form.save()

            data['reservation'] = model_to_dict(reservation)
        else:
            data['error'] = 'form not valid!'

        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response


@method_decorator(csrf_exempt, name='dispatch')
class ReservationUpdate(View):
    def post(self, request, booking_id):        
        data = dict()
        reservation = Reservation.objects.get(pk=booking_id)
        request.POST = request.POST.copy()
        request.POST['booking_id'] = booking_id
        request.POST['check_in'] = reFormatDateMMDDYYYY(request.POST['check_in'])
        request.POST['check_out'] = reFormatDateMMDDYYYY(request.POST['check_out'])
        request.POST['no_adult'] = reFormatNumber(request.POST['no_adult'])
        request.POST['no_child'] = reFormatNumber(request.POST['no_child'])
        request.POST['no_room'] = reFormatNumber(request.POST['no_room'])
        request.POST['no_extra_bed'] = reFormatNumber(request.POST['no_extra_bed'])

        form = ReservationForm(instance=reservation, data=request.POST)
        if form.is_valid():
            reservation = form.save()

            data['reservation'] = model_to_dict(reservation)
        else:
            data['error'] = 'form not valid!'

        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response

@method_decorator(csrf_exempt, name='dispatch')
class InvoiceDelete(View):
    def post(self, request, booking_id):
        data = dict()
        reservation = Reservation.objects.get(pk=booking_id)
        if reservation:
            reservation.delete()
            data['message'] = "Reservation Deleted!"
        else:
            data['message'] = "Error!"

        return JsonResponse(data)

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [name[0].replace(" ", "_").lower() for name in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]
