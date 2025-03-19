from django.db import models


# Создайте ваши модели здесь.
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class ProductSize(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='sizes')
    size = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=6, decimal_places=0)
    grammas = models.PositiveIntegerField(blank=False)

    def __str__(self):
        return f"{self.size} - {self.price}"

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    base_price = models.DecimalField(max_digits=6, decimal_places=0)
    image = models.ImageField(upload_to='product_images/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    base_ingredients = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Promotion(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='promotions/', null=True, blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
class Banner(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to='banners/')
    created_at = models.DateTimeField(auto_now_add=True)
    promotion = models.ForeignKey(Promotion, on_delete=models.SET_NULL, null=True, blank=True, related_name='banners')

    def __str__(self):
        return self.title or f'Banner {self.id}'