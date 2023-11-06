/////////////////////////////////////////////////////////////////////////////////////////////////
/*Création dynamique des boutons filtres*/
////////////////////////////////////////////////////////////////////////////////////////////////

fetch("http://localhost:5678/api/categories") // On effectue une requête HTTP GET pour récupérer des catégories de projets depuis l'API

    .then(function(response){ //utilisons la méthode .then pour traiter la réponse de la requête
        if(response.ok){ //Si la réponse est "ok" (c'est-à-dire si la requête a réussi)
            return response.json(); // alors elle convertit les données de la réponse en format JSON
        }
    })

    .then((data) => {     // Une fois les données récupérées avec succès, on ajoute un nouvel objet 
        data.unshift({ // Ici l'objet c'est un bouton "Tous" pour afficher tous les projets et il est inséré en première position du tableau des catégories
            id: 0,
            name: 'Tous'
        })

        data.forEach((key) => {         // Parcours les catégories de projets et crée des boutons dynamiques pour chacune

            let filtres = document.querySelector("#filters"); // Sélectionne l'élément HTML avec l'ID "filters"
            
            let filtresBoutons = document.createElement("button"); // Crée un élément de bouton
            filtresBoutons.textContent = key.name; // Définit le texte du bouton
            filtresBoutons.setAttribute("data-id", key.id); // Attribut un attribut "data-id" avec l'ID de catégorie
            filtresBoutons.classList.add("categorie"); // Ajoute la classe "categorie" au bouton
            
            filtres.appendChild(filtresBoutons); // Ajoute le bouton au conteneur
        })
    })

    .then(()=> {     // Une fois les boutons créés, gère les interactions et le filtrage
        boutons = document.querySelectorAll(".categorie"); // Sélectionne tous les boutons de catégorie
        boutons[0].classList.add("selected");  // Ajoute la classe "selected" au premier bouton
        boutons.forEach((btnSelect) => { 
            btnSelect.addEventListener('click', () => { // Ajoute un écouteur d'évenement de clic pour chaque bouton
                boutons.forEach((autresBtn) => { //Parcours tous les boutons
                    if(autresBtn !== btnSelect) { // Si le bouton actuel n'est pas celui qui a été cliqué
                        autresBtn.classList.remove('selected'); // Enlève la classe "selected"
                    }
                });
                btnSelect.classList.add('selected'); // Ajoute la classe "selected" au bouton cliqué
            })
        })

        boutons.forEach((bouton) => { //boucle forEach parcourt tous les boutons de catégorie (stockés dans la variable boutons)
            bouton.addEventListener("click", (event) => { // Lorsqu'un bouton est cliqué, la fonction anonyme est exécutée
                event.preventDefault(); //la page ne sera pas rechargée lorsque l'utilisateur clique sur un bouton
                let filtreBtn = event.target.dataset.id; // On extrait l'ID de catégorie du bouton sur lequel l'utilisateur a cliqué. Cet ID est stocké dans la variable filtreBtn
                travaux.forEach((work) => { // Boucle forEach parcourt tous les éléments de travail (projets) stockés dans la variable travaux.
                    let filtreImg = work.dataset.id; //Pour chaque élément de travail, on extrait l'ID de catégorie de l'élément. Cet ID est stocké dans la variable filtreImg.
                    if(filtreBtn == 0) { //vérifie si le bouton "Tous" est sélectionné (ID de catégorie égal à 0)
                        work.style.display = "block" // Si c'est le cas, elle affiche le projet (élément de travail) en définissant style.display sur "block".
                    } else { 
                        if(filtreBtn === filtreImg) { //Si le bouton "Tous" n'est pas sélectionné

                            work.style.display = "block" // Si l'ID de catégorie du bouton est identique à l'ID de catégorie de l'élément de travail, le projet est affiché
                        } else {
                            work.style.display = "none" // Sinon (c'est-à-dire si les IDs ne correspondent pas), le projet est masqué

                        }
                    }
                })
            })

        })
    })

    .catch(function(error){     // Gère les erreurs potentielles
        alert('Erreur dans la la création dynamique des filtres');
    })

/////////////////////////////////////////////////////////////////////////////////////////////////
/*Création dynamique des galeries*/
////////////////////////////////////////////////////////////////////////////////////////////////

let boutons;
let travaux;

function affichageProjets(){ // Fonction pour afficher les projets dynamiquement
    fetch("http://localhost:5678/api/works")     // Effectue une requête HTTP GET pour récupérer des informations sur les projets depuis l'API
        .then(function(response) {  //utilisons la méthode .then pour traiter la réponse de la requête
            if(response.ok) { // Si la réponse est réussie
                return response.json();  // alors elle convertit les données de la réponse en format JSON
            }
        })
        
        .then(function(value){
            const galerie = document.querySelector(".gallery"); // Sélectionne l'élément avec la classe "gallery"

            value.forEach((work) => { // Parcours les informations sur les projets et crée des éléments pour chaque projet
                let conteneur = document.createElement("figure"); // Crée un élément figure pour le projet
                let elementPic = document.createElement("img"); // Crée un élément image pour la photo du projet
                let elementText = document.createElement("figcaption"); // Crée un élément de légende pour le titre du projet

                elementPic.src = work.imageUrl; // Définit l'URL de l'image du projet
                elementText.innerHTML = work.title; // Définit le titre du projet
                conteneur.setAttribute("data-id", work.categoryId); // Attribut un attribut "data-id" avec l'ID de catégorie
                conteneur.setAttribute("id", work.id); // Attribut un ID au projet
                conteneur.classList.add("projets"); // Ajoute la classe "projets" à l'élément figure
                elementPic.classList.add("img-projets"); // Ajoute la classe "img-projets" à l'élément image

                galerie.appendChild(conteneur); // Ajoute l'élément figure à la galerie
                conteneur.appendChild(elementPic); // Ajoute l'élément image à l'élément figure
                conteneur.appendChild(elementText); // Ajoute l'élément de légende à l'élément figure
            });
        })

        .catch(function(error){         // Gère les erreurs potentielles
            alert ("Erreur dans la création dynamique de la galerie");
        })
    }

