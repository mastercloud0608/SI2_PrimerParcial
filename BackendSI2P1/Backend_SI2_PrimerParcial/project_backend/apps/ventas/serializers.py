from rest_framework import serializers
from apps.ventas.models import Venta, VentaDetalle
from apps.usuarios.serializers import UserSerializer  # Si quieres mostrar la info del usuario

class VentaSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)  # Para mostrar la información del usuario
    class Meta:
        model = Venta
        fields = ['id', 'usuario', 'total', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class VentaDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaDetalle
        fields = ['id', 'venta', 'producto_id', 'cantidad', 'precio', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class VentaConDetalleSerializer(serializers.ModelSerializer):
    detalles = VentaDetalleSerializer(many=True, read_only=True, source='ventadetalle_set')
    usuario = UserSerializer(read_only=True)
    class Meta:
        model = Venta
        fields = ['id', 'usuario', 'total', 'status', 'created_at', 'updated_at', 'detalles']
        read_only_fields = ['id', 'created_at', 'updated_at']