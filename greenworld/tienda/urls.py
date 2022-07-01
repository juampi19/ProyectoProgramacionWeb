from xml.etree.ElementInclude import include
from django.urls import path, include
from .views import index, contacto, galeria, formulario, tienda, agregar_producto, listar_productos,modificar_producto, eliminar_producto, registro, ProductoViewset, tienda2
from rest_framework import routers

router = routers.DefaultRouter();
router.register('producto', ProductoViewset)

urlpatterns = [
    path('', index, name='index'),
    path('contacto/', contacto, name='contacto'),
    path('galeria/', galeria, name='galeria'),
    path('formulario/', formulario, name='formulario'),
    path('tienda/', tienda, name='tienda'),
    path('agregar-producto/', agregar_producto, name='agregar_producto'),
    path('listar-productos/', listar_productos, name='listar_productos'),
    path('modificar-producto/<id>/', modificar_producto, name='modificar_producto'),
    path('eliminar-producto/<id>/', eliminar_producto, name="eliminar_producto"),
    path('registro/', registro, name='registro'),
    path( 'api/', include(router.urls) ),
    path( 'tienda2/', tienda2, name='tienda2' )
]