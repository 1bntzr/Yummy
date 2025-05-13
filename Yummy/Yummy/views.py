from django.shortcuts import render

def index(request):
    return render(request, 'Yummy/../app/templates/index.html')

def about(request):
    return render(request, 'Yummy/../app/templates/about.html')

def dishes(request):
    return render(request, 'Yummy/../app/templates/dishes.html')

def menu(request):
    return render(request, 'Yummy/../app/templates/menu.html')

def next_order_page(request):
    return render(request, 'Yummy/../app/templates/nextOrderPage.html')

def order(request):
    return render(request, 'Yummy/../app/templates/order.html')

def review(request):
    return render(request, 'Yummy/../app/templates/review.html')