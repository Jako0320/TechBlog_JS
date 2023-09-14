const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      // Send a POST request to the signup route
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the desired location
        document.location.replace('/dashboard');
      } else {
        alert('Signup failed. Please try again.');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  