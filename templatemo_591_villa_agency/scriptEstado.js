document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message");
    const sendMessageButton = document.getElementById("send-message");
    const messagesSection = document.getElementById("messages");
  
    // Enable send button when message input is not empty
    messageInput.addEventListener("input", () => {
        sendMessageButton.disabled = messageInput.value.trim() === "";
    });
  
    // Handle sending message
    sendMessageButton.addEventListener("click", () => {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            addMessage("user", userMessage);
            messageInput.value = "";
            sendMessageButton.disabled = true;
            
            // React to message
            internalStateAgentResponse(userMessage);
        }
    });
  
    function addMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        messagesSection.appendChild(messageDiv);
        messagesSection.scrollTop = messagesSection.scrollHeight;
    }
  
    // Internal State Agent Response
    function internalStateAgentResponse(userMessage) {
        // Array of predefined responses
        const responses = [
            "Estou processando sua solicitação...",
            "Aguarde um momento, por favor...",
            "Vou verificar isso para você...",
            "Só um instante, estou buscando a resposta..."
        ];
        // Select a random response from the array
        const randomIndex = Math.floor(Math.random() * responses.length);
        const response = responses[randomIndex];
        // Simulate a delay before responding
        setTimeout(() => {
            addMessage("bot", response);
        }, 1000); // 1 segundo de atraso para simular processamento
    }
});
