from django.db import models

class Dish(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    customer_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    order_item = models.CharField(max_length=200)
    quantity = models.IntegerField()
    delivery_datetime = models.DateTimeField()
    address = models.TextField()
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.customer_name}"

class Review(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Review {self.id} for {self.dish.name}"