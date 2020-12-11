from django.shortcuts import render,redirect
from django.contrib import messages
from django.contrib.auth import authenticate,login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserRegisterForm
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context

from django.shortcuts import get_object_or_404
from django.views.generic import View
from django.http import JsonResponse
from django import forms
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.forms.models import model_to_dict
from django.db.models import Max
from django.db import connection
import json


##################################################################
####################index#######################################
def index(request):
    return render(request, 'index.html',{'title':'index'}) # firstpage >> Guest view

########################################################################
########### register here #####################################

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST) or None
        if form.is_valid():
            username = request.POST.get('username')
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'user/register.html', {'form': form,'title':'register here'})

###################################################################################
################login forms###################################################

def Login(request):
    if request.method == 'POST':

        #AuthenticationForm_can_also_be_used__

        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            form = login(request,user)
            messages.success(request, f' welcome {username} !!')
            return redirect('check_status')
        else:
            messages.info(request, f'account done not exit plz sign in')
    form = AuthenticationForm()
    return render(request, 'user/login.html', {'form':form,'title':'log in'})

def Searchnow(request): 
    if request.method == 'POST':
        check_in = request.POST.get('check_in')
        check_out = request.POST.get('check_out')
        data = {'check_in' : check_in, 'check_out':check_out}
        #print(data,1111111)
    return render(request, 'index.html')

def CheckStatus(request):
    if request.method == 'POST':
        check_in = request.POST.get('check_in')
        check_out = request.POST.get('check_out')
        data = {'check_in' : check_in, 'check_out':check_out}
        
    return render(request, 'status/check.html')

def SingleRoomDetail(request):

    return render(request, 'room/single.html')

def DoubleRoomDetail(request):

    return render(request, 'room/double.html')

def SuiteRoomDetail(request):
    
    return render(request, 'room/suite.html')

def DeluxeRoomDetail(request):
    
    return render(request, 'room/deluxe.html')

def PremierRoomDetail(request):
    
    return render(request, 'room/premier.html')

def HotelReservation(request):
    return render(request, 'reserve/reserve.html')