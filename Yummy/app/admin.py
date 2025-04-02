from django.contrib import admin
from .models import Dish, Order, Review

admin.site.register(Dish)
admin.site.register(Order)
admin.site.register(Review)