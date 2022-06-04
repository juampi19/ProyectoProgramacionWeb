from django.shortcuts import render, redirect, get_object_or_404
from .models import Producto
from .forms import ProductoForm, ContactoForm
# importar los mensajes
from django.contrib import messages

# Create your views here.

def index(request):
    return render(request, 'tienda/index.html')

def tienda(request):
    productos = Producto.objects.all()
    return render(request, 'tienda/tienda.html', {'productos': productos})

def contacto(request):
    data = {
        'form2': ContactoForm()
    }
    if request.method == 'POST':
        form = ContactoForm(data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Mensaje enviado correctamente')
            return redirect('/')
        else:
            data['form2'] = form
    return render(request, 'tienda/contacto.html', data)
    

def galeria(request):
    return render(request, 'tienda/galeria.html')

def formulario(request):
    return render(request, 'tienda/formulario.html') 

def agregar_producto(request):
    """
    If the request is a POST request, then validate the form and save it if it's valid, otherwise return
    the form with the errors
    
    :param request: The request object is an HttpRequest object. It contains metadata about the request,
    including the HTTP method, host, path, and more
    :return: The data dictionary is being returned.
    """

    data = {
        'form': ProductoForm()
    }

    if request.method == 'POST':
        formulario = ProductoForm(data=request.POST, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            messages.success(request, 'Producto agregado correctamente')
        else:
            data["form"] = formulario

    return render(request, 'tienda/producto/agregar.html', data)

def listar_productos(request):
    """
    It takes a request, gets all the products, and returns a rendered template with the products
    
    :param request: The request object is an HttpRequest object. It contains metadata about the request,
    such as the HTTP method, host, path, and more
    :return: A list of all the products in the database.
    """
    productos = Producto.objects.all()
    data = {
        'productos': productos
    }
    return render(request, 'tienda/producto/listar.html', data)

def modificar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    data = {
        'form': ProductoForm(instance=producto)
    }
    if request.method == 'POST':
        formulario = ProductoForm(data=request.POST, instance=producto, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            messages.success(request, 'Producto modificado correctamente')
            return redirect(to="listar_productos")
        data["form"]  = formulario
    return render(request, 'tienda/producto/modificar.html', data)

def eliminar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    producto.delete()
    messages.success(request, 'Producto eliminado correctamente')
    return redirect(to="listar_productos")

# Probando contacto
