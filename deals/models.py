from django.db import models
from django.contrib.auth.models import User
 
 
# -------------------------------------------------------
# Модель клиента
# -------------------------------------------------------
class Client(models.Model):
   SOURCE_CHOICES = [
       ('site',       'Сайт'),
       ('call',       'Холодный звонок'),
       ('referral',   'Рекомендация'),
       ('exhibition', 'Выставка'),
   ]
   company_name = models.CharField(max_length=255, verbose_name='Название компании')
   inn          = models.CharField(max_length=12, unique=True, verbose_name='ИНН')
   industry     = models.CharField(max_length=100, blank=True, verbose_name='Отрасль')
   source       = models.CharField(max_length=20, choices=SOURCE_CHOICES,
                      verbose_name='Источник')
   is_active    = models.BooleanField(default=True, verbose_name='Активен')
   created_at   = models.DateTimeField(auto_now_add=True)
   updated_at   = models.DateTimeField(auto_now=True)
 
   class Meta:
       verbose_name        = 'Клиент'
       verbose_name_plural = 'Клиенты'
       ordering            = ['-created_at']
 
   def __str__(self):
       return self.company_name
 
 
# -------------------------------------------------------
# Модель сделки
# -------------------------------------------------------
class Deal(models.Model):
   STAGE_CHOICES = [
       ('new',         'Новая'),
       ('contact',     'Первичный контакт'),
       ('needs',       'Выявление потребностей'),
       ('proposal',    'Коммерческое предложение'),
       ('negotiation', 'Переговоры'),
       ('closed_won',  'Успешно закрыта'),
       ('closed_lost', 'Закрыта без продажи'),
   ]
   title      = models.CharField(max_length=200, verbose_name='Название сделки')
   client     = models.ForeignKey(Client, on_delete=models.PROTECT,
                    related_name='deals', verbose_name='Клиент')
   amount     = models.DecimalField(max_digits=12, decimal_places=2,
                    default=0, verbose_name='Сумма сделки')
   stage      = models.CharField(max_length=20, choices=STAGE_CHOICES,
                    default='new', verbose_name='Стадия')
   manager    = models.ForeignKey(User, on_delete=models.SET_NULL,
                    null=True, related_name='deals', verbose_name='Менеджер')
   close_date = models.DateField(null=True, blank=True,
                    verbose_name='Планируемая дата закрытия')
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
 
   class Meta:
       verbose_name        = 'Сделка'
       verbose_name_plural = 'Сделки'
       ordering            = ['-created_at']
 
   def __str__(self):
       return f'{self.title} — {self.client}'
 
 
# -------------------------------------------------------
# Модель задачи
# -------------------------------------------------------
class Task(models.Model):
   PRIORITY_CHOICES = [
       ('low',    'Низкий'),
       ('medium', 'Средний'),
       ('high',   'Высокий'),
   ]
   STATUS_CHOICES = [
       ('open',        'Открыта'),
       ('in_progress', 'В работе'),
       ('done',        'Выполнена'),
       ('cancelled',   'Отменена'),
   ]
   deal        = models.ForeignKey(Deal, on_delete=models.CASCADE,
                     related_name='tasks', verbose_name='Сделка')
   title       = models.CharField(max_length=200, verbose_name='Название задачи')
   description = models.TextField(blank=True, verbose_name='Описание')
   due_date    = models.DateTimeField(verbose_name='Срок исполнения')
   priority    = models.CharField(max_length=10, choices=PRIORITY_CHOICES,
                     default='medium', verbose_name='Приоритет')
   status      = models.CharField(max_length=15, choices=STATUS_CHOICES,
                     default='open', verbose_name='Статус')
   assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL,
                     null=True, verbose_name='Ответственный')
   created_at  = models.DateTimeField(auto_now_add=True)
   

   class Meta:
       verbose_name        = 'Задача'
       verbose_name_plural = 'Задачи'
       ordering            = ['-created_at']

   def __str__(self):
       return self.title

