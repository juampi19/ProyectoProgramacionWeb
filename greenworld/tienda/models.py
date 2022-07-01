from django.db import models

# Create your models here.
class Cliente(models.Model): 
    cli_nombre = models.CharField(max_length=30)
    cli_pat_apellido = models.CharField(max_length=40)
    cli_mat_apellido = models.CharField(max_length=40)
    cli_email = models.CharField(max_length=100)

    def __str__(self):
        return self.cli_nombre

class Producto(models.Model):
    prod_nombre = models.CharField(max_length=50)
    prod_precio = models.IntegerField()
    prod_descripcion = models.TextField()
    prod_stock = models.IntegerField()
    prod_img = models.ImageField(upload_to='productos/', null=True, blank=True)
    #prod_fecha = models.DateField()

    def __str__(self):
        return self.prod_nombre

class Venta(models.Model):
    fecha_venta = models.DateField()
    total_venta = models.IntegerField()
    id_cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT)

    def __str__(self):
        return str(self.pk)

class DetalleVenta(models.Model):
    id_producto = models.ForeignKey(Producto, on_delete=models.PROTECT)
    id_venta = models.ForeignKey(Venta, on_delete=models.PROTECT)
    cantidad = models.IntegerField()
    subtotal = models.IntegerField()

    def __str__(self):
        return str(self.pk)


##Prueba para contacto
class Contacto(models.Model):
    nombre = models.CharField(max_length=50)
    email = models.EmailField()
    telefono = models.CharField(max_length=10)
    mensaje = models.TextField()

    def __str__(self):
        return self.nombre