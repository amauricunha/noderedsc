# Node-RED Docker Project

Este projeto utiliza o Node-RED em um ambiente Docker, com persistência de dados e gerenciamento simplificado de credenciais e configurações diretamente do host. O objetivo é fornecer uma base para a criação de fluxos e automação, integrando autenticação e manipulação de credenciais de forma segura.

## Estrutura do Projeto

    /node-red-project
    │
    ├── /data                 # Diretório de dados persistentes do Node-RED (fluxos e contextos)
    │   └── flows.json        # Arquivo gerado pelo Node-RED contendo os fluxos
    │
    ├── /credenciais          # Diretório contendo as credenciais de autenticação
    │   └── credentials.json  # Arquivo de credenciais em texto simples (as senhas são hashadas automaticamente)
    │
    ├── settings.js           # Arquivo de configurações do Node-RED
    │
    └── docker-compose.yml    # Arquivo de configuração do Docker Compose para subir o ambiente

## Pré-requisitos
Antes de iniciar, certifique-se de ter os seguintes softwares instalados:
- Docker
- Docker Compose

## Configuração
### 1. Configurar o arquivo `credentials.json`
Edite o arquivo credentials.json no diretório /credenciais/ para definir os usuários e senhas que terão acesso ao Node-RED. As senhas podem ser armazenadas em texto simples, e serão hashadas automaticamente ao iniciar o Node-RED.

Exemplo de `credentials.json`:

    Copy code
    {
    "users": [
        {
        "username": "admin",
        "password": "adminpassword",  // Senha em texto simples
        "permissions": "*"
        },
        {
        "username": "user1",
        "password": "user1password",  // Senha em texto simples
        "permissions": "read"
        }
    ]
    }

### 2. Configurar o arquivo settings.js
O arquivo `settings.js` controla as configurações do Node-RED, como autenticação, porta, logs e outros parâmetros. Ele é carregado diretamente do host, permitindo fácil modificação.

### 3. Subir o ambiente Docker
Para iniciar o ambiente Docker, use o Docker Compose:

    Copy code
    docker-compose up -d
Isso irá:

- Iniciar o Node-RED na porta `1880`.
- Carregar as credenciais de login e o arquivo `settings.js` do host.
- Persistir os fluxos e dados no diretório `/data`.

## Personalização
### Alterar a Porta
Se quiser alterar a porta padrão (1880), edite o arquivo`docker-compose.yml`:

yaml
Copy code
ports:
  - "1880:1880"
Substitua o valor antes dos dois pontos (`:`) pela porta desejada.

### Autenticação
As credenciais são gerenciadas pelo arquivo `credentials.json`. Ao modificar esse arquivo no host, as mudanças serão refletidas automaticamente após reiniciar o Node-RED. Para adicionar novos usuários, edite o arquivo e insira novos objetos no array `users`.

Exemplo:

json

    {
    "users": [
        {
        "username": "newuser",
        "password": "newpassword",
        "permissions": "read"
        }
    ]
    }

### Persistência de Dados
Os fluxos e dados são armazenados no diretório /data. Isso garante que suas configurações e fluxos sejam preservados mesmo se o contêiner for reiniciado ou removido.

## Variáveis de Ambiente
Você pode configurar variáveis de ambiente no arquivo docker-compose.yml para customizar ainda mais o comportamento do Node-RED.

Exemplo:

yaml
    environment:
    - TZ=America/Sao_Paulo  # Definir o fuso horário
    - NODE_RED_USERNAME=admin  # Definir o nome de usuário padrão

## Parar o Ambiente
Para parar os contêineres, use o seguinte comando:

    docker-compose down
Isso irá desligar todos os serviços, mas os dados e fluxos continuarão salvos no host.

## Recursos
- Documentação do Node-RED
- Documentação do Docker
- Docker Hub - Node-RED
## Licença
    Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

