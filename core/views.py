from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'core/index.html')

def contacto(request):
    return  render(request, 'core/contacto.html')

def formulario(request):
    return render(request, 'core/formulario.html')

def galeria(request):
    return render(request, 'core/galeria.html')

def tienda(request):
    return render(request, 'core/tienda.html')
