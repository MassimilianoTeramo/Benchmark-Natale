let urlGet = "https://striveschool-api.herokuapp.com/api/product/";
let list = []
let productDisplay = document.querySelector("#productDisplay")

let displayProduct = async () => {
    try {
        let response = await fetch(urlGet, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzRkNDUzMDRhNzAwMTUxNDhiNDQiLCJpYXQiOjE3MzU3Njk4NDYsImV4cCI6MTczNjk3OTQ0Nn0.IDisRV0qApCQIwq6uDfkZSLmuCfZFDlqqEP58ye5CmQ"
            }
        });
        if (!response.ok) {
            throw new error("Errore nel caricamento dati")
        }
        list = await response.json()
        console.log(list)

        for(let i=0; i<list.length; i++){
            let element = list[i]
           productDisplay.innerHTML +=
           `
           <div class="card cardProduct">
    <div class="col-12 col-md-12">       
  <img class="card-img-top img-fluid maxCard" src="${element.imageUrl}" alt="Card image cap">
  </div>
  <div class="card-body">
    <h5 class="card-title">${element.name}</h5>
    <p class="card-text">${element.description}</p>
  </div>
  <ul class="list-group list-group-flush brandList">
    <li class="list-group-item brand">${element.brand}</li>
    <li class="list-group-item">€ ${element.price}</li>
  </ul>
  <div class="card-body d-flex justify-content-between">
    <button type="button" class="btn btn-primary btnEdit" onclick="openEditModal('${element._id}')">Edit</button>
    <button type="button" class="btn btn-danger id="btnDelete" onclick="deleteProduct('${element._id}')">Delete</button>
  </div>
 
</div>
           `

        } 
        document.querySelectorAll('.btnEdit').forEach(btn => {
          btn.addEventListener('click', function() {
              const productId = this.getAttribute('data-product-id');
              console.log("ID prodotto cliccato:", productId);
              openEditModal(productId);
          });
      });
  }
    catch (error) {
        console.log(error);
    }
}
function openEditModal(productId) {
          console.log("Opening modal for product ID:", productId);
          
          // Trova il prodotto
          const product = list.find(p => p._id === productId);
          console.log("Product found:", product);
          
          if (product) {
              // Popola il form
              document.querySelector("#nomeProdottoED").value = product.name;
              document.querySelector("#desProdottoED").value = product.description;
              document.querySelector("#brandProdottoED").value = product.brand;
              document.querySelector("#imgProdottoED").value = product.imageUrl;
              document.querySelector("#prezzoProdottoED").value = product.price;
      
              // Salva l'ID nel pulsante di submit
        const submitBtn = document.querySelector("#submitEdit");
        submitBtn.setAttribute('data-product-id', productId);

        // Aggiungi il nuovo event listener
        document.querySelector("#submitEdit").addEventListener('click', function() {
          const idToEdit = this.getAttribute('data-product-id');
          console.log("Tentativo di modifica prodotto:", idToEdit);
          editProduct(idToEdit);
      });

             // Apri il modal
        const EditModal = new bootstrap.Modal(document.getElementById('modalEditBtn'));
        EditModal.show();
    } else {
        console.error("Prodotto non trovato con ID:", productId);
    }
      }

//funzione per modificare un prodotto
      async function editProduct(idP) {
        if(!idP) {   
            alert("ID prodotto non specificato", idP);
            return;
        }
    
    
        console.log("ID prodotto da modificare:", idP);
        let url = "https://striveschool-api.herokuapp.com/api/product/" + idP  
    
     let prodotti = {
                name: document.querySelector("#nomeProdottoED").value,
                description: document.querySelector("#desProdottoED").value,
                brand: document.querySelector("#brandProdottoED").value,
                imageUrl: document.querySelector("#imgProdottoED").value,
                price: document.querySelector("#prezzoProdottoED").value,
            }
    
            console.log("Dati da inviare:", prodotti);
    
            if (!prodotti.name || !prodotti.description || !prodotti.brand || !prodotti.imageUrl || !prodotti.price) {
                alert("Per favore, compila tutti i campi");
                return;
            }
        
            prodotti.price = Number(prodotti.price);
    
        try{
            let response = await fetch(url, {
     method: "PUT",
            headers:{
                "content-type": 'application/json; charset=UTF-8',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzRkNDUzMDRhNzAwMTUxNDhiNDQiLCJpYXQiOjE3MzU3Njk4NDYsImV4cCI6MTczNjk3OTQ0Nn0.IDisRV0qApCQIwq6uDfkZSLmuCfZFDlqqEP58ye5CmQ"
            },
            body: JSON.stringify(prodotti),
            });
    
            // Log della risposta
            const responseText = await response.text();
            console.log('Risposta del server:', responseText);
    
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Errore durante la modifica: ${response.status} : ${errorText}`);
            }
    
  
    alert("Prodotto modificato con successo");
    location.reload();
    
    } catch (error) {
    console.error("Error during edit:", error);
    alert("Errore durante la modifica: " + error.message);
    }
    }
    
document.addEventListener('DOMContentLoaded', function() {
  const addProdBtn = document.getElementById('addProd');
  addProdBtn.addEventListener('click', function() {
      const myModal = new bootstrap.Modal(document.getElementById('modalAddBtn'));
      myModal.show();
  });
});



displayProduct()