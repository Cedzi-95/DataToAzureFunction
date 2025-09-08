
document.getElementById("userForm").addEventListener("submit" , async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    const response = await fetch("/api/registerUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
});






// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('form');

//     form.addEventListener('submit', (event) => {
//         event.preventDefault();
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;

//         const result = document.createElement('p');
//         result.textContent = `Name: ${name}`;
//         const result2= document.createElement('p');
//         result2.textContent = `E-post: ${email}`;
//         document.body.appendChild(result);
//         document.body.appendChild(result2);
//     });
// });