"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from user import views as user_view
from reservation import views as reserve_view
from roomtype import views as roomtype_view
from django.contrib.auth import views as auth

from .router import router
from rest_framework.authtoken import views
from django.conf.urls import include, url
from invoice import views as invoice_view
urlpatterns = [

    path('admin/', admin.site.urls),

    ######### api path ##########################
    path('api/',include(router.urls)),
    path('api-token-auth/',views.obtain_auth_token,name='api-tokn-auth'),

    #####user related path##########################
    path('',include('user.urls')),
    path('login/',user_view.Login,name='login'),
    path('logout/',auth.LogoutView.as_view(template_name= 'index.html'),name='logout'),
    path('register/',user_view.register,name='register'),
    path('search_now/',user_view.Searchnow,name='search_now'),
    
    path('single_room/',user_view.SingleRoomDetail,name="single"),
    path('double_room/',user_view.DoubleRoomDetail,name="double"),
    path('suite_room/',user_view.SuiteRoomDetail,name="suite"),
    path('deluxe_room/',user_view.DeluxeRoomDetail,name="deluxe"),
    path('premier_room/',user_view.PremierRoomDetail,name="premier"),

    path('roomtype/update',reserve_view.ReservationUpdate.as_view(),name="roomtype_update"),
    
    path('reserve',user_view.HotelReservation,name="reserve"),
    path('reserve/create',reserve_view.ReservationCreate.as_view(),name="reserve_create"),
    path('reserve/update',reserve_view.ReservationUpdate.as_view(),name="reserve_update"),
    path('reserve/delete/<booking_id>',reserve_view.ReservationDelete.as_view(),name="reserve_delete"),
    path('reserve/list',reserve_view.ReservationList.as_view(),name="reserve_list"),
    path('reserve/detail',reserve_view.ReservationDetail.as_view(),name="reserve_detail"),
    path('total_payment/',reserve_view.cart,name="total_payment"),

    path('pay_form/',user_view.PaymentForm,name="pay_form"),

    path('roomtype/update/<pk>',roomtype_view.RoomTypeUpdate.as_view(),name="roomtype_update"),
    path('roomtype/detail/<pk>',roomtype_view.RoomTypeDetail.as_view(),name="roomtype_detail"),

    path('invoice/',user_view.Invoice,name="invoice"),
    path('receipt/',user_view.Receipt,name="receipt"),
]
