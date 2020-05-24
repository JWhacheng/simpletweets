// Variables
const listaTweets = document.querySelector('#lista-tweets');

// Event Listeners
eventListeners();

function eventListeners() {
  // Cuando se envia el formulario
  document
    .querySelector('#formulario')
    .addEventListener('submit', agregarTweet);

  // Borrar tweets
  listaTweets.addEventListener('click', borrarTweet);

  // Contenido cargado
  document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones

// Add tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  // Leer el valor del textarea
  const tweet = document.getElementById('tweet').value;

  // Crear boton de eliminar
  const botonBorrar = document.createElement('a');
  botonBorrar.classList = 'borrar-tweet';
  botonBorrar.innerText = 'X';

  // Crear elemento y add a la lista
  const li = document.createElement('li');
  li.innerText = tweet;
  // Add el boton de borrar al tweet
  li.appendChild(botonBorrar);
  // Add el tweet a la lista
  listaTweets.appendChild(li);

  // Add al Local Storage
  agregarTweetLocalStorage(tweet);
}

// Elimina el tweet del DOM
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

// Mostrar datos de Local Storage en la Lista
function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  tweets.forEach((tweet) => {
    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // Crear elemento y add a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // Add el boton de borrar al tweet
    li.appendChild(botonBorrar);
    // Add el tweet a la lista
    listaTweets.appendChild(li);
  });
}

// Add tweet al Local Storage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  // Add el nuevo tweet
  tweets.push(tweet);

  // Convertir de string a arreglo para local storage
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Comprobar que haya elementos en Local Storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
  let tweets;
  // Revisamos los valores del local storage
  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

// Eliminar tweet del LocalStorage
function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;
  tweets = obtenerTweetsLocalStorage();

  // Elimina la X del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem('tweets', JSON.stringify(tweets));
}
