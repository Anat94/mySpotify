from django.http import HttpResponse, JsonResponse

def index(request):
    return JsonResponse({"status": "ok"}, status=200)

def signin(request):
    if request.method == "POST":
        return JsonResponse({"status": "ok method"}, status=200)
    else:
        return JsonResponse({"status": "Invalid method"}, status=405)

def signup(request):
    if request.method == "POST":
        return JsonResponse({"status": "ok method"}, status=200)
    else:
        return JsonResponse({"status": "Invalid method"}, status=405)