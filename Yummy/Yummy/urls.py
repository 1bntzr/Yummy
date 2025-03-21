"""
URL configuration for Yummy project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path
from . import views
from .views import dishes
from .views import about
from .views import menu
from .views import next_order_page
from .views import order
from .views import review
from .views import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('about/', about, name='about'),
    path('dishes/', dishes, name='dishes'),
    path('menu/', menu, name='menu'),
    path('nextorderpage/', next_order_page, name='next_order_page'),
    path('order/', order ,name="order"),
    path('review/', review ,name="review")
]
