from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # O explícitamente: fields = ['id', 'name', 'description', 'price', 'stock', 'created_at', 'updated_at']
