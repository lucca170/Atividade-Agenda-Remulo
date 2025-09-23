# lucca170/atividade-3bim/Atividade-3BIM-1c0f99b5d51b8cb26a84a28294d7ef26d786516d/Agenda 3BIM/backend/core/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('agenda.urls')),
]