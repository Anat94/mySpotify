from django.urls import include, path

urlpatterns = [
    path(
        '/',
        include("backendNew.urls.connexion"),
        name='connexion'
    ),
]