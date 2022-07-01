from django.shortcuts import render, redirect, get_object_or_404
from .models import Producto
from .forms import ProductoForm, ContactoForm, CustomUserCreationForm
# importar los mensajes
from django.contrib import messages
from django.core.paginator import Paginator
from django.http import Http404
## Autenticacion de usuarios
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required, permission_required
from rest_framework import viewsets
from .serializers import ProductoSerializer

#Views para la api
class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

#tienda api
def tienda2( request ):
    return render( request, 'tienda/tienda2.html' )

def index(request):
    return render(request, 'tienda/index.html')

def tienda(request):
    productos = Producto.objects.all()
    return render(request, 'tienda/tienda.html', {'productos': productos})

def contacto(request):
    data = {
        'form': ContactoForm()
    }
    if request.method == 'POST':
        form = ContactoForm(data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Mensaje enviado correctamente')
        else:
            data['form'] = form
    return render(request, 'tienda/contacto.html', data)
    

def galeria(request):
    return render(request, 'tienda/galeria.html')

def formulario(request):
    return render(request, 'tienda/formulario.html') 

@permission_required('tienda.add_producto')
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

@permission_required('tienda.view_producto')
def listar_productos(request):
    """
    It takes a request, gets all the products, and returns a rendered template with the products
    
    :param request: The request object is an HttpRequest object. It contains metadata about the request,
    such as the HTTP method, host, path, and more
    :return: A list of all the products in the database.
    """
    productos = Producto.objects.all()
    page = request.GET.get('page', 1)

    try:
        paginator = Paginator(productos, 4)
        productos = paginator.page(page)
    except:
        raise Http404("No existe la página")


    data = {
        'entity': productos,
        'paginator': paginator,
    }
    return render(request, 'tienda/producto/listar.html', data)

@permission_required('tienda.change_producto')
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

@permission_required('tienda.delete_producto')
def eliminar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    producto.delete()
    messages.success(request, 'Producto eliminado correctamente')
    return redirect(to="listar_productos")

# crear el view para registrar un usuario
def registro(request):
    data = {
        'form': CustomUserCreationForm()
    }
    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            ## Autenticacion de usuarios
            username = formulario.cleaned_data['username']
            password = formulario.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, 'Usuario creado correctamente')
            return redirect(to="index")
        else:
            data['form'] = formulario

    return render(request, 'registration/registro.html', data)
