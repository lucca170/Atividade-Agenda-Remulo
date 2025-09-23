# lucca170/atividade-3bim/Atividade-3BIM-1c0f99b5d51b8cb26a84a28294d7ef26d786516d/Agenda 3BIM/backend/agenda/admin.py
from django.contrib import admin
from .models import User, Task # <--- CORREÇÃO AQUI

# Register your models here.
admin.site.register(User)
admin.site.register(Task)