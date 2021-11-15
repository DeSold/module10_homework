/* Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com. не получилось. Данный сервер не отвечает(*/
/* Поэтому был использован сервер wss://ws.ifelse.io// */

const wsUri = 'wss://ws.ifelse.io//';
const output = document.querySelector('.result-wrapper');
const btnSendMessage = document.querySelector('.btn-send');
const btnGetLocation = document.querySelector('.btn-location');

const messageForm = document.querySelector('.input-form');
messageForm.setAttribute('size', messageForm.getAttribute('placeholder').length);

let websocket = new WebSocket(wsUri);

websocket.onopen = function() {
  console.log("[open] Соединение установлено");
};

websocket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    console.log('[close] Соединение прервано');
  }
};

websocket.onmessage = function(event) {
  writeToScreen(event.data, 'server');
};

websocket.onerror = function(event) {
  console.log( `[error] ${event.data}`);
};

// output message to screen
function writeToScreen(message, type = 'client') {

  let blockText = document.createElement('div');
  blockText.setAttribute('class', `${type}-message`);

  let text = document.createElement("p");
  text.innerHTML = message;
  blockText.appendChild(text);
  
  output.appendChild(blockText);
}

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  let latitude  = position.coords.latitude;
  let longitude = position.coords.longitude;

  let link = `
  <a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' target='_blank' name='location'>My geo!</a>`;
  writeToScreen(link);
}

// send client message
btnSendMessage.addEventListener('click', () => { 

  let clientText = messageForm.value;

  if ( clientText ) {
    writeToScreen(clientText);
    websocket.send(clientText);
    messageForm.value = "";
  }
  
})

// get client location
btnGetLocation.addEventListener('click', () => {

  if (!navigator.geolocation) {
    alert('Geolocation не поддерживается вашим браузером');
  } else {
    console.log('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(success, error);
  }
})