affichageProjets(); // Appelle la fonction pour afficher les projets

function affichageProjetsModale() { // Fonction pour afficher les projets modaux
    fetch("http://localhost:5678/api/works") // Effectue une requête HTTP GET pour récupérer des informations sur les projets depuis l'API
    .then(function(response) { //utilisons la méthode .then pour traiter la réponse de la requête
        if(response.ok) {
            return response.json();
        }
    })
    .then(() => {
        travaux = document.querySelectorAll(".projets"); // Sélectionne tous les éléments ayant la classe "projets" et les stocke dans la variable "travaux"
    })

    .catch(function(error){
        alert('Erreur dans la création de la galerie modale') // Gère les erreurs potentielles en affichant une alerte
    });
}

affichageProjetsModale(); // Appel la fonction pour afficher les projets modaux


// // ******************************************************************************
/*Suite au login validé --> en mode édition (homepage edit)*/
// // ******************************************************************************

//Si token session présent, alors l'user est connecté - alors page passe en "mode édition" donc user peut modifier quelque chose sur la page
if(sessionStorage.token !== null) { // Si token de session (preuve que l'user est connecté à la page) est présent
    let modeEdition = document.querySelectorAll(".mode-edition"); // Sélectionne tous les éléments avec la classe "mode-edition"
    modeEdition.forEach((edition) => {
        edition.style.display = "flex"; // Affiche les éléments en mode édition en définissant leur style "display" sur "flex"
    })

    document.querySelector(".filters-btns").style.display = "none"; // On masque avec none les élements boutons de filtres avec la classe "filter-btns"
    document.querySelector(".div-projets").style.margin = "0 0 90px 0"; // Modifie la marge de l'élément avec la classe "div-projets"

    function logout() { //On crée une fonction "logout" qui permet à l'utilisateur de se déconnecter
        sessionStorage.clear(); // Lorsqu'il clique sur le bouton de déconnexion, la fonction efface le token de session
        window.location.href = "index.html"; //puis redirige l'utilisateur vers la page d'accueil
    }

    document.querySelector(".login-button").style.display = "none"; //On cache le bouton de connexion 
    let logoutButton = document.querySelector(".logout-button"); //et on affiche le bouton de déconnexion
    logoutButton.style.display="block";

    logoutButton.addEventListener('click', () => { 
        logout(); // on crée événement pour permettre à l'utilisateur de se déconnecter en cliquant sur le bouton
    });
} 

if (sessionStorage.token == null) { //Si le token de session n'est pas présent
    let modeEditionNone = document.querySelectorAll(".mode-edition");
    modeEditionNone.forEach((none) => { // ça signifie que l'utilisateur n'est pas connecté
        none.style.display = "none"; //Dans ce cas, on masque le "mode édition,"
    })

    document.querySelector(".logout-button").style.display = "none"; //on masque aussi le bouton de déconnexion
    document.querySelector(".login-button").style.display = "block";//on affiche le bouton de connexion 
    document.querySelector(".filters-btns").style.display = "flex"; //affiche les boutons de filtres
} // ça donne à l'utilisateur la possibilité de se connecter et de voir les projets 

// // ******************************************************************************
/**********************FENETRE MODALE*************************************************/
// // ******************************************************************************

let modale = null;

document.querySelector('.open').addEventListener('click', (event) =>{
    event.preventDefault();
    const target = document.querySelector('.modale'); 
    target.style.display = "flex";
    modale = target;
    modale.addEventListener('click', closeModale);
    let closeButton =  modale.querySelectorAll('.close');

    closeButton.forEach((cross) => {
        cross.addEventListener('click', closeModale);
    })  
    modale.querySelector('.modale-conteneur-delete').addEventListener('click', stopPropagation);
    modale.querySelector('.modale-conteneur-delete').addEventListener('click', stopPropagation);
})

const closeModale = function(event) {
    if(modale === null) return
    event.preventDefault();

    modale.style.display = "none";
    modale.removeEventListener('click', closeModale);
    let closeButton = modale.querySelectorAll('.close');

    closeButton.forEach((cross) => {
        cross.removeEventListener('click', closeModale);    
    })  

    let deleteModale = document.querySelector('.modale-conteneur-delete');
    let addModale = document.querySelector('.modale-conteneur-add');
    deleteModale.classList.remove('hide');
    addModale.classList.add('hide');
    modale.querySelector('.modale-conteneur-delete').removeEventListener('click', stopPropagation);
    modale.querySelector('.modale-conteneur-add').removeEventListener('click', stopPropagation);
    modale = null;

    clearInputs()
}

const stopPropagation = function (event) {
    event.stopPropagation();
}
  
function clearInputs() {
        nvTitle.value = "";
        nvProjet.value="";
        document.querySelector(".generique-conteneur").style.display = "flex";
        imgPreview.innerHTML=""
        imgPreview.style.display = "none";
        document.querySelector('.success').textContent = ""
        document.querySelector('.failure').textContent = ""
}