document.addEventListener('DOMContentLoaded', function() {
    const subscriptionForm = document.getElementById('subscription-form');
    
    if (subscriptionForm) {
      subscriptionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const emailInput = document.getElementById('subscription-email');
        const statusMessage = document.getElementById('subscription-status');
        
        if (emailInput && emailInput.value) {
          // Basic client-side validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailInput.value)) {
            statusMessage.textContent = 'Please enter a valid email address.';
            statusMessage.classList.add('error');
            return;
          }
          
          // Submit subscription request
          fetch('https://api.arvindkiyer.com/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailInput.value })
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              statusMessage.textContent = data.message;
              statusMessage.classList.remove('error');
              statusMessage.classList.add('success');
              emailInput.value = '';
            } else {
              statusMessage.textContent = data.error || 'An error occurred. Please try again.';
              statusMessage.classList.add('error');
            }
          })
          .catch(error => {
            console.error('Error submitting subscription:', error);
            statusMessage.textContent = 'An error occurred. Please try again.';
            statusMessage.classList.add('error');
          });
        }
      });
    }
  });