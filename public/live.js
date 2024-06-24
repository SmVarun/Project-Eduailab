document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            appendMessage('You', message);
            chatInput.value = '';
            // Simulate receiving a response (in a real application, you would send the message to the server)
            setTimeout(() => {
                appendMessage('Instructor', 'Thank you for your message!');
            }, 1000);
        }
    });

    function appendMessage(user, message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${user}: ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
