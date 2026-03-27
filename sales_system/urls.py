from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from deals.views import ClientViewSet, DealViewSet, TaskViewSet, home

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'deals', DealViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]


