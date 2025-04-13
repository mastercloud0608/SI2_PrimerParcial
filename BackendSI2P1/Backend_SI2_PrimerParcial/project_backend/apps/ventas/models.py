from django.db import models
from django.utils import timezone
from apps.usuarios.models import User  # Importa el modelo User

class Venta(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='pendiente')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ventas'

    def __str__(self):
        return f"Venta #{self.id} - Usuario: {self.usuario.username}"

class VentaDetalle(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto_id = models.IntegerField()  # Asumiendo que 'productos' tiene un id INTEGER
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'venta_detalle'

    def __str__(self):
        return f"Detalle #{self.id} - Venta: {self.venta.id}, Producto: {self.producto_id}"