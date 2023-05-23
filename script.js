//обработка галереи
const galleryItems = document.querySelectorAll('.gallery__item');
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popupImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const closeButton = document.getElementById('closeButton');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    popup.style.display = 'block';
    popupImage.src = item.src;
    currentImageIndex = index;
    if (currentImageIndex === 0) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
    }
    if (currentImageIndex === galleryItems.length - 1) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
    }
  });
});

prevButton.addEventListener('click', () => {
  currentImageIndex--;
  popupImage.src = galleryItems[currentImageIndex].src;
  if (currentImageIndex === 0) {
    prevButton.style.display = 'none';
  } else {
    prevButton.style.display = 'block';
  }
  if (currentImageIndex === galleryItems.length - 2) {
    nextButton.style.display = 'block';
  } else {
    nextButton.style.display = 'block';
  }
});

nextButton.addEventListener('click', () => {
  currentImageIndex++;
  popupImage.src = galleryItems[currentImageIndex].src;
  if (currentImageIndex === galleryItems.length - 1) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'block';
  }
  if (currentImageIndex === 1) {
    prevButton.style.display = 'block';
  } else {
    prevButton.style.display = 'block';
  }
});

//чтобы при клике на пространство за попапом закрывалось
function closePopup(event) {
  if (event.target === popup && event.target !== prevButton && event.target !== nextButton) {
    popup.style.display = 'none';
  }
}

document.addEventListener('click', closePopup, true);

//обработка формы
const openBtn = document.querySelector('.open-popup');
const modal = document.querySelector('.modal');
const form = document.querySelector('form[name="contactForm"]');
const submitButton = document.querySelector('.form__button');
const successMessage = document.querySelector('.form__successMessage');
const phoneRegex = /^(\+7|8)?[\s\-]?\(?(\d{3})\)?[\s\-]?(\d{3})[\s\-]?(\d{2})[\s\-]?(\d{2})$/;
const textRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;

function highlightInput(input, isValid) {
  if (isValid) {
    input.style.border = '';
  } else {
    input.style.border = '1px solid red'; 
  }
}

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  const lastDotIndex = email.lastIndexOf('.');
  const domainLength = email.length - lastDotIndex - 1;
  if (domainLength < 2) {
    return false;
  }
  return true;
}

openBtn.addEventListener('click', function() {
  modal.style.display = 'block';
});

function sendForm() {
  const formData = new FormData(form);
  showSuccessMessage();
}

function hideSuccessMessage() {
  successMessage.style.display = 'none';
}

function resetForm() {
  form.reset();
}

function showSuccessMessage() {
  submitButton.style.backgroundColor = '#32CD32';
  submitButton.style.cursor = 'default';
  submitButton.disabled = true;
  submitButton.textContent = 'Отправлено';
  setTimeout(() => {
    resetForm();
    hideSuccessMessage();
    submitButton.disabled = false;
    submitButton.textContent = 'Отправить';
  }, 2000);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = form.elements.name;
  const emailInput = form.elements.email;
  const phoneInput = form.elements.phone;
  const messageInput = form.elements.message;
  
  if (!phoneRegex.test(phoneInput.value)) {
    highlightInput(phoneInput, false);
    alert('Введите корректный номер телефона!');
    return;
  }
  const emailIsValid = isEmailValid(emailInput.value);
  if (!emailIsValid) {
    highlightInput(emailInput, false);
    alert('Введите корректный адрес электронной почты!');
    return;
  }
  const nameIsValid = textRegex.test(nameInput.value);
  const messageIsValid = textRegex.test(messageInput.value);
  if (!nameIsValid) {
    highlightInput(nameInput, false);
    alert('Введите только русские или английские символы!');
    return;
  }
  if (!messageIsValid ) {
    highlightInput(messageInput , false);
    alert('Введите только русские или английские символы!');
    return;
  }
  highlightInput(emailInput, true);
  highlightInput(phoneInput, true);
  highlightInput(nameInput, true);
  highlightInput(messageInput , true);

  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';

  setTimeout(() => {
    sendForm();
  }, 2000);
});

const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

function closeModal(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}
document.addEventListener('click', closeModal, true);

//для дождика
const raindropContainer = document.querySelector('.rain-overlay');
const startBtn = document.getElementById('start-rain');
let isAnimationStarted = false;
startBtn.addEventListener('click', () => {
  if (isAnimationStarted) {
    raindropContainer.classList.remove('rain-animation-started');
    isAnimationStarted = false;
  } else {
    raindropContainer.classList.add('rain-animation-started');
    isAnimationStarted = true;
  }
});

//для чб стиля
const button = document.getElementById('change-style');
const body = document.querySelector('body');
const main = document.querySelector('.main');
const head = document.querySelector('.head');
const gallery = document.querySelector('.gallery');
const form__button = document.querySelector('.form__button');

button.addEventListener('click', () => {
  body.classList.toggle('black-and-white');
  main.classList.toggle('black-and-white');
  head.classList.toggle('black-and-white');
  gallery.classList.toggle('black-and-white');
  form__button.classList.toggle('black-and-white');
});

const popup_messageContent = document.querySelector('.popup-message__content');
const popup_messageClose = document.querySelector('.popup-message__close');
let popupDisplayed = sessionStorage.getItem('popupDisplayed') === 'true';

function showPopup_message() {
  console.log(sessionStorage.getItem('popupDisplayed'))
  popup_messageContent.parentNode.style.display = 'flex';
  sessionStorage.setItem('popupDisplayed', true);
}

function hidePopup_message() {
  popup_messageContent.parentNode.style.display = 'none';
}

if (!popupDisplayed) {
  setTimeout(showPopup_message, 3000);
}

popup_messageClose.addEventListener('click', (event) => {
  hidePopup_message();
  console.log(sessionStorage.getItem('popupDisplayed'))
}, true);

document.addEventListener('click', (event) => {
  if (!event.target.closest('.popup-message__content') && popup_messageContent.parentNode.style.display === 'flex') {
    hidePopup_message();
  }
}, true);


