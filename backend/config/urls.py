"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import logout
from django.urls import path, include
from allauth.account.views import confirm_email, password_reset
from .api import api

urlpatterns = [
    path('admin/', admin.site.urls, name = 'admin'),
    path('api/', include(api.urls), name = 'api'),
    path('auth/', include('rest_auth.urls'), name = 'auth'),
    path('registration/', include('rest_auth.registration.urls'), name = 'registration'),

    # Necessary to make allauth send confirmation and reset emails correctly. Not externally routable.
    path('accounts/', include('allauth.urls')),

    # HACK: Makes allauth generate the confirmation and reset links correctly.
    path('register/<key>', confirm_email, name = "account_confirm_email"),
    path('password_reset/<uidb64>/<token>', password_reset, name = "password_reset_confirm"),
]
