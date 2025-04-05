# authentication/serializers.py
from rest_framework import serializers
from .models import Usuario, Role
from django.contrib.auth.hashers import make_password, check_password

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'nombre', 'descripcion']
        read_only_fields = ['id']

class UsuarioSerializer(serializers.ModelSerializer):
    role_nombre = serializers.ReadOnlyField(source='role.nombre')

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'role', 'role_nombre', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50, required=True)
    password = serializers.CharField(max_length=255, required=True, write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        try:
            user = Usuario.objects.get(username=username)
            # Nota: Deberías implementar un sistema de hash para contraseñas
            # Aquí estamos comparando contraseñas en texto plano (no recomendado)
            if user.password != password:
                raise serializers.ValidationError("Contraseña incorrecta")
            
            data['user'] = user
            return data
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Usuario no encontrado")

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'password_confirm', 'role']
        
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        # En un sistema real, deberías hashear la contraseña
        # validated_data['password'] = make_password(validated_data['password'])
        return Usuario.objects.create(**validated_data)