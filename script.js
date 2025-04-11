
const main = document.getElementsByTagName("main").item(0);
const URLmain = "https://fakestoreapi.com/products/";


function getData (){
    fetch(URLmain) //este metodo regresa una promesa
    .then((response) => {
        console.log(response);
        response.json().then((res) =>{
          /* console.log(res.length);
           console.log(res[10].image) */ ; // en image puede ser cualquier propiedad del arreglo
           // como price, image, category..
createCards(res)
           });
    })
    .catch((err) => {
        main.insertAdjacentHTML("beforeend",
          `<div class = "alert alert-danger" role="alert">
            ${err.message}
     </div>`);
 });//getData
}
 getData();
 
//ejercicio crear funcion que imprima las cards obtenidas de el json en formato array 
//para mostrar los 20 productos 
 function createCards (prods){
    prods.forEach( pro => {
        main.insertAdjacentHTML("beforeend",
            `<div class="card" style="width: 18rem;">
        <img src="${pro.image}" class="card-img-top" alt="${pro.title}">
        <div class="card-body">
          <h5 class="card-title">${pro.title}</h5>
          <p class="card-text">${pro.description}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`
    );
        });
          }
        getData();
    