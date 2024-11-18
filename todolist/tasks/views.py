from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from .models import User, Task
from django.contrib import messages
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

def index(request):
    if request.method == 'POST':
        request_dict = request.POST.dict()
        login = request_dict.get('login')
        password = request_dict.get('pswd')

        user = authenticate(username=login, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            request.session['user_id'] = user.id
            request.session['access_token'] = access_token
            request.session['refresh_token'] = refresh_token
            print(f'User ID INDEX: {request.session.get("user_id")}')
            return redirect('home')

        else:
            messages.error(request, 'Usuário ou senha incorretos. Por favor, tente novamente.')
            return redirect('index')

    else:
        return render(request, 'tasks/index.html')


def signup(request):
    if request.method == 'POST':
        request_dict = request.POST.dict()
        login = request_dict.get('login')
        password = request_dict.get('pswd')

        if User.objects.filter(login=login).exists():
            messages.error(request, 'Usuário já existe. Por favor, escolha outro nome de usuário.')
            return redirect('signup')

        user = User(login=login)
        user.set_password(password)
        user.save()
        return redirect('index')

    else:
        return render(request, 'tasks/signup.html')


def home(request):
    print(f'User ID HOME: {request.session.get("user_id")}')
    if request.method == 'GET':
        if 'user_id' in request.session and 'access_token' in request.session:
            print(f'User ID: {request.session["user_id"]}')

            try:
                if JWTAuthentication().get_validated_token(request.session['access_token']):
                    user = User.objects.get(id=request.session['user_id'])
                    tasks = Task.objects.filter(user=user)
                    return render(request, 'tasks/home.html', {'user': user, 'tasks': tasks})
                else:
                    messages.error(request, 'Sua sessão expirou. Por favor, faça login novamente.')
                    return render(request, 'index')

            except (InvalidToken, TokenError):
                messages.error(request, 'Sua sessão expirou. Por favor, faça login novamente.')
                return redirect('index')

        else:
            messages.error(request, 'Faça login para acessar esta página.')
            return redirect('index')

    elif request.method == 'POST':
        request_dict = request.POST.dict()

        if request_dict.get('submit') == 'save':
            title = request_dict.get('title')
            description = request_dict.get('description')
            status = request_dict.get('status')
            creation_date = request_dict.get('creationDate')
            # Edit creation_date to only save the day, month and year (without the time) in a string format
            creation_date = creation_date.split('T')[0]

            update_date = request_dict.get('updateDate')
            user = User.objects.get(id=request.session['user_id'])
            print(f'Tarefa criada com atributos: {title}, {description}, {status}, {creation_date}, {update_date}, {user}')
            task = Task(title=title, description=description, status=status, created_at=creation_date, updated_at=update_date, user=user)
            task.save()
            return redirect('home')

        elif request_dict.get('submit') == 'delete':
            task_id = request_dict.get('id')
            task = Task.objects.get(id=task_id)
            task.delete()
            return redirect('home')

        elif request_dict.get('submit') == 'update-status':
            task_id = request_dict.get('id')
            task = Task.objects.get(id=task_id)
            print(f'Tarefa {task_id} atualizada com status {request_dict.get("status")}')
            task.status = request_dict.get('status')
            task.save()
            return redirect('home')

        elif request_dict.get('submit') == 'logout':
            del request.session['user_id']
            del request.session['access_token']
            del request.session['refresh_token']
            return redirect('index')

    else:
        return render(request, 'tasks/home.html')