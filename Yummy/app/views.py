from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView, TemplateView, FormView, CreateView
from django.views import View
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse_lazy, reverse
from .models import Dish, Order, Review
from django.utils import timezone
from django.contrib import messages
from django.db.models import Avg

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class IndexView(TemplateView):
    """
    Головна сторінка сайту
    """
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['featured_dishes'] = Dish.objects.all()[:4]
        context['title'] = 'Головна сторінка'
        return context


class AboutView(TemplateView):
    """
    Сторінка "Про нас"
    """
    template_name = 'about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Про нас'
        return context


class DishesListView(ListView):
    """
    Відображає всі страви
    """
    model = Dish
    template_name = 'dishes.html'
    context_object_name = 'dishes'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        for dish in context['dishes']:
            avg_rating = Review.objects.filter(dish=dish).aggregate(Avg('rating'))['rating__avg']
            dish.avg_rating = avg_rating if avg_rating else 0

        context['title'] = 'Всі страви'
        return context


class MenuListView(ListView):
    """
    Відображає меню з усіма стравами та їх деталями
    """
    model = Dish
    template_name = 'menu.html'
    context_object_name = 'menu_items'

    def get_queryset(self):
        return Dish.objects.all().order_by('price')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        for dish in context['menu_items']:
            avg_rating = Review.objects.filter(dish=dish).aggregate(Avg('rating'))['rating__avg']
            dish.avg_rating = avg_rating if avg_rating else 0
            dish.recent_reviews = Review.objects.filter(dish=dish).order_by('-id')[:3]

        context['title'] = 'Меню'
        return context

@method_decorator(csrf_exempt, name='dispatch')
class NextOrderPageView(View):
    """
    Сторінка з формою для оформлення замовлення
    """
    template_name = 'nextOrderPage.html'

    def post(self, request, *args, **kwargs):
        dish_id = request.POST.get('dish_id')
        dish = get_object_or_404(Dish, id=dish_id)

        context = {
            'dish': dish,
            'title': 'Оформлення замовлення'
        }
        return render(request, self.template_name, context)

    def get(self, request, *args, **kwargs):
        return redirect('menu')

@method_decorator(csrf_exempt, name='dispatch')
class NextOrderPageView(View):
    """
    Сторінка з формою для оформлення замовлення
    """
    template_name = 'nextOrderPage.html'

    def post(self, request, *args, **kwargs):
        dish_id = request.POST.get('dish_id')
        dish = get_object_or_404(Dish, id=dish_id)

        context = {
            'dish': dish,
            'title': 'Оформлення замовлення'
        }
        return render(request, self.template_name, context)

    def get(self, request, *args, **kwargs):
        return render(request, 'nextOrderPage.html')

@method_decorator(csrf_exempt, name='dispatch')
class OrderCreateView(View):
    """
    Обробка форми замовлення
    """

    def post(self, request, *args, **kwargs):
        dish_id = request.POST.get('dish_id')
        customer_name = request.POST.get('customer_name')
        phone_number = request.POST.get('phone_number')
        order_item = request.POST.get('order_item')
        quantity = request.POST.get('quantity')
        delivery_datetime = request.POST.get('delivery_datetime')
        address = request.POST.get('address')
        message = request.POST.get('message', '')

        try:
            dish = get_object_or_404(Dish, id=dish_id)
            new_order = Order(
                customer_name=customer_name,
                phone_number=phone_number,
                dish=dish,
                order_item=order_item,
                quantity=int(quantity),
                delivery_datetime=delivery_datetime,
                address=address,
                message=message
            )
            new_order.save()

            messages.success(request, 'Ваше замовлення успішно оформлено!')
            return redirect('nextorderpage')
        except Exception as e:
            messages.error(request, f'Помилка при оформленні замовлення: {str(e)}')
            return redirect('order')

    def get(self, request, *args, **kwargs):
        return render(request, 'order.html')

@method_decorator(csrf_exempt, name='dispatch')
class ReviewCreateView(View):
    """
    Обробка форми відгуку
    """

    def post(self, request, *args, **kwargs):
        dish_id = request.POST.get('dish_id')
        user_name = request.POST.get('user_name')
        rating = request.POST.get('rating')
        comments = request.POST.get('comments', '')

        try:
            dish = get_object_or_404(Dish, id=dish_id)
            new_review = Review(
                dish=dish,
                user_name=user_name,
                rating=rating,
                comments=comments
            )
            new_review.save()

            messages.success(request, 'Дякуємо за ваш відгук!')
            return redirect('dishes')
        except Exception as e:
            messages.error(request, f'Помилка при додаванні відгуку: {str(e)}')
            return redirect('dishes')

    def get(self, request, *args, **kwargs):
        return redirect('dishes')