
const main = document.getElementsByTagName("main").item(0);
let mainProds = document.getElementById("mainProds");
const URLmain = "https://fakestoreapi.com/products/";
const ulMenu= document.getElementById("ulMenu");



function getData (cat){
  console.log("URL", URLmain + cat);
  
  const options = {"method":"GET"};//options es para especificar el tipo de método que queremos usar 
    fetch(URLmain + cat ,options) //este metodo regresa una promesa
    .then((response) => {
        console.log(response);
        response.json().then((res) =>{
          /* console.log(res.length);//por el length se muestra todo el arreglo de objetos 
           console.log(res[10].image) */ ; // en image puede ser cualquier propiedad del arreglo
           // como price, image, category..
createCards(res)//se llama a esta funcion que muestra los productos del arreglo en cards
           });
    })
    .catch((err) => {
        main.insertAdjacentHTML("beforeend",
          `<div class = "alert alert-danger" role="alert">
            ${err.message}
     </div>`);
 });//getData
}
 
 /*  función reutilizada de GetData para las categorías */
 function getCategories (){
  const options = {"method":"GET"};//options es para especificar el tipo de método que queremos usar 
    fetch(URLmain + "categories/",options) //este metodo regresa una promesa
    .then((response) => {
      response.json().then((res) =>{
          //console.log("categories:",res);
          res.forEach((cat) =>{
            
          ulMenu.insertAdjacentHTML("afterbegin", //replace para reemplazar caracteres extraños y codificarlos, como la ' de la categ women's clothing, no se recomienda por que se tendría que hacer con cada caracter que aparezca (en lugar dee so usar encoderi)
            `<li><a class="dropdown-item" style="cursor:pointer;" onclick="getData('category/${cat.replace("'", "%27")}');">${cat}</a></li>`);
          });

           });
    }).catch((err) => {
        main.insertAdjacentHTML("beforeend",
          `<div class = "alert alert-danger" role="alert">
            ${err.message}
     </div>`);
    });
}//getCategories

getCategories();
  getData("");
      
 
//ejercicio crear funcion que imprima las cards obtenidas de el json en formato array 
//para mostrar los 20 productos 
 function createCards (prods){
  //console.log(prods.length);
  mainProds.innerHTML="";
   prods.forEach((pro => {
      main.insertAdjacentHTML("beforeend",
            `<div class="card" style="width: 18rem;">
        <img src="${pro.image}" class="card-img-top" alt="${pro.title}">
        <div class="card-body">
          <h5 class="card-title">${pro.title}</h5>
          <p class="card-text">${pro.description}</p>
          <a href="#"  class="btn btn-primary btnInfo" data-id ="${pro.id}">Información</a>
          
        </div>
      </div>`
      );
   }));

   //aqui intenté hacer el modal pero no funcionó
   /* document.querySelectorAll(".btnInfo").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      console.log("Botón clickeado");
       const prodId = this.getAttribute("data-id");
      const producto = productos.find(p => p.id == prodId);
      if (producto) {
        document.getElementById("staticBackdropLabel").textContent = producto.title;
        document.getElementById("bodyPrice").textContent = `Precio: $${producto.price}`;
        const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
          modal.show();  
      }
    });
  });
}*/ 

        //getData();
}
//pediente: no muestra los productos por categorías, solo muestra la respuesta en consola, revisar por qué.