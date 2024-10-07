
    document.getElementById('toggleSignup').addEventListener('click', function() {
        document.querySelector('.login-box').style.display = 'none';
        document.querySelector('.signup-box').style.display = 'block';
    });

    // Toggle back to login form when clicking "Log in here"
    document.getElementById('toggleLogin').addEventListener('click', function() {
        document.querySelector('.signup-box').style.display = 'none';
        document.querySelector('.login-box').style.display = 'block';
    });

    // Login functionality
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();  // Prevent the form from submitting normally

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:9000/admin/adlog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password })
            });

            if (response.ok) {
                const token = await response.text(); // Assuming token is returned as plain text
                console.log('Login successful:', token);
                window.location.href = 'http://127.0.0.1:5500/homepage.html';  // Redirect to your website
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    });

    // Signup functionality
    document.getElementById('signupForm').addEventListener('submit', async function(e) {
        e.preventDefault();  // Prevent the form from submitting normally

        const name = document.getElementById('name').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const response = await fetch('http://localhost:9000/admin/adup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name, email: email, password: password })
            });

            if (response.ok) {
                const data = await response.json();  // Assuming a JSON object is returned
                console.log('Signup successful:', data);
                alert('Admin created successfully!');
            } else {
                alert('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred during signup.');
        }
    });
