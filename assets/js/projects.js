const projectsContainer = document.getElementById('projects-container');

const imgPrefix = './assets/img/projects/';

const card = (img, name, description, index) => `
  <div class="col">
      <div class="card mx-auto" style="width: 19rem; height: 100%;" id="index-${index}">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text text-secondary">${description}</p>
        </div>
        <div class="d-flex justify-content-center card-footer">
            <a class="btn btn-pop px-5" href="./details.html?index=${index}">Details</a>
          </div>
      </div>
    </div>
`

function loadProjects() {
  // Limpiamos el contenedor
  projectsContainer.innerHTML = '';
  // Cargamos el documento projects.json
  fetch('./assets/data/projects.json')
    .then(response => response.json())
    .then(data => {
      data.forEach((element, i) => {
        projectsContainer.innerHTML += card(imgPrefix+element.images[0], element.name, element.description, i);
      });
    });
}

loadProjects();