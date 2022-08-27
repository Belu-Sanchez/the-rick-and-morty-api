
const root = document.getElementById('root')
const mujer = document.getElementById('mujer')
const hombre = document.getElementById('hombre')
const aliens = document.getElementById('aliens');
const humanos = document.getElementById('humanos');
const personajes = document.getElementById('personajes');



//paginador

const paginaActual = document.querySelector("#pagina-actual");
const totalPaginas = document.querySelector('#total-paginas');
const firstPage = document.querySelector('#first-page');
const previusPage = document.querySelector('#previus-page');
const nextPage = document.querySelector('#next-page');
const lastPage = document.querySelector('#last-page');

//loader

const loader = document.getElementById('contenedor')




let pagina = 1;
let total = 0;


const getData = async() => {
  loader.classList.remove('esconder')
  root.classList.add('esconder')
  const url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;
  // fetch(url)
  // .then(resp => resp.json())
  // .then(json => { 
  //   printData(json.results)
  // data = json;
  // })
  // .catch(err => console.error(err))
const resp = await fetch(url)
const json = await resp.json()
printData(json.results)
total = json.info.pages
paginaActual.innerHTML = pagina
totalPaginas.innerHTML = total

data = json
updatePagination()
setTimeout(() => {
  loader.classList.add('esconder')
  root.classList.remove('esconder')

},1000);
return json;
}

let data = [];

const printData = (json) => {

  const arr = json;
  let card = '';
  arr.forEach(personaje => {
  const {name, gender, species, status, origin, location, image} = personaje;

    card += `   
   <div class="col s12 m6 l3">
    <div class="card">
      <div class="card-image">
        <img src="${image}">
      </div>
      <div class="card-content">
        <p>Nombre: ${name}</p>
        <p>Genero: ${gender}</p>
        <p>Species: ${species}</p>
        <p>Status: ${status}</p>
        <p>Origin: ${origin.name}</p>
        <p>Location: ${location.name}</p>
      </div>
      <div class="card-action">
        <a href="#">VER MAS</a>
      </div>
    </div>
  </div>
</div>
        
`
 });

 root.innerHTML = card
}

//FILTROS


personajes.addEventListener('click', () =>{
  const todosPersonajes = data.results.filter(personaje =>  personaje.gender !== 'Male'  || 'Female' )
  printData(todosPersonajes)

})




mujer.addEventListener('click', e => {
  const female = data.results.filter(personaje => personaje.gender === 'Female')
  printData(female)

})

hombre.addEventListener('click', e => {
  console.log(data.results)
  const male = data.results.filter(personaje => personaje.gender === 'Male')
  printData(male)


})

aliens.addEventListener('click', e => {
  const aliens = data.results.filter(personaje => personaje.species === 'Alien')
  printData(aliens)
})


humanos.addEventListener('click', () => {
  const humanos = data.results.filter(personaje => personaje.species === 'Human' )
  printData(humanos)
})





const pagination = async (promesas) => {
  const result = await promesas
nextPage.addEventListener('click', () => {
  pagina += 1;
  getData();
})
previusPage.addEventListener('click', () => {
  pagina -= 1;
  getData();
})
lastPage.addEventListener('click', () =>{
  if(pagina <= result.info.pages){
      pagina = result.info.pages
      getData()
      console.log()
  }
})
firstPage.addEventListener('click', () =>{
  if(pagina >= 2){
      pagina = 1
      getData(result.info.pages)
  }
})
}

const updatePagination = () => {
  if(pagina <= 1){
    previusPage.disabled = true;
    firstPage.disabled = true;
  }else{
    previusPage.disabled = false;
    firstPage.disabled = false;
  }
  if(pagina == total){
    nextPage.disabled = true;
    lastPage.disabled = true;
  }else{
    nextPage.disabled = false;
    lastPage.disabled = false;
  }
    
}









$( document ).ready(function(){
  $(".dropdown-trigger").dropdown();
  pagination(getData());
})

