from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone
from decimal import Decimal
from datetime import datetime, timedelta
from .models import Dish, Order, Review
import json


from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("""
        SELECT pg_terminate_backend(pid)
        FROM pg_stat_activity
        WHERE datname = 'test_postgres' AND pid <> pg_backend_pid();
    """)


class IndexViewTest(TestCase):
    def setUp(self):
        self.dish1 = Dish.objects.create(
            name="Тестова страва 1",
            description="Опис тестової страви 1",
            price=Decimal('100.00'),
            image_url="https://example.com/image1.jpg"
        )
        self.dish2 = Dish.objects.create(
            name="Тестова страва 2",
            description="Опис тестової страви 2",
            price=Decimal('150.00'),
            image_url="https://example.com/image2.jpg"
        )

        self.client = Client()

    def test_index_view_status_code(self):
        """Тест перевіряє, що головна сторінка повертає статус код 200"""
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)

    def test_index_view_template(self):
        """Тест перевіряє, що використовується правильний шаблон"""
        response = self.client.get(reverse('index'))
        self.assertTemplateUsed(response, 'index.html')

    def test_index_view_context(self):
        """Тест перевіряє, що контекст містить правильні дані"""
        response = self.client.get(reverse('index'))
        self.assertTrue('featured_dishes' in response.context)
        self.assertTrue('title' in response.context)
        self.assertEqual(response.context['title'], 'Головна сторінка')
        self.assertEqual(len(response.context['featured_dishes']), 2)  # Дві тестові страви


class AboutViewTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_about_view_status_code(self):
        """Тест перевіряє, що сторінка About повертає статус код 200"""
        response = self.client.get(reverse('about'))
        self.assertEqual(response.status_code, 200)

    def test_about_view_template(self):
        """Тест перевіряє, що використовується правильний шаблон"""
        response = self.client.get(reverse('about'))
        self.assertTemplateUsed(response, 'about.html')

    def test_about_view_context(self):
        """Тест перевіряє, що контекст містить правильні дані"""
        response = self.client.get(reverse('about'))
        self.assertTrue('title' in response.context)
        self.assertEqual(response.context['title'], 'Про нас')


class DishesListViewTest(TestCase):
    def setUp(self):
        self.dish1 = Dish.objects.create(
            name="Тестова страва 1",
            description="Опис тестової страви 1",
            price=Decimal('100.00'),
            image_url="https://example.com/image1.jpg"
        )
        self.dish2 = Dish.objects.create(
            name="Тестова страва 2",
            description="Опис тестової страви 2",
            price=Decimal('150.00'),
            image_url="https://example.com/image2.jpg"
        )

        self.review1 = Review.objects.create(
            dish=self.dish1,
            user_name="Тестовий користувач 1",
            rating=Decimal('4.5'),
            comments="Дуже смачно!"
        )

        self.client = Client()

    def test_dishes_view_status_code(self):
        """Тест перевіряє, що сторінка страв повертає статус код 200"""
        response = self.client.get(reverse('dishes'))
        self.assertEqual(response.status_code, 200)

    def test_dishes_view_template(self):
        """Тест перевіряє, що використовується правильний шаблон"""
        response = self.client.get(reverse('dishes'))
        self.assertTemplateUsed(response, 'dishes.html')

    def test_dishes_view_context(self):
        """Тест перевіряє, що контекст містить правильні дані"""
        response = self.client.get(reverse('dishes'))
        self.assertTrue('dishes' in response.context)
        self.assertTrue('title' in response.context)
        self.assertEqual(response.context['title'], 'Всі страви')
        self.assertEqual(len(response.context['dishes']), 2)

    def test_dishes_view_rating(self):
        """Тест перевіряє, що страви містять правильний середній рейтинг"""
        response = self.client.get(reverse('dishes'))
        dishes = response.context['dishes']

        self.assertEqual(dishes[0].avg_rating, Decimal('4.5'))

        self.assertEqual(dishes[1].avg_rating, 0)


class MenuListViewTest(TestCase):
    def setUp(self):
        self.dish1 = Dish.objects.create(
            name="Дорога страва",
            description="Опис дорогої страви",
            price=Decimal('200.00'),
            image_url="https://example.com/image1.jpg"
        )
        self.dish2 = Dish.objects.create(
            name="Бюджетна страва",
            description="Опис бюджетної страви",
            price=Decimal('50.00'),
            image_url="https://example.com/image2.jpg"
        )
        self.dish3 = Dish.objects.create(
            name="Страва середньої ціни",
            description="Опис страви середньої ціни",
            price=Decimal('100.00'),
            image_url="https://example.com/image3.jpg"
        )

        self.review1 = Review.objects.create(
            dish=self.dish1,
            user_name="Тестовий користувач 1",
            rating=Decimal('4.5'),
            comments="Дуже смачно!"
        )
        self.review2 = Review.objects.create(
            dish=self.dish1,
            user_name="Тестовий користувач 2",
            rating=Decimal('3.5'),
            comments="Нормально."
        )

        self.client = Client()

    def test_menu_view_status_code(self):
        """Тест перевіряє, що сторінка меню повертає статус код 200"""
        response = self.client.get(reverse('menu'))
        self.assertEqual(response.status_code, 200)

    def test_menu_view_template(self):
        """Тест перевіряє, що використовується правильний шаблон"""
        response = self.client.get(reverse('menu'))
        self.assertTemplateUsed(response, 'menu.html')

    def test_menu_view_context(self):
        """Тест перевіряє, що контекст містить правильні дані"""
        response = self.client.get(reverse('menu'))
        self.assertTrue('menu_items' in response.context)
        self.assertTrue('title' in response.context)
        self.assertEqual(response.context['title'], 'Меню')
        self.assertEqual(len(response.context['menu_items']), 3)

    def test_menu_view_sorting(self):
        """Тест перевіряє, що страви відсортовані за ціною (від дешевих до дорогих)"""
        response = self.client.get(reverse('menu'))
        menu_items = response.context['menu_items']

        self.assertEqual(menu_items[0].name, "Бюджетна страва")
        self.assertEqual(menu_items[0].price, Decimal('50.00'))

        self.assertEqual(menu_items[2].name, "Дорога страва")
        self.assertEqual(menu_items[2].price, Decimal('200.00'))

    def test_menu_view_rating(self):
        """Тест перевіряє, що страви містять правильний середній рейтинг"""
        response = self.client.get(reverse('menu'))
        menu_items = response.context['menu_items']

        expensive_dish = next((item for item in menu_items if item.name == "Дорога страва"), None)
        self.assertIsNotNone(expensive_dish)

        self.assertEqual(expensive_dish.avg_rating, Decimal('4.0'))

        # Перевіряємо, що страва має два останні відгуки
        self.assertEqual(len(expensive_dish.recent_reviews), 2)


