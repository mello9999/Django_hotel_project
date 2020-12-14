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

def cart(request):
    reservation = list(Reservation.objects.all().values())
    
    nl = []   
    for r in reservation:
        print(r)
        if r['account_id_id'] == request.user.id:
            nl.append(r)
    data = dict()
    data['reservation'] = nl
    return render(request, 'bill/totalpayment.html', data)

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
        print(request.POST, 'request.POSTrequest.POSTrequest.POST')
        if Reservation.objects.count() != 0:
            booking_id_max = Reservation.objects.aggregate(Max('booking_id'))['booking_id__max']
            next_booking_id = booking_id_max+1
        else:
            next_booking_id = 0
        request.POST['booking_id'] = next_booking_id
        request.POST['account_id'] = request.user.id
        
        form = ReservationForm(request.POST)
        if form.is_valid():
            reservation = form.save()

            data['reservation'] = model_to_dict(reservation)
        else:
            print(form.errors,'errrrrrrrrrrrrrrrrrrrrrrr')
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
class ReservationDelete(View):
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


def reFormatDateMMDDYYYY(ddmmyyyy):
    if (ddmmyyyy[4:7] == "Jan"):
        return "01/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Feb"):
        return "02/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Mar"):
        return "03/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Apr"):
        return "04/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "May"):
        return "05/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Jun"):
        return "06/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Jul"):
        return "07/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Aug"):
        return "08/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Sep"):
        return "09/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Oct"):
        return "10/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Nov"):
        return "11/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
    elif (ddmmyyyy[4:7] == "Dec"):
        return "12/" + ddmmyyyy[8:10] +'/'+ ddmmyyyy[11:]
def reFormatNumber(str):
        if (str == ''):
            return ''
        return str.replace(",", "")