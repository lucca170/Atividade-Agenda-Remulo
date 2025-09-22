# lucca170/atividade-3bim/Atividade-3BIM-49a7878e6d748c261a8fef8453068b3554c1aee9/Agenda 3BIM/backend/agenda/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Task

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class TaskSerializer(serializers.ModelSerializer):
    # O campo user será preenchido automaticamente com o usuário da requisição
    # e não será visível para o cliente.
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'due_date', 'status',
            'start_date', 'created_at', 'updated_at', 'user'
        ]
        read_only_fields = ['created_at', 'updated_at']