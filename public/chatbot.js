// Import the RuleBot class from './rulebot.js'
import RuleBot from './rulebot.js';

document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.querySelector(".chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatContainer = document.querySelector(".ai-chat-container");
    const chatbotButton = document.querySelector(".ai-chatbot-button");

    const AlienBot = new RuleBot();

    function addMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(sender);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleUserInput() {
        const message = userInput.value.trim().toLowerCase();
        if (message !== "") {
            addMessage(message, "user");
            userInput.value = "";

            setTimeout(() => {
                const botResponse = AlienBot.respondTo(message);
                addMessage(botResponse.message, "agent");

                if (botResponse.askQuestion) {
                    setTimeout(() => {
                        addMessage(botResponse.askQuestion, "agent");
                    }, 500);
                }
            }, 500);
        }
    }

    sendButton.addEventListener("click", handleUserInput);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    chatbotButton.addEventListener("click", function() {
        if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
            chatContainer.style.display = 'block';
        } else {
            chatContainer.style.display = 'none';
        }
    });

    // Start the chat with initial greeting message
    setTimeout(() => {
        const botResponse = AlienBot.greet();
        addMessage(botResponse.message, "agent");

        if (botResponse.askQuestion) {
            setTimeout(() => {
                addMessage(botResponse.askQuestion, "agent");
            }, 500);
        }
    }, 500);
});
