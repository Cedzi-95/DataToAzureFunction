// Frontend JavaScript for form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        // Prepare data to send
        const formData = {
            name: name,
            email: email
        };
        
        try {
            const response = await fetch('http://localhost:7071/api/httpTrigger1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                alert('Registration saved successfully!');
                
                // Optional: Clear form after successful submission
                form.reset();
            } else {
                const error = await response.json();
                console.error('Error:', error);
                alert('Error saving registration: ' + error.error);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: ' + error.message);
        }
    });
});