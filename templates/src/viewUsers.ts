interface User {
    id: number;
    username: string;
    age: number;
}

// Função principal que será executada quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    fetch('/users/api')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Para verificar os dados recebidos no console

            const body = document.body as HTMLBodyElement;

            // Iterando sobre cada usuário recebido
            data.users.forEach((iterUser: User) => {
                const user = createUserDiv(iterUser); // Cria um elemento div para o usuário
                body.appendChild(user); // Adiciona o elemento div ao corpo do documento
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
});

// Função para criar um elemento div para exibir informações de usuário
function createUserDiv(user: User): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'user';

    // Criando parágrafos para exibir as informações do usuário
    const id = document.createElement('p');
    id.textContent = `Id: ${user.id}`;

    const username = document.createElement('p');
    username.textContent = `Username: ${user.username}`;

    const age = document.createElement('p');
    age.textContent = `Age: ${user.age}`;

    // Adicionando os parágrafos ao elemento div
    div.appendChild(id);
    div.appendChild(username);
    div.appendChild(age);

    return div;
}