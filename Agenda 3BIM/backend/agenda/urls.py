# lucca170/atividade-3bim/Atividade-3BIM-1c0f99b5d51b8cb26a84a28294d7ef26d786516d/Agenda 3BIM/backend/agenda/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserCreate
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('users/', UserCreate.as_view(), name='user_create'),
    path('token/', obtain_auth_token, name='api_token_auth'),
    
]