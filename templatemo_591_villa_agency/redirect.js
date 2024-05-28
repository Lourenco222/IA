document.addEventListener("DOMContentLoaded", () => {
    const agentSelect = document.getElementById("agents");
    agentSelect.addEventListener("change", () => {
      const selectedAgent = agentSelect.value;
      const scriptPath = selectedAgent === "reactive" ? "script.js" : "scriptEstado.js";
      loadScript(scriptPath);
    });
  });
  
  function loadScript(scriptPath) {
    const currentScript = document.querySelector("script[data-agent]");
    if (currentScript) {
      currentScript.remove();
    }
    const newScript = document.createElement("script");
    newScript.src = scriptPath;
    newScript.setAttribute("data-agent", scriptPath);
    document.body.appendChild(newScript);
  }
  