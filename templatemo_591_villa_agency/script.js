document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message");
    const sendMessageButton = document.getElementById("send-message");
    const messagesSection = document.getElementById("messages");
    const agentSelect = document.getElementById("agents");

    // Enviar a primeira mensagem quando a página carregar
    sendFirstMessage();

    // Habilitar o botão de envio quando há texto no campo de entrada
    messageInput.addEventListener("input", () => {
        sendMessageButton.disabled = messageInput.value.trim() === "";
    });

    // Lidar com o envio da mensagem
    sendMessageButton.addEventListener("click", () => {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            addMessage("user", userMessage);
            messageInput.value = "";
            sendMessageButton.disabled = true;

            // Reagir à mensagem
            if (agentSelect.value === "reactive") {
                reactiveAgentResponse(userMessage);
            }
        }
    });

    function sendFirstMessage() {
        const firstMessage = "Olá! Bem-vindo ao ChatGPT.> aqui estao as instrucoes que voce pode dar como entrada para facilitar a nossa comunicacao :  aulas, horarios, professores, ajuda, oi, tchau, materia e exame! ☺";
        addMessage("bot", firstMessage);
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        messagesSection.appendChild(messageDiv);
        messagesSection.scrollTop = messagesSection.scrollHeight;
    }

    function reactiveAgentResponse(userMessage) {
        let response = "Desculpe, não entendi sua pergunta.";

        const keywords = [
            { 
                keyword: "oi", 
                responses: [
                    "Oi! Como posso ajudar você hoje?",
                    "Olá! Precisa de algo?",
                    "Oi! Estou aqui para ajudar.",
                    "Olá! O que você gostaria de saber?",
                    "Oi! Como posso assisti-lo?"
                ] 
            },
            { 
                keyword: "ajuda", 
                responses: [
                    "Claro, estou aqui para ajudar. Qual é a sua dúvida?",
                    "Estou à disposição para ajudar. O que você precisa?",
                    "Como posso ajudá-lo hoje?",
                    "Que tipo de ajuda você precisa?",
                    "Estou aqui para ajudar, diga-me o que você precisa."
                ] 
            },
            { 
                keyword: "tchau", 
                responses: [
                    "Até mais! Tenha um ótimo dia!",
                    "Tchau! Até a próxima!",
                    "Até logo! Cuide-se!",
                    "Tchau! Foi um prazer ajudar.",
                    "Até mais! Volte sempre que precisar."
                ] 
            },
            { 
                keyword: "aula", 
                responses: [
                    "As aulas começam às 8h e terminam às 12h.",
                    "Hoje teremos aula de Matemática e Português.",
                    "Não se esqueça da aula de História hoje à tarde.",
                    "As aulas são das 8h às 12h todos os dias.",
                    "Verifique o horário das aulas no portal do aluno."
                ] 
            },
            { 
                keyword: "horario", 
                responses: [
                    "O horário de funcionamento da escola é das 8h às 18h.",
                    "As aulas começam às 8h e terminam às 12h.",
                    "Os professores estão disponíveis das 14h às 16h.",
                    "Verifique o horário completo no site da escola.",
                    "A secretaria funciona das 9h às 17h."
                ] 
            },
            { 
                keyword: "professor", 
                responses: [
                    "Você pode encontrar os professores na sala dos professores durante o intervalo.",
                    "Os professores estarão disponíveis após as 14h.",
                    "Para falar com um professor, envie um e-mail agendando um horário.",
                    "Os professores estão na sala de professores durante o intervalo.",
                    "Você pode falar com os professores no final das aulas."
                ] 
            },
            { 
                keyword: "materia", 
                responses: [
                    "Hoje teremos Matemática, Português e História.",
                    "A próxima matéria é Ciências.",
                    "Não se esqueça de estudar Geografia para amanhã.",
                    "Hoje à tarde teremos aula de Educação Física.",
                    "Prepare-se para a aula de Artes amanhã."
                ] 
            },
            { 
                keyword: "exame", 
                responses: [
                    "O próximo exame será na sexta-feira, às 9h.",
                    "Prepare-se para o exame de Matemática na próxima segunda-feira.",
                    "O exame de História foi adiado para a próxima semana.",
                    "Verifique o calendário escolar para as datas dos exames.",
                    "Lembre-se de revisar suas anotações para o exame de Ciências."
                ] 
            }
        ];

        for (let i = 0; i < keywords.length; i++) {
            if (userMessage.toLowerCase().includes(keywords[i].keyword)) {
                const possibleResponses = keywords[i].responses;
                response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
                break;
            }
        }

        addMessage("bot", response);
    }
});
