from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product, ProductSize

User = get_user_model()

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Ожидание'),
        ('preparing', 'Готовится'),
        ('delivering', 'Доставляется'),
        ('delivered', 'Доставлено'),
        ('cancelled', 'Отменен'),
    ]

    PAYMENT_CHOICES = [
        ('cash', 'Наличными'),
        ('card_online', 'Картой онлайн'),
        ('card_on_delivery', 'Картой при получении'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    apartment = models.CharField(max_length=50, blank=True, null=True)
    entrance = models.CharField(max_length=50, blank=True, null=True)
    floor = models.CharField(max_length=50, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_CHOICES)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Order {self.id} - User: {self.user}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"OrderItem {self.id} - Product: {self.product.name}, Size: {self.size.size}"