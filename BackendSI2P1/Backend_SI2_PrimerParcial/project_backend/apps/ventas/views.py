from rest_framework import generics, permissions
from apps.ventas.models import Venta, VentaDetalle
from apps.ventas.serializers import VentaSerializer, VentaDetalleSerializer, VentaConDetalleSerializer

class VentaListCreateView(generics.ListCreateAPIView):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
   # permission_classes = [permissions.IsAuthenticated] # Ejemplo: solo usuarios autenticados pueden acceder

    def perform_create(self, serializer):
        # Asigna el usuario actual a la venta al crearla
        serializer.save(usuario=self.request.user)

class VentaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venta.objects.all()
    serializer_class = VentaConDetalleSerializer # O VentaSerializer si no siempre necesitas los detalles
    #permission_classes = [permissions.IsAuthenticated] # Ejemplo: solo usuarios autenticados pueden acceder

class VentaDetalleListCreateView(generics.ListCreateAPIView):
    queryset = VentaDetalle.objects.all()
    serializer_class = VentaDetalleSerializer
   # permission_classes = [permissions.IsAuthenticated] # Ejemplo: solo usuarios autenticados pueden acceder

class VentaDetalleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = VentaDetalle.objects.all()
    serializer_class = VentaDetalleSerializer
   # permission_classes = [permissions.IsAuthenticated] # Ejemplo: solo usuarios autenticados pueden acceder