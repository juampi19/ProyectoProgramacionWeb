from django.urls import path
from .views import index, contacto, galeria, formulario, tienda

urlpatterns = [
    path('', index, name='index'),
    path('contacto/', contacto, name='contacto'),
    path('galeria/', galeria, name='galeria'),
    path('formulario/', formulario, name='formulario'),
    path('tienda/', tienda, name='tienda'),
]