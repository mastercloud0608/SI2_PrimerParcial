from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para los productos.
    """
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

    # Ejemplo de una acción personalizada para reducir stock.
    @action(detail=True, methods=['post'])
    def reduce_stock(self, request, pk=None):
        product = self.get_object()
        reduce_amount = int(request.data.get('amount', 0))
        if product.stock >= reduce_amount:
            product.stock -= reduce_amount
            product.save()
            return Response({
                "detail": f"Stock reducido en {reduce_amount}. Stock actual: {product.stock}"
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "detail": "No hay suficiente stock."
            }, status=status.HTTP_400_BAD_REQUEST)
