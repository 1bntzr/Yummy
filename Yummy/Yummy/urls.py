from django.contrib import admin
from django.urls import path, include
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
    path('review/', review ,name="review"),
    path('api/', include('api.urls')),
]
