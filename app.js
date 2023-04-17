// const loginForm = document.getElementById("login-form");
// const registerForm = document.getElementById("register-form");
// const errorMessage = document.getElementById("error-message");

// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const username = loginForm.elements["username"].value;
//   const password = loginForm.elements["password"].value;

//   // Aquí iría la lógica para autenticar al usuario con el servidor
//   // Si hay un error, mostrar el mensaje de error
//   errorMessage.textContent = "Nombre de usuario o contraseña incorrectos";
// });

// registerForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newUsername = registerForm.elements["new-username"].value;
//   const newPassword = registerForm.elements["new-password"].value;
//   const confirmPassword = registerForm.elements["confirm-password"].value;

//   // Verificar que las contraseñas coincidan
//   if (newPassword !== confirmPassword) {
//     errorMessage.textContent = "Las contraseñas no coinciden";
//     return;
//   }

//   // Aquí iría la lógica para enviar los datos del nuevo usuario al servidor
//   // Si hay un error, mostrar el mensaje de error
//   errorMessage.textContent = "Error al registrar nuevo usuario";
// });

function RegistrarUsuario() {
    // Obtener los valores de los campos del formulario
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var usuario = $('#usuario').val();
    var password = $('#passwordu').val();
  
    // Crear un objeto con los datos del usuario
    var nuevoUsuario = {
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
      password: password
    };
  
    // Enviar los datos del nuevo usuario al servidor a través de una petición POST
    $.ajax({
      url: 'https://localhost:44302/api/RegistroUser',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(nuevoUsuario),
      success: function(response) {
        // Mostrar mensaje de éxito y redirigir al formulario de inicio de sesión
        alert('El usuario ha sido registrado exitosamente');
        window.location = "Login.html";
      },
      error: function(xhr, status, error) {
        // Mostrar mensaje de error si no se pudo registrar el usuario
        alert('Ocurrió un error al intentar registrar el usuario');
        console.log(xhr.responseText);
      }
    });

    $(document).ready(function() {
        Obtener();
      });
  }
  
