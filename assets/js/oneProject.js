// leemos el parametro index de la url
const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('index');
const imgPrefix = './assets/img/projects/';

const carrouselIMage = (image, index) => `
  <div class="carousel-item ${index==0?'active':''}">
    <img src="${image}" class="d-block w-100" alt="...">
  </div>
`
const linkComponent = (url, name) => `<p class="text-secondary">${name}: <a href="${url}" target="_blank">${url}</a></p>`;

const buttons = (index) => `
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" aria-label="Slide ${index}"></button>
`


function loadProjectInformation() {
  // Cargamos el documento projects.json
  fetch('./assets/data/projects.json')
    .then(response => response.json())
    .then(data => {
      // Guardamos la información
      const project = data[index];
      // Cargamos la información del proyecto
      document.getElementById('project-title').innerHTML = project.name;
      document.getElementById('project-description').innerHTML = project.description;
      // Mapeamos las tecnologías para que sea una lista
      document.getElementById('project-technologies').innerHTML = project.technologies.map(technology => `<li>${technology}</li>`).join('');
      // Cargamos las imagenes en el carrousel
      document.getElementById('carrousel-images').innerHTML = project.images.map((image, i) => carrouselIMage(imgPrefix + image, i)).join('');
      // Cargamos los botones del carrousel
      document.getElementById('buttons-indicators').innerHTML += project.images.map((image, i) => i != 0 ? buttons(i) : null).join(''); //Se omite el primer boton como activo
      // Cargamos los links
      document.getElementById('project-links').innerHTML = project.links.map(link => linkComponent(link.url, link.name)).join('');
    });
}

loadProjectInformation();