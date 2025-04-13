from apps.ventas.models import Venta, VentaDetalle
from apps.usuarios.models import User  # Necesario si interactúas con usuarios aquí
# from apps.productos.models import Producto  # Asumiendo que tienes un modelo Producto

def crear_venta(usuario_id, total, detalles):
    """
    Crea una nueva venta con sus detalles.

    Args:
        usuario_id (int): ID del usuario que realiza la compra.
        total (Decimal): Total de la venta.
        detalles (list of dict): Lista de diccionarios con información de cada item de la venta
                                  (ej. [{'producto_id': 1, 'cantidad': 2, 'precio': 10.50}]).

    Returns:
        Venta: El objeto Venta creado.
    """
    try:
        usuario = User.objects.get(id=usuario_id)
    except User.DoesNotExist:
        raise ValueError(f"No existe el usuario con ID: {usuario_id}")

    venta = Venta.objects.create(usuario=usuario, total=total)

    for detalle_data in detalles:
        VentaDetalle.objects.create(
            venta=venta,
            producto_id=detalle_data['producto_id'],
            cantidad=detalle_data['cantidad'],
            precio=detalle_data['precio']
        )
        # Aquí podrías también actualizar el inventario restando la cantidad vendida
        # try:
        #     producto = Producto.objects.get(id=detalle_data['producto_id'])
        #     producto.stock -= detalle_data['cantidad']
        #     producto.save()
        # except Producto.DoesNotExist:
        #     print(f"Advertencia: Producto con ID {detalle_data['producto_id']} no encontrado para actualizar stock.")

    return venta

def obtener_ventas_por_usuario(usuario_id):
    """
    Obtiene todas las ventas realizadas por un usuario específico.

    Args:
        usuario_id (int): ID del usuario.

    Returns:
        QuerySet de Venta: Todas las ventas del usuario.
    """
    try:
        usuario = User.objects.get(id=usuario_id)
        return Venta.objects.filter(usuario=usuario)
    except User.DoesNotExist:
        return Venta.objects.none() # Devuelve un queryset vacío si el usuario no existe

def actualizar_estado_venta(venta_id, nuevo_estado):
    """
    Actualiza el estado de una venta.

    Args:
        venta_id (int): ID de la venta a actualizar.
        nuevo_estado (str): El nuevo estado de la venta.

    Returns:
        Venta o None: El objeto Venta actualizado o None si no se encuentra.
    """
    try:
        venta = Venta.objects.get(id=venta_id)
        venta.status = nuevo_estado
        venta.save()
        return venta
    except Venta.DoesNotExist:
        return None

# Puedes agregar más funciones aquí según las necesidades de tu lógica de negocio:

def procesar_pago(venta_id, metodo_pago, detalles_pago=None):
    """
    Procesa el pago de una venta.

    Args:
        venta_id (int): ID de la venta.
        metodo_pago (str): Método de pago utilizado (ej. 'efectivo', 'tarjeta', 'online').
        detalles_pago (dict, optional): Detalles adicionales del pago. Defaults to None.

    Returns:
        bool: True si el pago se procesó correctamente, False en caso contrario.
    """
    try:
        venta = Venta.objects.get(id=venta_id)
        venta.status = 'pagado'  # Cambia el estado de la venta a pagado
        # Aquí podrías integrar con un sistema de procesamiento de pagos real
        venta.save()
        return True
    except Venta.DoesNotExist:
        return False

def aplicar_descuento(venta_id, porcentaje_descuento):
    """
    Aplica un descuento a una venta.

    Args:
        venta_id (int): ID de la venta.
        porcentaje_descuento (float): Porcentaje de descuento a aplicar (ej. 0.10 para 10%).

    Returns:
        Venta o None: El objeto Venta actualizado o None si no se encuentra.
    """
    try:
        venta = Venta.objects.get(id=venta_id)
        descuento = venta.total * porcentaje_descuento
        venta.total -= descuento
        venta.save()
        return venta
    except Venta.DoesNotExist:
        return None

def generar_recibo_venta(venta_id):
    """
    Genera un recibo de venta para una venta específica.

    Args:
        venta_id (int): ID de la venta.

    Returns:
        str: El contenido del recibo de venta (podría ser un HTML o un objeto para generar PDF).
    """
    try:
        venta = Venta.objects.get(id=venta_id)
        detalles = VentaDetalle.objects.filter(venta=venta)
        # Lógica para formatear el recibo con la información de la venta y sus detalles
        recibo = f"--- RECIBO DE VENTA #{venta.id} ---\n"
        recibo += f"Fecha: {venta.created_at}\n"
        recibo += f"Cliente: {venta.usuario.username}\n"
        recibo += "--- Detalles ---\n"
        for detalle in detalles:
            # Asumiendo que tienes acceso al nombre del producto basado en producto_id
            recibo += f"Producto ID: {detalle.producto_id}, Cantidad: {detalle.cantidad}, Precio Unitario: {detalle.precio}, Subtotal: {detalle.cantidad * detalle.precio}\n"
        recibo += f"-------------------\n"
        recibo += f"Total: {venta.total}\n"
        return recibo
    except Venta.DoesNotExist:
        return "Venta no encontrada."

# Funciones relacionadas con el reconocimiento de voz podrían ir aquí,
# o en una sección separada si la lógica es compleja, por ejemplo:
# def agregar_producto_por_voz(comando_voz):
#     """
#     Procesa un comando de voz para agregar un producto al carrito (simulado).
#     """
#     # Lógica para convertir voz a texto y luego identificar el producto y la cantidad
#     texto_comando = convertir_voz_a_texto(comando_voz)
#     # Analizar el texto para extraer el nombre o ID del producto y la cantidad
#     producto_nombre = extraer_producto(texto_comando)
#     cantidad = extraer_cantidad(texto_comando)
#     # Buscar el producto en la base de datos y agregarlo a la sesión de venta actual
#     pass

# def calcular_total_por_voz(comando_voz):
#     """
#     Procesa un comando de voz para calcular el total de la venta actual.
#     """
#     # ... lógica ...
#     pass