from django.urls import path
from .views import index, contacto, formulario, galeria, tienda

urlpatterns = [
    path('', index, name="index"),
    path('contacto.html', contacto, name="contacto"),
    path('formulario.html', formulario, name="formulario"),
    path('galeria.html', galeria, name="galeria"),
    path('tienda.html', tienda, name="tienda"),
    path('index.html', index, name="index")
]