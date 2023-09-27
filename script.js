var ajoutForm = document.getElementById("form");
var title = document.getElementById("form-title");
var mode = ""
var indexLivre = null
getData();

function getData() {
    var table = document.getElementById("tableBody");
    var livres = JSON.parse(localStorage.getItem("livreData"));
    if (livres && Array.isArray(livres)) {
        table.innerHTML = "";
        livres.forEach(function(item, index) {
            var row = document.createElement("tr");
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${item.titre}</td>
                <td>${item.auteur}</td>
                <td>${item.prix}</td>
                <td><button type="button" class="btn btn-primary" onclick="editLivre(${index})">Editer</button></td>
                <td><button type="button" class="btn btn-danger" onclick="deleteLivre(${index})">Supprimer</button></td>
            `;
            table.appendChild(row);
        });
    }
}
function deleteLivre(index) {
    var livres = JSON.parse(localStorage.getItem("livreData")) || [];
    var confirmDelete = window.confirm("Êtes-vous sûr(e) de vouloir supprimer ce livre ?");
    if (confirmDelete) {
        if (index >= 0 && index < livres.length) {
            livres.splice(index, 1);
            localStorage.setItem("livreData", JSON.stringify(livres));
            getData();
        }
    }
}
function editLivre(index) {
    mode = "edit"
    indexLivre = index
    ajoutForm.style.display = "block";
    title.innerHTML = "Editer livre";
    var livres = JSON.parse(localStorage.getItem("livreData"));
    document.getElementById("titre").value = livres[index].titre ;
    document.getElementById("auteur").value  = livres[index].auteur ;
    document.getElementById("prix").value = livres[index].prix ; 
}
function addLivre() {
    mode = "add"
    reset()
    ajoutForm.style.display = "block";
    title.innerHTML = "Ajouter un nouveau livre";
}
function reset() {
    document.getElementById("titre").value = "" ;
    document.getElementById("auteur").value  = "";
    document.getElementById("prix").value = ""; 
}
function valider() {
    var titreValue = document.getElementById("titre").value;
    var auteurValue = document.getElementById("auteur").value;
    var prixValue = document.getElementById("prix").value;
    var livresArray = JSON.parse(localStorage.getItem("livreData")) || [];

    var livre = {
        titre: titreValue,
        auteur: auteurValue,
        prix: prixValue
    };
    if (mode=="add") {
        livresArray.push(livre);
    }
    else {
        livresArray[indexLivre] = livre
    }
    localStorage.setItem("livreData", JSON.stringify(livresArray));
    ajoutForm.style.display = "none";
    getData();
}