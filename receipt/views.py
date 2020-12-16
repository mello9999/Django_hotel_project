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

from receipt.models import *
import json

def index(request):
    receipts = list(Receipt.objects.order_by('receipt_no').all().values())
    data = dict()
    data['receipts'] = receipts
    return render(request, 'receipt/receipt.html', data)

class ReceiptList(View):
    def get(self, request):
        receipts = list(Receipt.objects.order_by('receipt_no').all().values())
        data = dict()
        data['receipts'] = receipts
        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response

class ReceiptDetail(View):
    def get(self, request, pk):
    
        receipt = get_object_or_404(Receipt, pk=pk)
        data = dict()
        
        data['reservation'] = model_to_dict(Receipt)
        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response

class ReceiptForm(forms.ModelForm):
    class Meta:
        model = Receipt
        fields = '__all__'


@method_decorator(csrf_exempt, name='dispatch')
class ReceiptCreate(View):
    def post(self, request):
        data = dict()
        request.POST = request.POST.copy()
        if Receipt.objects.count() != 0:
            receipt_no_max = Receipt.objects.aggregate(Max('receipt_no'))['receipt_no__max']
            next_receipt_no = receipt_no_max+1
        else:
            next_receipt_no = 0
        request.POST['receipt_no'] = next_receipt_no
        request.POST['account_id'] = request.user.id
        request.POST['date'] = reFormatDateMMDDYYYY(request.POST['date'])
        request.POST['total_received'] = reFormatNumber(request.POST['total_received'])

        form = ReceiptForm(request.POST)
        if form.is_valid():
            receipt = form.save()
            data['receipt'] = model_to_dict(receipt)
        else:
            data['error'] = 'form not valid!'

        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response

@method_decorator(csrf_exempt, name='dispatch')
class ReceiptUpdate(View):
    def post(self, request, pk):
        data = dict()
        receipt = Receipt.objects.get(pk=pk)
        request.POST = request.POST.copy()
        request.POST['receipt_no'] = pk
        request.POST['date'] = reFormatDateMMDDYYYY(request.POST['date'])
        request.POST['total_received'] = reFormatNumber(request.POST['total_received'])
        form = ReceiptForm(instance=receipt, data=request.POST)
        if form.is_valid():
            receipt = form.save()
            data['receipt'] = model_to_dict(receipt)
        else:
            data['error'] = 'form not valid!'

        response = JsonResponse(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response

@method_decorator(csrf_exempt, name='dispatch')
class ReceiptDelete(View):
    def post(self, request, pk):
        data = dict()
        receipt = Receipt.objects.get(pk=pk)
        if receipt:
            receipt.delete()
            data['message'] = "Receipt Deleted!"
        else:
            data['message'] = "Error!"

        return JsonResponse(data)

class ReceiptPDF(View):
    def get(self, request, pk, pk2):

        pass
        #return JsonResponse(data)
        return render(request, 'receipt/pdf.html', data)

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [name[0].replace(" ", "_").lower() for name in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

def reFormatDateMMDDYYYY(ddmmyyyy):
        if (ddmmyyyy == ''):
            return ''
        return ddmmyyyy[3:5] + "/" + ddmmyyyy[:2] + "/" + ddmmyyyy[6:]

def reFormatNumber(str):
        if (str == ''):
            return ''
        return str.replace(",", "")