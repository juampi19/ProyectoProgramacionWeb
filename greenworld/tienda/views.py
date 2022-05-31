from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'tienda/index.html')

def tienda(request):
    return render(request, 'tienda/tienda.html')

def contacto(request):
    return render(request, 'tienda/contacto.html')

def galeria(request):
    return render(request, 'tienda/galeria.html')

def formulario(request):
    return render(request, 'tienda/formulario.html')        