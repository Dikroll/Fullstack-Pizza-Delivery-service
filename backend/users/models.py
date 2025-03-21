from django.contrib.auth.models import AbstractUser
from django.db import models

class DimokUser(AbstractUser):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    phone = models.CharField(max_length=15, unique=True, blank=False, null=False, verbose_name="Телефон")
    bonus = models.PositiveIntegerField(default=300, verbose_name="Дымкоины")
    first_name = models.CharField(max_length=30, null=False, blank=False, verbose_name="Имя")
    birthday = models.DateField(null=True, blank=True, verbose_name="День рождения")
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, null=True, blank=True, verbose_name="Пол")
    address = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.phone
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name="Клиенты"
        verbose_name_plural = "Клиенты"
    
class EmailLog(models.Model):
    subject = models.CharField(max_length=255, verbose_name="Тема")
    message = models.TextField(verbose_name="Текст")
    recipient = models.EmailField(verbose_name="Получатель")
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject