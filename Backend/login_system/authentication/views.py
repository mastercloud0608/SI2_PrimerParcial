# authentication/views.py
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from .models import Usuario, Role
from .serializers import UsuarioSerializer, LoginSerializer, RegistroSerializer
from .utils import generate_jwt_token

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = generate_jwt_token(user)
            
            return Response({
                'success': True,
                'message': 'Inicio de sesión exitoso',
                'token': token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role.nombre
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistroView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'success': True,
                'message': 'Usuario registrado correctamente',
                'user': UsuarioSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Esta vista requeriría autenticación real con tokens
        # para obtener el usuario actual
        return Response({
            'message': 'Esta vista requiere autenticación'
        })