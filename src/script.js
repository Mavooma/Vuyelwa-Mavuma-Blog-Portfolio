// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            item.classList.toggle("active");

            const answer = item.querySelector(".faq-answer");
            if (item.classList.contains("active")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });

    // Initialize EmailJS (Make sure this is done before sending emails)
    emailjs.init("0t2foETsxr_aO40zj");

    // Function to send email
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Collect the form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Validate the form
        if (!name || !email || !message) {
            document.getElementById("status").innerText = "Please fill out all fields.";
            return;
        }

        // Prepare the email parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        // Send the email using EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
            .then(function(response) {
                document.getElementById("status").innerText = "Message sent successfully!";
                document.getElementById("contact-form").reset(); // Clear form after success
            }, function(error) {
                document.getElementById("status").innerText = "Failed to send message. Please try again.";
            });
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    let emailField = document.getElementById('email');
    if (!emailField.value.includes('@')) {
      event.preventDefault(); 
      document.getElementById('status').innerHTML = 'Please enter a valid email address.';
    }
  });
