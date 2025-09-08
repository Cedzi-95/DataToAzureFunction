
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






