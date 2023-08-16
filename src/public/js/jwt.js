const form = document.getElementById("formLogin");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");
const boton = document.getElementById("boton");

form.onsubmit = (e) => {
  e.preventDefault();
  fetch("http://localhost:8081/views/login", {
    method: "POST",
    body: JSON.stringify({
      email: inputEmail.value,
      password: inputPass.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      localStorage.setItem("token", response.access_token);
    });
    //setTimeout(() => window.location.href = "/productos", 500);
};

boton.onclick = () => {
  fetch("http://localhost:8080/users/perfil", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
