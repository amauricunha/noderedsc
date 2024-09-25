const fs = require('fs');
const path = '/credenciais/credentials.json'; // Caminho do arquivo de credenciais no contêiner

let users = [];

if (fs.existsSync(path)) {
    const credentialsData = fs.readFileSync(path, 'utf-8');
    users = JSON.parse(credentialsData).users;
}

module.exports = {
    adminAuth: {
        type: "credentials",
        users: users
    },
    // outras configurações
}
