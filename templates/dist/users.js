"use strict";
document.addEventListener('DOMContentLoaded', () => {
    fetch('/users/api')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
        console.log(data);
        const body = document.body;
        data.users.forEach((iterUser) => {
            const user = createUserDiv(iterUser);
            body.appendChild(user);
        });
    })
        .catch(error => {
        console.error('Error fetching users:', error);
    });
});
function createUserDiv(user) {
    const div = document.createElement('div');
    div.className = 'user';
    const id = document.createElement('p');
    id.textContent = `Id: ${user.id}`;
    const username = document.createElement('p');
    username.textContent = `Username: ${user.username}`;
    const age = document.createElement('p');
    age.textContent = `Age: ${user.age}`;
    div.appendChild(id);
    div.appendChild(username);
    div.appendChild(age);
    return div;
}
