from django import forms
from .models import Producto
from .models import Contacto
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class ProductoForm(forms.ModelForm):
    #validando el formulario
    prod_nombre = forms.CharField(min_length=3,max_length=50)
    prod_precio = forms.IntegerField( min_value=1, max_value=1000000)
    prod_stock = forms.IntegerField( min_value=1, max_value=100000)
    class Meta:
        model = Producto
        fields = '__all__'

class ContactoForm(forms.ModelForm):
    class Meta:
        model = Contacto
        fields = '__all__'

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username','first_name','last_name', 'email', 'password1', 'password2')   