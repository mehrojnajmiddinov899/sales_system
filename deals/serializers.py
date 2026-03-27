from rest_framework import serializers
from .models import Client, Deal, Task

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class DealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deal
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


