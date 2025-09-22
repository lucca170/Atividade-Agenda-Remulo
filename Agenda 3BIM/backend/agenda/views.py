# lucca170/atividade-3bim/Atividade-3BIM-1c0f99b5d51b8cb26a84a28294d7ef26d786516d/Agenda 3BIM/backend/agenda/views.py
from .serializers import TaskSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Task
from django.db.models import Count
from rest_framework.decorators import action
from rest_framework.response import Response

User = get_user_model()

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Esta view retorna a lista de tarefas
        apenas para o usuário autenticado.
        """
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Garante que o usuário autenticado seja associado automaticamente
        ao criar uma tarefa.
        """
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """
        Garante que o usuário não seja alterado na edição da tarefa.
        """
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def status_count(self, request):
        """
        Retorna a contagem de tarefas por status.
        """
        status_counts = self.get_queryset().values('status').annotate(count=Count('status'))
        return Response(status_counts)

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]