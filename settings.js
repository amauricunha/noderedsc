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
    adminAuth: {
        type: "credentials",
        users: users
    },
    // outras configurações
}
