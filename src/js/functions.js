// Función de cambiar al modo oscuro
$(document).ready(function() {
  function enableDarkMode() {
    $('body').addClass('dark-mode');
    $('.card').addClass('dark-mode');
    $('.card-title').addClass('dark-mode');
    $('.card-content').addClass('dark-mode');
    $('.card-button').addClass('dark-mode');
    $('body').addClass('dark-mode');
    $('h1').addClass('dark-mode');
    $('p').addClass('dark-mode');
    $('a').addClass('dark-mode');
    $('.background-section').addClass('dark-mode');
    $('.nav-wrapper').addClass('dark-mode');
    $('.page-footer').addClass('dark-mode');
    $('.custom-background').addClass('dark-mode')
    $('h2').addClass('dark-mode');
    $('.background.col.s12').addClass('dark-mode');
  }

  // Cambiar al modo claro
  function disableDarkMode() {
    $('body').removeClass('dark-mode');
    $('.card').removeClass('dark-mode');
    $('.card-title').removeClass('dark-mode');
    $('.card-content').removeClass('dark-mode');
    $('.card-button').removeClass('dark-mode');
    $('h1').removeClass('dark-mode');
    $('p').removeClass('dark-mode');
    $('a').removeClass('dark-mode');
    $('.nav-wrapper').removeClass('dark-mode');
    $('.background-section').removeClass('dark-mode')
    $('.page-footer').removeClass('dark-mode');
    $('.custom-background').removeClass('dark-mode');
    $('h2').removeClass('dark-mode');
    $('.background.col.s12').removeClass('dark-mode');
  }

  //Esctructura If, encargada 
  $('#mode-switch').click(function() {
    if ($('body').hasClass('dark-mode')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
});

var formData = [];

var form = document.getElementById('myform'); // Actualiza el ID del formulario
var dataTable = document.getElementById('tabla-usuarios'); // Actualiza el ID de la tabla de datos
var submitButton = document.getElementById('submit'); // Actualiza el ID del botón de enviar
var clearBtn = document.getElementById('clearBtn');
var editIndex = -1;

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  var name = document.getElementById('firstname').value;
  var lastName = document.getElementById('lastname').value;
  var email = document.getElementById('email').value;
  var tel = document.getElementById('tel').value;
  var age = document.getElementById('age').value;
  var address = document.getElementById('address').value;
  var date = document.getElementById('date').value;
  var message = document.getElementById('message').value;
  var tea = document.querySelector('input[name="tea"]:checked');

  if (name && lastName && email && tel && age && address && date) {
    var data = {
      name: name,
      lastName: lastName,
      email: email,
      tel: tel,
      age: age,
      address: address,
      date: date,
      message: message,
      tea: tea ? tea.value : ""
    };

    if (editIndex === -1) {
      formData.push(data);
    } else {
      formData[editIndex] = data;
      submitButton.textContent = 'Enviar';
      editIndex = -1;
    }

    renderTable();
    form.reset();
  } else {
    alert('Por favor, completa todos los campos obligatorios.');
  }
});

clearBtn.addEventListener('click', function() {
  form.reset();
  submitButton.textContent = 'Enviar';
  editIndex = -1;
});

function renderTable() {
  dataTable.innerHTML = '';
  for (var i = 0; i < formData.length; i++) {
    var row = document.createElement('tr');
    var data = formData[i];
    row.innerHTML = '<td>' + data.name + '</td>' +
                    '<td>' + data.lastName + '</td>' +
                    '<td>' + data.email + '</td>' +
                    '<td>' + data.tel + '</td>' +
                    '<td>' + data.age + '</td>' +
                    '<td>' + data.address + '</td>' +
                    '<td>' + data.date + '</td>' +
                    '<td>' + data.message + '</td>' +
                    '<td>' + data.tea + '</td>' +
                    '<td>' +
                      '<span class="edit-btn" onclick="editData(' + i + ')">Editar</span>' +
                      '<span class="delete-btn" onclick="deleteData(' + i + ')">Eliminar</span>' +
                    '</td>';
    dataTable.appendChild(row);
  }
}

window.editData = function(index) {
  var data = formData[index];
  document.getElementById('firstname').value = data.name;
  document.getElementById('lastname').value = data.lastName;
  document.getElementById('email').value = data.email;
  document.getElementById('tel').value = data.tel;
  document.getElementById('age').value = data.age;
  document.getElementById('address').value = data.address;
  document.getElementById('date').value = data.date;
  document.getElementById('message').value = data.message;
  var teaRadios = document.querySelectorAll('input[name="tea"]');
  teaRadios.forEach(function(radio) {
    if (radio.value === data.tea) {
      radio.checked = true;
    }
  });

  submitButton.textContent = 'Confirmar';
  editIndex = index;
  
  // Bloquear todos los campos
  var formInputs = form.getElementsByTagName('input');
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = true;
  }
  
  var formTextareas = form.getElementsByTagName('textarea');
  for (var i = 0; i < formTextareas.length; i++) {
    formTextareas[i].disabled = true;
  }
};

window.deleteData = function(index) {
  if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
    formData.splice(index, 1);
    renderTable();
    form.reset();
    submitButton.textContent = 'Enviar';
    editIndex = -1;
    
    // Desbloquear todos los campos
    var formInputs = form.getElementsByTagName('input');
    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = false;
    }
    
    var formTextareas = form.getElementsByTagName('textarea');
    for (var i = 0; i < formTextareas.length; i++) {
      formTextareas[i].disabled = false;
    }
  }
};

submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  form.dispatchEvent(new Event('submit'));
});

