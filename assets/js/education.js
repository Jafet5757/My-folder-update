// Obtenemos el contendero
let container = document.getElementById('list-group-education');
let containerInformation = document.getElementById('text-education');
let Data = null;

/**
 * Prepara un item de la lista
 * @param {String} text texto a mostrar
 * @param {Boolean} active Revise si el elemento está activo
 * @param {Int} i Indice del elemento
 * @returns item completo listo para implementar en html
 */
let item = (text, active, i)=> `<li class="list-group-item ${active?'active-pop':''}" onclick="changeInformation(${i})">${text}</li>`;
let subtitle = subtitle => `<a href="#" class="a-title">${subtitle}</a>`;
let parragraph = text => `<p class="text-secondary">${text}</p>`;
let link = (url, text) => `<li class="text-secondary"><a href="${url}" target="_blank">${text}</a></li>`;

// Cargamos los titulos en el contenedor
function loadTitles() {
  // Limpiamos el contenedor
  container.innerHTML = '';
  // Cargamos el documento education.json
  fetch('./assets/data/education.json')
    .then(response => response.json())
    .then(data => { 
      // Guardamos la información
      Data = data;
      data.forEach((element, i) => {
        container.innerHTML += item(element.title, i===0, i);
        // Cargamos la información del primer elemento
        if (i === 0) {
          loadInformation(element);
        }
      });
    });
}

loadTitles();


/**
 * Cargamos la información de educación de un solo elemento
 * @param {Object} data Attribute of the object: title, subtitle, type, content
 */
const loadInformation = (data) => {
  containerInformation.innerHTML = '';
  // Cargamos el titulo
  containerInformation.innerHTML += subtitle(data.subtitle);
  // si el tipo es texto
  if (data.type === 'text') {
    containerInformation.innerHTML += parragraph(data.content);
  }else if(data.type === 'list'){
    containerInformation.innerHTML += '<ul>';
    data.content.forEach(element => {
      // si es tipo link
      if (element.type === 'link') {
        containerInformation.innerHTML += link(element.url, element.text);
      }
    });
    containerInformation.innerHTML += '</ul>';
  }
}

const changeInformation = (i) => { 
  // Limpiamos el contenedor
  container.innerHTML = '';
  // Cargamos el documento education.json
  Data.forEach((element, j) => {
    container.innerHTML += item(element.title, i===j, j);
    // Cargamos la información del primer elemento
    if (i === j) {
      loadInformation(element);
    }
  });
}