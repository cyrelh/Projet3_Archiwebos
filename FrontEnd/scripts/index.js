/////////////////////////////////////////////////////////////////////////////////////////////////
/*Création dynamique des galeries*/
////////////////////////////////////////////////////////////////////////////////////////////////

let boutons;
let travaux;

function affichageProjets(){
    fetch("http://localhost:5678/api/works")
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
        })
        
        .then(function(value){
            const galerie = document.querySelector(".gallery");

            value.forEach((travaux) => {
                let conteneur = document.createElement("figure");
                let elementPic = document.createElement("img");
                let elementText = document.createAttribute("figcaption");

                elementPic.src = travaux.imageUrl;
                elementText.innerHTML = travaux.title;
                conteneur.setAttribute("data-id", travaux.categoryId);
                conteneur.setAttribute("id", travaux.id);
                conteneur.classList.add("projets");
                elementPic.classList.add("img-projets");

                galerie.appendChild(conteneur);
                conteneur.appendChild(elementPic);
                conteneur.appendChild(elementText);
            });
        })

        .catch(function(error){
            alert ("Erreur dans la création dynamique de la galerie");
        })
    }

affichageProjets();