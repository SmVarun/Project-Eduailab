// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const coursesContainer = document.getElementById('courses-container');
    const responseMessage = document.getElementById('response-message');

    // Function to fetch and display courses
    async function fetchCourses() {
        try {
            const response = await fetch('http://localhost:5000/api/courses');
            const coursesData = await response.json();

            // Clear previous content
            coursesContainer.innerHTML = '';

            // Render courses
            coursesData.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.classList.add('course');
                courseElement.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <a href="#">Enroll Now</a>
                `;
                coursesContainer.appendChild(courseElement);
            });

        } catch (error) {
            console.error('Error fetching courses:', error.message);
            coursesContainer.innerHTML = '<p>Failed to load courses. Please try again later.</p>';
        }
    }

    // Fetch courses on page load
    fetchCourses();

    // Event listener for contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const requestData = {
                method: 'POST',
                body: formData
            };

            try {
                const response = await fetch('http://localhost:5000/api/contacts', requestData);
                const responseData = await response.json();

                // Display response message
                responseMessage.innerHTML = `<p>${responseData.message}</p>`;

                // Optionally, clear the form after successful submission
                contactForm.reset();

            } catch (error) {
                console.error('Error sending message:', error.message);
                responseMessage.innerHTML = `<p>Failed to send message. Please try again later.</p>`;
            }
        });
    }
});


