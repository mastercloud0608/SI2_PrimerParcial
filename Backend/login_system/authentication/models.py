# authentication/models.py
from django.db import models

class Role(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(null=True, blank=True)

    class Meta:
        managed = False  # Indica a Django que no administre este modelo
        db_table = 'roles'  # Nombre exacto de la tabla en PostgreSQL

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=100, unique=True, null=True, blank=True)
    role = models.ForeignKey(Role, models.DO_NOTHING, db_column='role_id')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False  # Indica a Django que no administre este modelo
        db_table = 'usuarios'  # Nombre exacto de la tabla en PostgreSQL

    def __str__(self):
        return self.username