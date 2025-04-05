# authentication/utils.py
import jwt
import datetime

def generate_jwt_token(user):
    """
    Genera un token JWT para el usuario
    """
    payload = {
        'user_id': user.id,
        'username': user.username,
        'role': user.role.nombre,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # 1 día de expiración
    }
    
    # En un sistema real, deberías usar una clave secreta segura
    token = jwt.encode(payload, 'tu_clave_secreta', algorithm='HS256')
    return token