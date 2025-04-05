# authentication/urls.py
from django.urls import path
from .views import LoginView, RegistroView, UsuarioView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('registro/', RegistroView.as_view(), name='registro'),
    path('usuario/', UsuarioView.as_view(), name='usuario'),
]