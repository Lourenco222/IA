document.addEventListener("DOMContentLoaded", () => {
  const agentSelect = document.getElementById("agents");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message");
  const messagesSection = document.getElementById("messages");

  // Enable send button when message input is not empty
  messageInput.addEventListener("input", () => {
      document.getElementById("send-message").disabled = messageInput.value.trim() === "";
  });

  // Handle message submission
  messageForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission

      const userMessage = messageInput.value.trim();
      if (userMessage) {
          // Add user message to messages section
          addMessage("user", userMessage);
          messageInput.value = "";

          // Redirect message to selected agent
          sendMessageToAgent(userMessage);
      }
  });

  // Function to send message to selected agent
  function sendMessageToAgent(message) {
      const selectedAgent = agentSelect.value;
      addMessage("bot", "Message sent to agent " + selectedAgent + ": " + message);

      // Check which agent to send the message to
      if (selectedAgent === "reactive") {
          reactiveAgentResponse(message);
      } else if (selectedAgent === "internalState") {
          const response = internalStateAgentResponse(message); // Call internalStateAgentResponse function
          addMessage("bot", response); // Add the response to the messages section
      } else if (selectedAgent === "goalBased") {
          goalBasedAgentResponse(message);
      }
  }

  // Function to add a message to the messages section
  function addMessage(sender, text) {
      const messageDiv = document.createElement("div");
      messageDiv.className = `message ${sender}`;
      messageDiv.textContent = text;
      messagesSection.appendChild(messageDiv);
      messagesSection.scrollTop = messagesSection.scrollHeight;
  }

  // Function to react to user message based on keywords (reactive agent)
  function reactiveAgentResponse(userMessage) {
      let response = "Desculpe, não entendi sua pergunta.";

      // Keyword-response mapping for the reactive agent
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

      // Iterate through keywords to find a match
      for (let i = 0; i < keywords.length; i++) {
          if (userMessage.toLowerCase().includes(keywords[i].keyword)) {
              const possibleResponses = keywords[i].responses;
              response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
              break;
          }
      }

      // Add agent's response to the messages section
      addMessage("bot", response);
  }

  // Function to handle user message for internal state agent
  function internalStateAgentResponse(userMessage) {
      let response = "Desculpe, não entendi sua pergunta.";

      // Internal state representation and logic for the internal state agent
      const internalState = {
          hora: new Date().getHours(), // Current hour
          diaSemana: new Date().getDay(), // Day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
          temasEstudados: ["Matemática", "Português", "História"], // Recently studied topics
          proximoExame: "Matemática", // Next scheduled exam
          professoresDisponiveis: ["João", "Maria", "Carlos"], // List of available teachers
          // Other relevant data about the environment...
      };

      // Internal state agent rules (condition-action)
      // Adjust logic based on the internal state of the environment
      if (userMessage.toLowerCase().includes("aula")) {
          // If user message mentions class, agent responds with information about class schedule
          response = "As aulas ocorrem das 8h às 12h todos os dias.";
      } else if (userMessage.toLowerCase().includes("professor")) {
          // If user message mentions teacher, agent provides details about available teachers
          response = "Os professores disponíveis são: " + internalState.professoresDisponiveis.join(", ");
      } else if (userMessage.toLowerCase().includes("exame")) {
          // If user message mentions exam, agent informs about the next scheduled exam
          response = "O próximo exame é de " + internalState.proximoExame + " e está agendado para sexta-feira às 9h.";
      }
      // Additional rules can be added as needed, based on the internal state information

      // Return the agent's response to the user message
      return response;
  }

  // Function to handle user message for goal-based agent
  function goalBasedAgentResponse(userMessage) {
      let response = "Desculpe, não entendi sua pergunta.";

      // List of possible goals for the goal-based agent
      const goals = [
          { 
              name: "obter notas altas", 
              keywords: ["notas", "exame", "estudar"] 
          },
          { 
              name: "auxiliar os alunos", 
              keywords: ["ajuda", "ensinar", "tutoria"] 
          },
          { 
              name: "garantir a ordem na escola", 
              keywords: ["disciplina", "ordem", "comportamento"] 
          }
          // Add more goals as needed
      ];

      // Check if the user message relates to any of the goals
      for (let i = 0; i < goals.length; i++) {
          for (let j = 0; j < goals[i].keywords.length; j++) {
              if (userMessage.toLowerCase().includes(goals[i].keywords[j])) {
                  // Choose an action based on the identified goal
                  response = chooseActionForGoal(goals[i].name);
                  break;
              }
          }
          // If a goal has been identified, no need to continue checking other goals
          if (response !== "Desculpe, não entendi sua pergunta.") {
              break;
          }
      }

      addMessage("bot", response);
  }

  // Function to choose an action based on the identified goal
  function chooseActionForGoal(goal) {
      let action = "Desculpe, não entendi sua pergunta.";

      // Define actions based on goals
      const actions = {
          "obter notas altas": "Para obter notas altas, é importante revisar suas anotações diariamente e fazer exercícios práticos.",
          "auxiliar os alunos": "Estou aqui para ajudar! Qual é a sua dúvida específica?",
          "garantir a ordem na escola": "Para manter a ordem na escola, siga as regras e respeite os professores e colegas."
          // Add more actions as needed
      };

      // Determine the action based on the identified goal
      if (goal in actions) {
          action = actions[goal];
      }

      return action;
  }
});
