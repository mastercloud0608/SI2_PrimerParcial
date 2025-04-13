from django.urls import path
from apps.ventas.views import (
    VentaListCreateView,
    VentaRetrieveUpdateDestroyView,
    VentaDetalleListCreateView,
    VentaDetalleRetrieveUpdateDestroyView
)

urlpatterns = [
    path('', VentaListCreateView.as_view(), name='venta-list-create'),
    path('ventas/<int:pk>/', VentaRetrieveUpdateDestroyView.as_view(), name='venta-retrieve-update-destroy'),
    path('detalles/', VentaDetalleListCreateView.as_view(), name='ventadetalle-list-create'),
    path('detalles/<int:pk>/', VentaDetalleRetrieveUpdateDestroyView.as_view(), name='ventadetalle-retrieve-update-destroy'),
]