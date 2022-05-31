from django.contrib import admin
from .models import Cliente, Producto, Venta, DetalleVenta
# Register your models here.

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('prod_nombre', 'prod_precio', 'prod_descripcion','prod_stock', 'prod_img')
    list_editable = ('prod_precio','prod_stock', 'prod_img')
    search_fields = ['prod_nombre']
    list_per_page: int = 5

admin.site.register(Cliente)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Venta)
admin.site.register(DetalleVenta)