class NextOrderPageViewTest(TestCase):
    def setUp(self):

        self.dish = Dish.objects.create(
            name="Тестова страва",
            description="Опис тестової страви",
            price=Decimal('100.00'),
            image_url="https://example.com/image.jpg"
        )

        self.client = Client()

    def test_next_order_page_view_get_redirect(self):
        """Тест перевіряє, що GET-запит перенаправляє на сторінку меню"""
        response = self.client.get(reverse('next_order_page'))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('menu'))

    def test_next_order_page_view_post(self):
        """Тест перевіряє, що POST-запит повертає сторінку з формою замовлення"""
        response = self.client.post(reverse('next_order_page'), {'dish_id': self.dish.id})

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'next_order_page.html')
        self.assertTrue('dish' in response.context)
        self.assertEqual(response.context['dish'].id, self.dish.id)
        self.assertEqual(response.context['title'], 'Оформлення замовлення')

    def test_next_order_page_view_post_invalid_dish(self):
        """Тест перевіряє, що POST-запит з неіснуючим dish_id повертає 404"""
        response = self.client.post(reverse('next_order_page'), {'dish_id': 999})
        self.assertEqual(response.status_code, 404)


class OrderCreateViewTest(TestCase):
    def setUp(self):
        self.dish = Dish.objects.create(
            name="Тестова страва",
            description="Опис тестової страви",
            price=Decimal('100.00'),
            image_url="https://example.com/image.jpg"
        )

        self.future_date = timezone.now() + timedelta(days=1)
        self.order_data = {
            'dish_id': self.dish.id,
            'customer_name': 'Тестовий Клієнт',
            'phone_number': '+380501234567',
            'order_item': 'Тестова страва',
            'quantity': 2,
            'delivery_datetime': self.future_date.strftime('%Y-%m-%d %H:%M:%S'),
            'address': 'Тестова адреса, 123',
            'message': 'Тестове повідомлення'
        }

        self.client = Client()

    def test_order_create_view_get_redirect(self):
        """Тест перевіряє, що GET-запит перенаправляє на сторінку меню"""
        response = self.client.get(reverse('order'))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('menu'))

    def test_order_create_view_post_success(self):
        """Тест перевіряє, що POST-запит створює замовлення"""
        response = self.client.post(reverse('order'), self.order_data)

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('index'))

        self.assertEqual(Order.objects.count(), 1)
        order = Order.objects.first()
        self.assertEqual(order.customer_name, 'Тестовий Клієнт')
        self.assertEqual(order.phone_number, '+380501234567')
        self.assertEqual(order.dish.id, self.dish.id)
        self.assertEqual(order.quantity, 2)
        self.assertEqual(order.address, 'Тестова адреса, 123')
        self.assertEqual(order.message, 'Тестове повідомлення')

    def test_order_create_view_post_invalid_dish(self):
        """Тест перевіряє, що POST-запит з неіснуючим dish_id перенаправляє на next_order_page"""
        invalid_data = self.order_data.copy()
        invalid_data['dish_id'] = 999

        response = self.client.post(reverse('order'), invalid_data)

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('next_order_page'))

        self.assertEqual(Order.objects.count(), 0)


class ReviewCreateViewTest(TestCase):
    def setUp(self):

        self.dish = Dish.objects.create(
            name="Тестова страва",
            description="Опис тестової страви",
            price=Decimal('100.00'),
            image_url="https://example.com/image.jpg"
        )

        self.review_data = {
            'dish_id': self.dish.id,
            'user_name': 'Тестовий Користувач',
            'rating': 4.5,
            'comments': 'Тестовий відгук про страву'
        }

        self.client = Client()

    def test_review_create_view_get_redirect(self):
        """Тест перевіряє, що GET-запит перенаправляє на сторінку страв"""
        response = self.client.get(reverse('review'))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('dishes'))

    def test_review_create_view_post_success(self):
        """Тест перевіряє, що POST-запит створює відгук"""
        response = self.client.post(reverse('review'), self.review_data)

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('dishes'))

        self.assertEqual(Review.objects.count(), 1)
        review = Review.objects.first()
        self.assertEqual(review.user_name, 'Тестовий Користувач')
        self.assertEqual(float(review.rating), 4.5)
        self.assertEqual(review.comments, 'Тестовий відгук про страву')
        self.assertEqual(review.dish.id, self.dish.id)

    def test_review_create_view_post_invalid_dish(self):
        """Тест перевіряє, що POST-запит з неіснуючим dish_id перенаправляє на dishes"""
        invalid_data = self.review_data.copy()
        invalid_data['dish_id'] = 999

        response = self.client.post(reverse('review'), invalid_data)

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('dishes'))

        self.assertEqual(Review.objects.count(), 0)