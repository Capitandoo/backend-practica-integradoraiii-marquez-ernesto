const socketClient = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "¡Welcome to chat!",
    text: "Insert your username here",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Your username is required";
      }
    },
  }).then((input) => {
    username = input.value;
    socketClient.emit("newUser", username);
  });
}

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socketClient.emit("chat:message", {
    username,
    message: message.value
  });
  message.value = "";
});

socketClient.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data.map((msg) => {
      return `<p><strong>${msg.username}: ${msg.message}<strong></p>`;
    }).join(" ");
  output.innerHTML = chatRender;
});

socketClient.on("newUser", (username) => {
  Toastify({
    text: `🟢 ${username} is logged in`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    // style: {
    //     background: "linear-gradient(to right, #00b09b, #96c93d)"
    // }
    // onClick: ()=>{}
  }).showToast();
});

message.addEventListener("keypress", () => {
  socketClient.emit("chat:typing", username);
});

socketClient.on("chat:typing", (data) => {
  actions.innerHTML = `<p> ${data} is writting a message... </p>`;
});

