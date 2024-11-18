# mayo-todo-list

Link para video de apresentação do aplicativo: https://youtu.be/cb1XLjOnLsc

Requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Python (versão 3.10 ou superior)
- pip 
- virtualenv 

---

Passo a passo para instalação

### 1. Clone o repositório

#### prompt de comando
~~~
git clone https://github.com/thomaschabro/mayo-todo-list.git

cd mayo-todo-list
~~~~
### 2. Configure o ambiente virtual

Crie e ative um ambiente virtual para isolar as dependências do projeto:

**Crie o ambiente virtual**  
~~~
python -m venv venv  
~~~

# Ative o ambiente virtual  
venv\Scripts\activate.bat

### 3. Instale os pacotes necessários

~~~
pip install -r requirements.txt
~~~

### 4. Para rodar

~~~
cd todolist
python manage.py migrate
python manage.py runserver
~~~

Em seguida, apenas acessar o link disponibilazdo no terminal.

---

# Rotas / endpoints

### Rotas

Neste aplicativo, temos apenas 3 páginas:

- Login

- Cadastro

- Home

A principal (index) é a página de login, na qual o usuário pode logar ou se cadastrar. Caso opte por cadastro, será direcionado ao cadastro. Assim que realizar o processo, é redirecionado à página principal, onde fará o login de fato.

Ao se logar, o usuário é direcionado à home, onde visualizará suas tarefas e poderá editá-las. Ainda, pode opta por dar "log out". Com isso, sua sessão será finalizada e o usuário volta para a página de login.

### Endpoints

Temos alguns endpoints no projeto. Cada um será tratado abaixo:

#### 1 Login

Ao realiza o login, o usuário dá um post na base de dados com seu login e senha. Neste momento, será verificado na base de dados a autenticação do usuário e, em seguida é feita uma requisição para obter o JWT de login (30 minutos de tempo de sessão). No caso de tudo retornar positivo, o usuário é direcionado à página de home.

#### Cadastro

Caso o usuário não tenha uma conta, ele deve se cadastrar. Nessa página, ele irá criar um login e uma senha, com verificação dupla e requisitos para validar a senha. Uma vez que todos os dados inseridos estejam conforme os parâmetros, é feito um POST request na base, onde serão guardados o login e a senha. Em caso de sucesso, o usuário é retonado à pagina inicial para se logar.

#### Home

Nesta página, o usuário terá contato direto com suas tarefas. Ao abrir a página, são passadas como parâmetro as tarefas correspondentes, que são dispostas na tela diretamente em cards. À direita do "header", há a opção de "Criar tarefa". Neste caso, é aberto um pop-up onde o cliente deverá obrigatoriamente inserir as informações necessárias sobre a tarefa. Após verificadas, é feito um POST request para a base de dados, armazenando a tarefa (já relacionada ao usuário em questão). 

Ainda, em cada card de tarefa, existem outros dois endpoints: os botões de "Atualizar" e de "Deletar". O primeiro fica ao lado do dropdown menu do Status da tarefa. Ele mostrará o valor armazenado, porém o usuário pode alterar diretamente e, clicando em "Atualizar", o status será reescrito na base de dados.

No caso de "Deletar", a tarefa correspondente será apagada da base de dados. 

--- 

# Tecnologias Utilizadas

Para o framework foi utilizado o Django, em Python. A escolha foi feita pensando na simplicidade e eficácia da plataforma, e pela intimidade com Python e a própria plataforma. Já a base de dados, foi escolhida também pela necessidade, dado que não seria o caso de múltiplos acessos simultâneos nem armazenamento de muitos dados. 

Já sobre features implementadas, temos: JWT, Redis Cache, CSRF Token Verification, Form method for endpoints (secured by Django).





