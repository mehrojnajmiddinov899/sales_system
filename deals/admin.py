from django.contrib import admin
from .models import Client, Deal, Task

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'inn', 'industry', 'source', 'is_active']
    search_fields = ['company_name', 'inn']

@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ['title', 'client', 'amount', 'stage', 'manager']
    list_filter = ['stage']

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'deal', 'priority', 'status', 'due_date']
    list_filter = ['priority', 'status']


