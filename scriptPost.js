
async function createObj(event) {
    event.preventDefault();
    let url = "https://striveschool-api.herokuapp.com/api/product/"

   let prodotti = {
        name: document.querySelector("#nomeProdotto").value,
        description: document.querySelector("#desProdotto").value,
        brand: document.querySelector("#brandProdotto").value,
        imageUrl: document.querySelector("#imgProdotto").value,
        price: document.querySelector("#prezzoProdotto").value,
    }

    if (!prodotti.name || !prodotti.description || !prodotti.brand || !prodotti.imageUrl || !prodotti.price) {
        alert("Per favore, compila tutti i campi");
        return;
    }

    prodotti.price = Number(prodotti.price);

    console.log('Dati inviati:', prodotti);

    try{
        let response = await fetch(url, {
        method: 'POST',
        headers: {
            "content-type": 'application/json; charset=UTF-8',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzRkNDUzMDRhNzAwMTUxNDhiNDQiLCJpYXQiOjE3MzQ0Nzg1MjQsImV4cCI6MTczNTY4ODEyNH0.8Tz3lNZANGdYv11It368XLfWSe5q0BmPkuteEAdgU6s"
        },

        body: JSON.stringify(prodotti),

    })

    //  log per debugging
    const responseText = await response.text();
    console.log('Risposta del server:', responseText);

    if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status} - ${responseText}`);
    }

    // Solo se la risposta è OK, proviamo a parsare come JSON
    const data = JSON.parse(responseText);
    console.log('Dati ricevuti:', data);

    document.querySelector("#productForm").reset();
    resetForm()
    alert("Prodotto creato con successo");
  



}  catch (error){
    alert ("errore"+error.message);
}
}

let addProd = document.querySelector("#submit");
addProd.addEventListener("click",createObj);

function resetForm(){
    let valoriForm = [
        "#nomeProdotto",
        "#desProdotto",
        "#brandProdotto",
        "#imgProdotto",
        "#prezzoProdotto"

    ]
    valoriForm.forEach(valore =>{
        document.querySelector(valoriForm).value = ""
    })
}


async function deleteProduct(idP){
    let url = "https://striveschool-api.herokuapp.com/api/product/"+idP

    try{
        let response = await fetch(url, {
 method: "DELETE",
        headers:{
            "content-type": 'application/json; charset=UTF-8',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzRkNDUzMDRhNzAwMTUxNDhiNDQiLCJpYXQiOjE3MzQ0Nzg1MjQsImV4cCI6MTczNTY4ODEyNH0.8Tz3lNZANGdYv11It368XLfWSe5q0BmPkuteEAdgU6s"
        }
        });

        if (!response.ok) {
            throw new Error(`Errore durante l'eliminazione: ${response.status} - ${response.statusText}`);
        }
        alert ("Prodotto eliminato con successo")
        location.reload();
       
    }catch (error){
        alert ("Errore durante l'eliminazione: " + error.message);
    }
}






