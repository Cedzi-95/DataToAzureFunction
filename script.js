document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        const result = document.createElement('p');
        result.textContent = `Name: ${name}`;
        const result2= document.createElement('p');
        result2.textContent = `E-post: ${email}`;
        document.body.appendChild(result);
        document.body.appendChild(result2);
    });
});