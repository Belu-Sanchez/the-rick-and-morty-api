
const root = document.getElementById('root')
const mujer = document.getElementById('mujer')
const hombre = document.getElementById('hombre')
const aliens = document.getElementById('aliens');
const humanos = document.getElementById('humanos');
const personajes = document.getElementById('personajes');

const getData = () => {
  const url = 'https://rickandmortyapi.com/api/character';
  fetch(url)
  .then(resp => resp.json())
  .then(json => { printData(json.results)
  data = json;
  })
  .catch(err => err);

}

let data = [];

const printData = (json) => {
  data = json
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






// const todosLosPersonajes = () => {
//   const todosOpcion = document.getElementsByClassName('todos');

//   for (let i = 0; i < todosOpcion.length; i++) {
//   const todosSelect = todosOpcion[i]
//       if(todosSelect.classList.contains('genero')){
//           console.log('hola')
//       }


// //     const todos = todos[i];
// //     if(todos.classList.contains('genero')){
// // //     todos.addEventListener('click', e => {
// // // console.log('genero')

// // //   })
//   }
    
// // }
// }
// todosLosPersonajes()









personajes.addEventListener('click', () =>{
  getData();
})




$( document ).ready(function(){
  $(".dropdown-trigger").dropdown();
  getData();
})

