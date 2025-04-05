# authentication/middleware.py
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
import jwt
import datetime
from .models import Usuario

class JWTAuthenticationMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        super().__init__(get_response)
        self.get_response = get_response
        self.exempt_urls = ['/api/auth/login/', '/api/auth/registro/']

    def process_view(self, request, view_func, view_args, view_kwargs):
        # No verificar token para rutas exentas
        if request.path in self.exempt_urls:
            return None
            
        token = request.META.get('HTTP_AUTHORIZATION')
        if not token:
            return JsonResponse({'error': 'Token no proporcionado'}, status=401)
        
        try:
            # En un sistema real, necesitarías una clave secreta segura
            payload = jwt.decode(token, 'tu_clave_secreta', algorithms=['HS256'])
            user_id = payload['user_id']
            user = Usuario.objects.get(id=user_id)
            request.user = user
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, Usuario.DoesNotExist):
            return JsonResponse({'error': 'Token inválido o expirado'}, status=401)
        
        return None