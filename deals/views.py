from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Client, Deal, Task
from .serializers import ClientSerializer, DealSerializer, TaskSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class DealViewSet(viewsets.ModelViewSet):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer
    permission_classes = [IsAuthenticated]

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

from django.shortcuts import render
from .models import Client, Deal, Task

def home(request):
    return render(request, 'index.html', {
        'clients_count': Client.objects.count(),
        'deals_count': Deal.objects.count(),
        'tasks_count': Task.objects.count(),
    })




