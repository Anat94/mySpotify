import datetime
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from Backend.models import Users
import json

@csrf_exempt
def index(request):
    return JsonResponse({"status": "ok"}, status=200)

def checkIfUserExists(email, password):
    if not email or not password:
        return False
    usr = Users.objects.filter(email=email)
    if not usr:
        return False
    usr = usr.first()
    if check_password(password, usr.password) == True:
        return True
    return False

@csrf_exempt
def signin(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return JsonResponse({"status": "Invalid request"}, status=400)
        if checkIfUserExists(email, password):
            return JsonResponse({"status": "ok"}, status=200)
        else:
            return JsonResponse({"status": "Invalid credentials"}, status=401)
    else:
        return JsonResponse({"status": "Invalid method"}, status=405)

def checkIfEmailIsRegitered(email):
    if not email:
        return False
    usr = Users.objects.filter(email=email)
    if not usr:
        return False
    return True

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if not data:
            return JsonResponse({"status": "Invalid request"}, status=400)
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        birth_date = data.get('birth_date')
        gender = data.get('gender')
        if not email or not password or not name or not birth_date or not gender:
            return JsonResponse({"status": "Invalid request"}, status=400)
        birth_date = datetime.datetime.strptime(birth_date, "%d/%m/%Y").strftime("%Y-%m-%d")
        if checkIfUserExists(email, password):
            return JsonResponse({"status": "User already exists"}, status=409)
        elif checkIfEmailIsRegitered(email):
            return JsonResponse({"status": "Email already registered"}, status=409)
        else:
            password = make_password(password)
            usr = Users(email=email, password=password, name=name, birth_date=birth_date, gender=gender)
            usr.save()
        return JsonResponse({"status": "ok"}, status=201)
    else:
        return JsonResponse({"status": "Invalid method"}, status=405)
