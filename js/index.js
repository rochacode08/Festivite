function handleCoverPhotoInput() {
  const coverPhotoInput = document.getElementById('cover-photo');
  const uploadText = document.querySelector('.upload-text');

  coverPhotoInput.addEventListener('change', function (e) {
    const fileName = e.target.files[0]?.name || 'Nenhum arquivo selecionado';
    uploadText.textContent = fileName;
  });
}

function formatPhoneInput() {
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    value = value.substring(0, 11);

    if (value.length >= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length >= 7) {
      value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length >= 2) {
      value = value.replace(/^(\d{2})/, '($1) ');
    }

    e.target.value = value;
  });
}

function validatePhoneInput() {
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('keypress', function (e) {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  });
}

function handleDateInputs() {
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.addEventListener('change', function () {
      if (this.value) {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  });
}

function showError(input, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'erro';
  errorElement.innerHTML = `
    <img src="assets/icons/circle-alert.svg" alt="Ícone de erro">
    <span>${message}</span>
  `;

  const existingError = input.parentElement.querySelector('.erro');
  if (existingError) {
    existingError.remove();
  }

  input.insertAdjacentElement('afterend', errorElement);

  input.classList.add('erro');
  
}

function validateForm() {
  let isValid = true;

  const titleInput = document.getElementById('title');
  if (!titleInput.value.trim()) {
    showError(titleInput, 'Por favor, insira o título do evento.');
    isValid = false;
  }

  const startDateInput = document.getElementById('start');
  if (!startDateInput.value) {
    showError(startDateInput, 'Por favor, selecione a data de início.');
    isValid = false;
  }

  const endDateInput = document.getElementById('end');
  if (!endDateInput.value) {
    showError(endDateInput, 'Por favor, selecione a data de fim.');
    isValid = false;
  }

  const eventTypeInputs = document.querySelectorAll('input[name="type"]');
  const isEventTypeSelected = Array.from(eventTypeInputs).some(input => input.checked);
  if (!isEventTypeSelected) {
    const radioGroup = document.querySelector('.radio-group');
    showError(radioGroup, 'Por favor, selecione o tipo de evento.');
    isValid = false;
  }

  const locationInput = document.getElementById('location');
  if (!locationInput.value.trim()) {
    showError(locationInput, 'Por favor, insira o local ou link.');
    isValid = false;
  }

  const descriptionInput = document.getElementById('description');
  if (!descriptionInput.value.trim()) {
    showError(descriptionInput, 'Por favor, insira a descrição do evento.');
    isValid = false;
  }

  const nameInput = document.getElementById('name');
  if (!nameInput.value.trim()) {
    showError(nameInput, 'Por favor, insira o nome do contato.');
    isValid = false;
  }

  const emailInput = document.getElementById('mail');
  if (!emailInput.value.trim()) {
    showError(emailInput, 'Por favor, insira o e-mail.');
    isValid = false;
  }

  const phoneInput = document.getElementById('phone');
  if (!phoneInput.value.trim()) {
    showError(phoneInput, 'Por favor, insira o telefone.');
    isValid = false;
  }

  const coverPhotoInput = document.getElementById('cover-photo');
  if (!coverPhotoInput.files || coverPhotoInput.files.length === 0) {
    const uploadButton = document.querySelector('.upload-button');
    showError(uploadButton, 'Por favor, selecione uma foto de capa.');
    isValid = false;
  }

  return isValid;
}

function initForm() {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); 
 
    document.querySelectorAll('.erro').forEach(error => error.remove());

    document.querySelectorAll('input.erro, textarea.erro, .upload-button.erro').forEach(element => element.classList.remove('erro'));

    if (validateForm()) {
      alert('Formulário enviado com sucesso!');
      form.submit(); // Envia o formulário se estiver válido
    }
  });
}

function init() {
  handleCoverPhotoInput();
  formatPhoneInput();
  validatePhoneInput();
  handleDateInputs();
  initForm();
}

document.addEventListener('DOMContentLoaded', init);