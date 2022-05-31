from django.shortcuts import render
from .models import Producto

# Create your views here.

def index(request):
    return render(request, 'tienda/index.html')

def tienda(request):
    productos = Producto.objects.all()
    return render(request, 'tienda/tienda.html', {'productos': productos})
    

def contacto(request):
    return render(request, 'tienda/contacto.html')

def galeria(request):
    return render(request, 'tienda/galeria.html')

def formulario(request):
    return render(request, 'tienda/formulario.html')        