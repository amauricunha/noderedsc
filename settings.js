const fs = require('fs');
const bcrypt = require('bcryptjs'); // Biblioteca para fazer o hash das senhas
const path = '/credenciais/credentials.json'; // Caminho do arquivo de credenciais no contêiner

let users = [];

// Função para verificar se a senha já está em hash ou precisa ser convertida
function hashPassword(password) {
    if (!password.startsWith('$2b$')) {  // Verifica se a senha já está em hash
        return bcrypt.hashSync(password, 8);  // Converte a senha em hash com o fator de custo 8
    }
    return password;  // Retorna o hash se a senha já estiver em hash
}

// Verificar se o arquivo existe e carregar os usuários
if (fs.existsSync(path)) {
    const credentialsData = fs.readFileSync(path, 'utf-8');
    const jsonData = JSON.parse(credentialsData);
    
    users = jsonData.users.map(user => ({
        username: user.username,
        password: hashPassword(user.password),  // Converte a senha para hash se necessário
        permissions: user.permissions
    }));
}

module.exports = {
    // Configuração de autenticação admin utilizando credenciais carregadas do arquivo JSON
    adminAuth: {
        type: "credentials",
        users: users
    },
    
    // Captura de tentativas de login para registro no flow do Node-RED
    httpAdminMiddleware: (req, res, next) => {
        if (req.url === '/auth/login') {  // Verifica se é uma requisição de login
            const loginData = {
                timestamp: new Date().toISOString(),
                username: req.body.username || 'unknown'
            };
            // Enviar os dados de login ao Node-RED via HTTP request
            const axios = require('axios');
            axios.post('http://localhost:1880/login-data', loginData)
                .then(() => next())
                .catch((err) => next(err));
        } else {
            next();
        }
    },

    // Outras configurações do Node-RED
    ui: { path: "/ui" },
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },
    
    // Habilitar o fuso horário de São Paulo, Brasil
    timezone: "America/Sao_Paulo",
    
    // Porta de execução do Node-RED
    uiPort: process.env.PORT || 1880,

    // Caminho onde os fluxos serão armazenados
    flowFile: 'flows.json',

    // Segurança do editor
    editorTheme: {
        projects: {
            enabled: true
        }
    }
};
