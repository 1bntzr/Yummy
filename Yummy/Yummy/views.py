from django.shortcuts import render

def index(request):
    return render(request, 'Yummy/index.html')

def about(request):
    return render(request, 'Yummy/about.html')

def dishes(request):
    return render(request, 'Yummy/dishes.html')

def menu(request):
    return render(request, 'Yummy/menu.html')

def next_order_page(request):
    return render(request, 'Yummy/nextOrderPage.html')

def order(request):
    return render(request, 'Yummy/order.html')

def review(request):
    return render(request, 'Yummy/review.html')