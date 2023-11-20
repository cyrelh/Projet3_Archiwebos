
/////////////////////////////////////////////////////////////////////////////////////////////////
/*Création dynamique des galeries pour la homepage*/
////////////////////////////////////////////////////////////////////////////////////////////////

let boutons;
let travaux;

function affichageProjets(){ // *1/ Utilisation de la fonction affichageProjets()   Fonction pour afficher les projets dynamiquement
    fetch("http://localhost:5678/api/works") // *2/Appel à l’API : fonction fetch() utilisée pour envoyer une requête HTTP GET àl'URL de l'API pour récupérer des informations sur les projets depuis l'API
    //*Cette fonction renvoie une promesse qui résout la réponse de la requête HTTP    
    .then(function(response) {  // *3 Traitement de la réponse : 1ère méthode .then intervient après l’appel à fetch() pour traiter la réponse de la requête HTTP... 
            if(response.ok) { //  *Si réponse est OK (statut HTTP 200), la promesse est résolue
                return response.json();  // *alors elle convertit les données de la réponse en format JSON
            }
        })
        
        .then(function(value){ // *4 Traitement des données récupérées: 2ème .then intervient après la réso de la 1ère promesse, traite les data JSON récupérées           
            const galerie = document.querySelector(".gallery"); // *Sélectionne l'élément avec la classe "gallery"

            value.forEach((work) => { // *méthode .forEach utilisée pour itérer sur chaque projet dans la liste value
// *Pour chaque projet, crée dynamiquement les éléments  HTML de la galerie pour afficher l’image et le titre chaque projet
                let conteneur = document.createElement("figure"); // Crée un élément figure pour le projet
                let elementPic = document.createElement("img"); // Crée un élément image pour la photo du projet
                let elementText = document.createElement("figcaption"); // Crée un élément de légende pour le titre du projet
// *5 Attribution aux éléments créés tels que l’ID du projet, ID de catégorie qui seront utilisés plus tard pour le filtrage
                elementPic.src = work.imageUrl; // Définit l'URL de l'image du projet
                elementText.innerHTML = work.title; // Définit le titre du projet
                conteneur.setAttribute("data-id", work.categoryId); // Attribut un attribut "data-id" avec l'ID de catégorie
                conteneur.setAttribute("id", work.id); // Attribut un ID au projet
                conteneur.classList.add("projets"); // Ajoute la classe "projets" à l'élément figure
                elementPic.classList.add("img-projets"); // Ajoute la classe "img-projets" à l'élément image
// *6 Ajout des éléments à la galerie : ajout des éléments à la classe .gallery dans le DOM
                galerie.appendChild(conteneur); // Ajoute l'élément figure à la galerie
                conteneur.appendChild(elementPic); // Ajoute l'élément image à l'élément figure
                conteneur.appendChild(elementText); // Ajoute l'élément de légende à l'élément figure
            });
        })
// *7 méthode .catch utilisée pour gérer les erreurs potentielles à n’importe quelle étape de la chaine
        .catch(function(error){         // Gère les erreurs potentielles
            alert ("Erreur dans la création dynamique de la galerie");
        })
    }
// CONCLUSION :  on a récupéré dynamiquement des travaux s’affichant depuis le backend et on les a ajoutés à la galerie de manière asynchrone

//affichageProjets(); // Appelle la fonction pour afficher les projets

/////////////////////////////////////////////////////////////////////////////////////////////////
/*Création dynamique des galeries pour la Fenetre MODALE*/
////////////////////////////////////////////////////////////////////////////////////////////////

//1 Sélectionne élément HTML qui représente la galerie principale
const galerie = document.querySelector(".gallery"); // Sélectionne l'élément avec la classe "gallery"

//2 Utilisation de la fonction affichageProjetsModale()
function affichageProjetsModale() { // // Cette fonction affiche les projets dans une fenêtre modale

//3 Appel à l’API : fonction fetch() utilisée pour envoyer une requête HTTP GET à l’URL de l’API
//Cette fonction renvoie une promesse qui résout la réponse de la requête HTTP
//Pour récupérer des données sur les projets depuis le backend

    fetch("http://localhost:5678/api/works") // Effectue une requête HTTP GET pour récupérer des informations sur les projets depuis l'API

// 4 Traitement de la réponse : 
//1ère méthode .then intervient après l’appel à fetch() pour gérer la réponse de la requête HTTP
//Si réponse est OK (statut HTTP 200), la promesse est résolue, réponse est convertie en format JSON (response,json())

    .then(function(response) {     // on utilise la méthode .then pour traiter la réponse de la requête
        if(response.ok) { //  Si la réponse est "ok" = requet reussie 
            return response.json(); // alors les données de la réponse sont converties en format JSON
        }
    })

    // .then(function(value){

    //     value.forEach((work) => { // Parcours les informations sur les projets et crée des éléments pour chaque projet
            
    //     });
    // })
//5 Traitement des données récupérées: 2ème .then intervient après la résolu de la promesse, traite les data JSON récupérées
// Cette deuxième promesse (then) est utilisée pour créer les éléments nécessaires à la galerie modale

    .then(function(value){ //Une fois les données obtenues, le code parcourt chaque projet (dans la variable value)
        value.forEach((work) => { // à l'aide d'une boucle forEach 
            //pour chaque projet, des éléments HTML sont créés de manière dynamique pour afficher
            
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
           
// 6 Chaque projet est associé à un conteneur modal qui inclut une image, une icône de flèche, une icône de poubelle (pour la suppression du projet), et une légende. 
//Ces éléments sont ajoutés à la galerie modale.

            let projets = work; // Crée une variable "projets" pour stocker les données du projet en cours
            let galerieModale = document.querySelector(".gallery-modale"); // Sélectionne l'élément HTML avec la classe "gallery-modale"
            let conteneurModale = document.createElement("figure"); // Crée un élément de type "figure" pour afficher un projet
            let elementPicModale = document.createElement("img"); // Crée un élément "img" pour afficher l'image du projet modal
            let arrow = document.createElement("i"); // Crée un élément "i" pour afficher une icône de flèche
            let trash = document.createElement("i"); // Crée un élément "i" pour afficher une icône de poubelle (pour la suppression du projet)
            let elementTextModale = document.createElement("figcaption"); // Crée un élément "figcaption" pour afficher le texte (légende) du projet modal

            elementPicModale.src = work.imageUrl; // Définit l'URL de l'image du projet
            trash.classList.add("fa-solid", "fa-trash-can", "icon");   // Ajoute des classes aux éléments HTML pour le style
            conteneurModale.setAttribute("id", work.id);  // Attribut un ID à l'élément de conteneur du projet modal
            trash.setAttribute("id", work.id);  // Attribut un ID à l'icône de poubelle du projet modal
            conteneurModale.setAttribute("data-id", work.categoryId);// Attribut un attribut "data-id" à l'élément de conteneurModale en utilisant l'ID de catégorie du projet modal
            // Ajoute des classes aux éléments pour le style
            elementPicModale.classList.add("img-projets", "img-projets-modale");
            conteneurModale.classList.add("projets-modale");
            
            // Ajoute les éléments à la galerie modale
            galerieModale.appendChild(conteneurModale); // Ajoute le conteneur du projet modal à la galerie modale
            conteneurModale.appendChild(elementPicModale); // Ajoute l'image du projet modal au conteneur
            conteneurModale.appendChild(arrow); // Ajoute l'icône de flèche au conteneur
            conteneurModale.appendChild(trash); // Ajoute l'icône de poubelle au conteneur
            conteneurModale.appendChild(elementTextModale); // Ajoute le texte du projet modal au conteneur

 /////////////////////////////////////////////////////////////////////////////////////////////////
 //  ********** Suppression des travaux **********
/////////////////////////////////////////////////////////////////////////////////////////////////

//1 Dans la fonction deleteProjet(event), Quand icone poubelle est cliquée -->  elle trouve élément figure, le supprime visuellement des galeries principales + galerie modale

    trash.addEventListener('click', (event) => deleteProjet(event));   // Ajoute un événement de clic pour la suppression du projet

    const token = sessionStorage.getItem("token"); // Récupère le jeton de session stocké dans le sessionStorage
    const idProject = projets.id; // récupère l'ID du projet modal qu'on souhaite supprimer

    function deleteProjet(event) { // Fonction appelée pour gérer la suppression du projet modal
        let figure = event.target.closest('figure') // Trouve l'élément figure le plus proche du bouton de suppression qu'on a cliqué
        figure.remove(); //Puis Supprime l'élément figure du projet modal de l'affichage

        let figureId = figure.id;  // Ensuite, la fonction récupère l'ID du projet modal qu'on vient de supprimer.

        let arrayGalerie = document.querySelectorAll('.gallery figure'); // Sélectionne tous les éléments figure dans la galerie
        let deleteWork = Object.values(arrayGalerie).filter(projet => projet.id === figureId) 
        //En utilisant l'ID du projet modal supprimé, elle filtre et trouve l'élément "figure" correspondant dans la galerie principale
        deleteWork[0].remove(); // puis le supprime de cette galerie

// 2 Puis envoie une requête HTTP DELETE à l’API pour supprimer définitivement le projet du serveur
        fetch(`http://localhost:5678/api/works/${idProject}`, { // Effectue une requête HTTP DELETE pour supprimer le projet du serveur
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Inclut le jeton de session dans les en-têtes pour l'authentification
            }
        })

        .catch(function(error) { // Gère les erreurs potentielles lors de la suppression
        });         // En cas d'erreur, aucune action n'est entreprise

    }

       })
    })
//3 La promesse .then suivante met à jour la variable travaux en sélectionnant tous les éléments de classe « projets »

    .then(() => {
        travaux = document.querySelectorAll(".projets"); // Sélectionne tous les éléments ayant la classe "projets" et les stocke dans la variable "travaux"
    })

//4 La .catch gère les erreurs potentielles lors de la création galerie modale avec message alerte  personnalisé 
    .catch(function(error){
        alert('Erreur dans la création de la galerie modale') // Gère les erreurs potentielles en affichant une alerte
    });
}

//5 La fonction principale affichageProjets Modale appelée pour déclencher le processus d’affichage des projets dans la fenêtre modale en faisant appel à l’API  
//(CA GARANTIT QUE GALERIE SOIT MIS A JOUR AVEC PROJETS LES + RECENTS AU CHARGEMENT PAGE)

affichageProjetsModale(); // Appel la fonction pour afficher les projets modaux

/////////////////////////////////////////////////////////////////////////////////////////////////
/*Création dynamique des boutons filtres*/
////////////////////////////////////////////////////////////////////////////////////////////////

fetch("http://localhost:5678/api/categories") //1 Requête HTTP GET pour les catégories: La fonction commence par effectuer une requête HTTP GET à URL pour récupérer les catégories depuis l'API

//2 Traitement de la réponse: La 1ère méthode .then vérifie si la réponse de la requête est OK. Si c'est le cas, elle convertit les données de la réponse en format JSON
    .then(function(response){ //utilisons la méthode .then pour traiter la réponse de la requête
        if(response.ok){ //Si la réponse est "ok" (c'est-à-dire si la requête a réussi)
            return response.json(); // alors elle convertit les données de la réponse en format JSON
        }
    })
//3 Ajout du bouton "Tous": Une fois les données récupérées avec succès, la deuxième then ajoute un nouvel objet représentant le bouton "Tous" au début du tableau des catégories.
    .then((data) => {     // Une fois les données récupérées avec succès, on ajoute un nouvel objet 
        data.unshift({ // Ici l'objet c'est un bouton "Tous" pour afficher tous les projets et il est inséré en première position du tableau des catégories
            id: 0,
            name: 'Tous'
        })
//4 Création dynamique des boutons de filtre: La fonction utilise  boucle forEach pour parcourir les catégories de projets et crée dynamiquement des boutons pour chacune.

        data.forEach((key) => {         // Parcours les catégories de projets et crée des boutons dynamiques pour chacune

            let filtres = document.querySelector("#filters"); // Sélectionne l'élément HTML avec l'ID "filters"
            
            let filtresBoutons = document.createElement("button"); // Crée un élément de bouton
            filtresBoutons.textContent = key.name; // Définit le texte du bouton
            filtresBoutons.setAttribute("data-id", key.id); // Attribut un attribut "data-id" avec l'ID de catégorie
            filtresBoutons.classList.add("categorie"); // Ajoute la classe "categorie" au bouton
            
            //4 BIS Ces boutons sont ensuite ajoutés au conteneur avec l'ID "filters".
            filtres.appendChild(filtresBoutons); // Ajoute le bouton au conteneur
        })
    })

    //5 Gestion des interactions des boutons: La 3ème .then gère les interactions des boutons de filtre.
    .then(()=> {     // Une fois les boutons créés, gère les interactions et le filtrage
        boutons = document.querySelectorAll(".categorie"); // Sélectionne tous les boutons de catégorie
    //5 BIS  Elle ajoute une classe "selected" au premier bouton et ajoute des écouteurs d'événements de clic à chaque bouton pour gérer la sélection.
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
//6 Filtrage des projets: La fonction utilise des écouteurs d'événements de clic sur chaque bouton pour filtrer les projets en fonction de la catégorie sélectionnée. 
        boutons.forEach((bouton) => { //boucle forEach parcourt tous les boutons de catégorie (stockés dans la variable boutons)
            bouton.addEventListener("click", (event) => { // Lorsqu'un bouton est cliqué, la fonction anonyme est exécutée
                event.preventDefault(); //la page ne sera pas rechargée lorsque l'utilisateur clique sur un bouton

// 6 BIS Elle utilise la propriété dataset.id pour récupérer l'ID de catégorie du bouton sur lequel l'utilisateur a cliqué, 
                let filtreBtn = event.target.dataset.id; // On extrait l'ID de catégorie du bouton sur lequel l'utilisateur a cliqué. Cet ID est stocké dans la variable filtreBtn
// 6 TER //puis parcourt tous les projets pour les afficher ou les masquer en fonction de la correspondance des ID de catégorie.
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
//7 Gestion des erreurs: En cas d'erreur lors du processus, la fonction utilise la méthode catch pour afficher une alerte
    .catch(function(error){     // Gère les erreurs potentielles
        alert('Erreur dans la la création dynamique des filtres');
    })



// // ******************************************************************************
/*Suite au login validé --> en mode édition (homepage edit)*/
// // ******************************************************************************

// 1 Vérification du Token de Session: On vérifie si token de session est présent dans le sessionStorage. La présence d'un token indique que l'utilisateur est connecté.
// On sélectionne tous les éléments classe "mode-edition" et on les affiche en définissant leur style "display" sur "flex". 
//Cela met la page en mode édition, où l'utilisateur peut modifier certains éléments.

//Si token session présent, alors l'user est connecté - alors page passe en "mode édition" donc user peut modifier quelque chose sur la page
if(sessionStorage.token !== null) { // Si token de session (preuve que l'user est connecté à la page) est présent
    let modeEdition = document.querySelectorAll(".mode-edition"); // Sélectionne tous les éléments avec la classe "mode-edition"
    modeEdition.forEach((edition) => {
        edition.style.display = "flex"; // Affiche les éléments en mode édition en définissant leur style "display" sur "flex"
    })

// 2 Gestion de l'Interface en Mode Édition: 
//Certains éléments tels que les boutons de filtres sont masqués, et la marge de l'élément avec la classe "div-projets" est modifiée pour un meilleur affichage en mode édition.
    document.querySelector(".filters-btns").style.display = "none"; // On masque avec none les élements boutons de filtres avec la classe "filter-btns"
    document.querySelector(".div-projets").style.margin = "0 0 90px 0"; // Modifie la marge de l'élément avec la classe "div-projets"

//3 Fonction de Déconnexion: Une fonction logout est créée pour permettre à l'utilisateur de se déconnecter. 
    function logout() { //On crée une fonction "logout" qui permet à l'utilisateur de se déconnecter
        sessionStorage.clear(); // Lorsqu'il clique sur le bouton de déconnexion, la fonction efface le token de session
        window.location.href = "index.html"; //puis redirige l'utilisateur vers la page d'accueil
    }

    document.querySelector(".login-button").style.display = "none"; //On cache le bouton de connexion 
    let logoutButton = document.querySelector(".logout-button"); //et on affiche le bouton de déconnexion
    logoutButton.style.display="block";
// 3 BIS Quand le bouton de déconnexion est cliqué, cette fonction efface le token de session et redirige l'utilisateur vers la page d'accueil
    logoutButton.addEventListener('click', () => { 
        logout(); // on crée événement pour permettre à l'utilisateur de se déconnecter en cliquant sur le bouton
    });
} 
// 4 Gestion de l'Interface si Non Connecté: Si aucun token de session n'est présent, cela signifie que l'utilisateur n'est pas connecté. 
// Dans ce cas, les éléments "mode édition" sont masqués, le bouton de déconnexion est caché, le bouton de connexion est affiché, et les boutons de filtres sont visibles.

if (sessionStorage.token == null) { //Si le token de session n'est pas présent
    let modeEditionNone = document.querySelectorAll(".mode-edition");
    modeEditionNone.forEach((none) => { // ça signifie que l'utilisateur n'est pas connecté
        none.style.display = "none"; //Dans ce cas, on masque le "mode édition,"
    })
    document.querySelector(".logout-button").style.display = "none"; //on masque aussi le bouton de déconnexion
    document.querySelector(".login-button").style.display = "block";//on affiche le bouton de connexion 
    document.querySelector(".filters-btns").style.display = "flex"; //affiche les boutons de filtres
} // ça donne à l'utilisateur la possibilité de se connecter et de voir les projets 

// // *******************************************************************************************************************************************************
/**********************Ouverture au clic sur Modifier/ fermeture sur la cross ou en dehors de la FENETRE MODALE*************************************************/
// // ***********************************************************************************************************************************************************

// 1 Initialisation et Ouverture de la Fenêtre Modale : On initialise la variable modale à null.
// Lorsqu'un élément avec la classe "open" est cliqué, la fenêtre modale est affichée.
// La fonction closeModale est attachée à la modale, à la croix et à certains éléments à l'intérieur de la modale pour gérer la fermeture.

let modale = null; //On initialise une variable modale à null

document.querySelector('.open').addEventListener('click', (event) =>{ //On ajoute un écouteur d'événement de clic à "open". Lorsque cet élément est cliqué, la fonction anonyme est exécutée. Elle prend un objet "event" en argument, qui représente l'événement de clic
    event.preventDefault(); // On empêche le comportement par défaut de l'événement de clic, ce qui empêche par exemple le navigateur de recharger la page
    const target = document.querySelector('.modale'); //On sélectionne l'élément HTML avec la classe "modale" et on le stocke dans une variable appelée "target"
    target.style.display = "flex"; //On change le style de l'élément "target" pour le faire apparaître en utilisant la valeur "flex" (c'est-à-dire l'afficher)
    modale = target; //On affecte la valeur de "target" à la variable "modale". Maintenant, "modale" contient l'élément "target" qui est actuellement ouvert
    modale.addEventListener('click', closeModale); //On ajoute un écouteur d'événement de clic à "modale". Lorsque l'élément "modale" est cliqué, la fonction "closeModale" sera appelée
    let closeButton =  modale.querySelectorAll('.fa-xmark'); //On sélectionne tous les éléments avec la classe "close" qui se trouvent à l'intérieur de l'élément "modale" et on les stocke dans une variable "closeButton"

// 2 Fermeture de la Fenêtre Modale :Lorsqu'on clique sur la croix ou à l'extérieur de la modale, la fonction closeModale est appelée.

    //On ajoute un écouteur d'événement de clic à chaque élément "cross" dans la liste "closeButton". Lorsqu'un de ces éléments est cliqué, la fonction "closeModale" sera appelée
    closeButton.forEach((cross) => {
        cross.addEventListener('click', closeModale);
    })  
    modale.querySelector('.modale-conteneur-delete').addEventListener('click', stopPropagation); //On ajoute un écouteur d'événement de clic à l'élément "modale-conteneur-delete" à l'intérieur de l'élément "modale". Lorsque cet élément est cliqué, la fonction "stopPropagation" sera appelée
    modale.querySelector('.modale-conteneur-add').addEventListener('click', stopPropagation);

})

const closeModale = function(event) { //On déclare une fonction nommée "closeModale" qui prend un objet "event" en argument.
    if(modale === null) return //Si la variable "modale" est égale à "null", la fonction s'arrête ici.
    event.preventDefault(); // On empêche le comportement par défaut de l'événement de clic


//2 BIS Elle masque la fenêtre modale, supprime les écouteurs d'événements, et réinitialise certains éléments de la page.

    modale.style.display = "none"; //On change le style de l'élément "modale" pour le faire disparaître en utilisant la valeur "none" (c'est-à-dire le masquer)
    modale.removeEventListener('click', closeModale); //On supprime l'écouteur d'événement de clic de l'élément "modale" pour éviter que la fonction "closeModale" soit appelée à nouveau
    let closeButton = modale.querySelectorAll('.fa-xmark'); // On sélectionne tous les éléments avec la classe "close" qui se trouvent à l'intérieur de l'élément "modale" (qui est actuellement ouvert) et on les stocke dans la variable "closeButton"

    //On parcourt tous les éléments "cross" dans la liste "closeButton" (les éléments avec la classe "close" dans la modale) et on supprime l'écouteur d'événement de clic de chacun d'eux, en utilisant la fonction "closeModale"
    closeButton.forEach((cross) => {
        cross.removeEventListener('click', closeModale);    
    })  
    let deleteModale = document.querySelector('.modale-conteneur-delete'); //On sélectionne l'élément avec la classe "modale-conteneur-delete" et on le stocke dans une variable "deleteModale".
    let addModale = document.querySelector('.modale-conteneur-add'); //On sélectionne l'élément avec la classe "modale-conteneur-add" et on le stocke dans une variable "addModale".
    deleteModale.classList.remove('hide'); //On supprime la classe "hide" de l'élément "deleteModale", ce qui le fait apparaître
    addModale.classList.add('hide'); //On ajoute la classe "hide" à l'élément "addModale", ce qui le fait disparaître
    modale.querySelector('.modale-conteneur-delete').removeEventListener('click', stopPropagation); //On supprime l'écouteur d'événement de clic de l'élément "modale-conteneur-delete" pour la fonction "stopPropagation"
    modale.querySelector('.modale-conteneur-add').removeEventListener('click', stopPropagation); //On supprime également l'écouteur d'événement de clic de l'élément
    modale = null; //On réinitialise la variable "modale" en la définissant comme "null", indiquant que la modale est maintenant fermée

    //3 Appel Fonctions Utilitaires :
//stopPropagation empêche la propagation d'événements de clic vers les éléments parents.
//clearInputs effectue plusieurs opérations de nettoyage après la fermeture de la modale.

    clearInputs() //fonction pour effectuer des opérations de nettoyage, qui réinitialisent certains éléments de la page
}

const stopPropagation = function (event) { //empêche la propagation de l'événement de clic vers les éléments parents pour éviter que des clics sur des éléments à l'intérieur de la modale ne se propagent et déclenchent des actions non souhaitées à l'extérieur de la modale
    event.stopPropagation();
}



function clearInputs() { //fonction effectuant plusieurs opérations de nettoyage pour réinitialiser certains éléments de la page après la fermeture de la modale
        newTitle.value = ""; //réinitialise la valeur de l'élément avec l'ID "newTitle" à une chaîne vide, effaçant ainsi tout contenu saisi dans cet élément
        newProjet.value="";
        document.querySelector(".generique-conteneur").style.display = "flex"; //sert à réinitialiser le conteneur de la page pour qu'il soit de nouveau visible
        imgPreview.innerHTML="" //sert pour réinitialiser l'aperçu d'une image après la fermeture de la modale
        imgPreview.style.display = "none"; // sert pour masquer l'aperçu de l'image après la fermeture de la modale
        document.querySelector('.success').textContent = "" //utilisé pour afficher des messages de succès, réinitialise son contenu texte à une chaîne vide, effaçant tout message de succès précédemment affiché
        document.querySelector('.failure').textContent = "" // idem mais effaçant tout message d'échec précédemment affiché
}



// ******************************************************************************//
/************************** Fenêtre "ajout de projet" ***************************/
// ******************************************************************************//

let newProjet = document.querySelector('.add-img-input');  // input de fichier pour ajouter une image --> on sélectionne l'élément HTML avec la classe "add-img-input"  et stocke cet élément dans la variable newProjet 
let imgPreview = document.querySelector(".preview-projet"); //espace réservé pour prévisualiser une image --> on sélectionne un élément HTML avec la classe "preview-projet" et stocke cet élément dans la variable imgPreview
let slcCateg = document.querySelector(".categorie-input"); //un champ de sélection de catégorie --> on sélectionne un élément HTML qui a la classe "categorie-input" et le stocke dans la variable newCateg
let newTitle = document.querySelector(".title-input");//un champ de saisie pour le titre du projet --> on sélectionne un élément HTML qui a la classe "title-input" et le stocke dans la variable newTitle
let addBtn = document.querySelector(".add-button"); // bouton pour ajouter un projet --> on sélectionne un élément HTML avec la classe "add-button" et le stocke dans la variable addBtn.
slcCateg.value="1"; // définit la valeur par défaut du champ de sélection de catégorie (newCateg) à "1".

// ********** POUR gérer la transition entre deux vues ou fenêtres, l'une pour supprimer un projet et l'autre pour ajouter un projet **********

//1  écouteur d'événements est ajouté à élément HTMLde classe (.add)  addProjets. Lorsque l'utilisateur clique sur cet élément, la fonction est déclenchée
//masquant la fenêtre de suppression et affichant la fenêtre d'ajout.

// on sélectionne des éléments HTML avec des classes et ces éléments sont stockés dans les variables deleteModale, addModale, et addProjets
let deleteModale = document.querySelector('.modale-conteneur-delete');
let addModale= document.querySelector('.modale-conteneur-add');
let addProjets = document.querySelector('.add');

addProjets.addEventListener('click', (event) => { // écouteur d'événements au clic sur l'élément addProjets --> quand le user clique dessus ça déclenche la fonction de rappel avec objet "event
    event.preventDefault(event); //fonction qui empêche le comportement par défaut du clic
    deleteModale.classList.add('hide'); // on ajoute la classe CSS "hide" pour masquer l'élément deleteModale
    addModale.classList.remove('hide'); //on supprime la classe "hide" de l'élément addModale, ce qui permet de passer d'une fenêtre (ou vue) à l'autre
})

//2 . Gestion du Bouton de Retour représenté par l'icône de flèche gauche (retourArrow), est sélectionné. 
//Un écouteur d'événements est ajouté à cet élément, permettant de revenir à la vue de suppression lorsque l'utilisateur clique dessus.

let retourArrow = document.querySelector(".fa-arrow-left"); // flèche de retour ou de retour en arrière --> on sélectionne un élément HTML avec la classe "fa-arrow-left" 
retourArrow.addEventListener('click', (event) => { //Lorsque l'utilisateur clique sur cet élément flèche retour en arrière, la fonction de rappel est déclenchée
    event.preventDefault(); // empêche le comportement par défaut du clic
    deleteModale.classList.remove('hide'); //supprime la classe "hide" de l'élément deleteModale pour réafficher la fenêtre de suppression
    addModale.classList.add('hide'); //ajoute la classe "hide" à l'élément addModale pour masquer la fenêtre d'ajout
    clearInputs() //appelle la fonction clearInputs() pour réinitialiser les champs du formulaire
})

// ****************************************************************************************************//
/************************** Prévisualisation du file photo lors de l'upload ***************************/
// ****************************************************************************************************//

//1 gère la prévisualisation d'une image --> lorsqu'un utilisateur sélectionne un fichier à travers le champ newProjet.
newProjet.addEventListener('change', previewImg); //Lorsque l'utilisateur sélectionne un fichier à travers le champ newProjet, la fonction previewImg sera déclenchée


//2 La fonction previewImg est déclenchée lorsqu'un fichier est sélectionné dans le champ newProjet. 
//Elle vérifie si le fichier a une extension valide, puis crée une instance de FileReader --> permet de lire le contenu du fichier sous forme de DataURL

function previewImg() { //La fonction previewImg est déclenchée lorsqu'un fichier est sélectionné dans le champ newProjet

    let extension = /\.(jpe?g|png)$/i; //vérifie si le nom du fichier se termine par les extensions ".jpeg" ou ".jpg" ou ".png"

    if(this.files.length === 0 || !extension.test(this.files[0].name)) { // Si aucun fichier n'est sélectionné ou si le nom du fichier ne correspond pas à l'extension recherchée
        return;     // On quitte la fonction prématurément, car il n'y a pas de fichier valide à traiter
    }

    let file = this.files[0]; // On récupère le 1er fichier de la liste des fichiers sélectionnés (this.files)
    let fileRead = new FileReader();// On crée une instance de FileReader, qui nous permettra de lire le contenu du fichier
    fileRead.readAsDataURL(file);// On demande au FileReader de lire le contenu du fichier sous forme de data URL

// 3 On ajoute un ecouteur d'événement qui sera déclenché lorsque la lecture du fichier sera terminée
    fileRead.addEventListener('load', (event) => displayWork(event, file));
}

//4 La fonction displayWork est appelée lorsque la lecture du fichier est terminée. 


function displayWork(event, file) {  //fonction displayWork est appelée lorsque la lecture du fichier est terminé
    let previewWork = document.querySelector('.preview-projet'); // espace réservé pour prévisualiser une image --> on sélectionne l'élément HTML avec la classe "preview-projet"
    previewWork.style.display="flex" //change son style pour le faire apparaître en utilisant previewWork.style.display = "flex".

    let addWork = document.querySelector('.generique-conteneur') //  conteneur de formulaire --> la fonction sélectionne l'élément HTML avec la classe "generique-conteneur" 
    addWork.style.display = "none"; //change son style pour le masquer en utilisant "none"

//4 BIS Elle crée un élément <figure> et un élément <img> pour afficher la prévisualisation de l'image.
//Les éléments HTML nécessaires sont créés dynamiquement et ajoutés à la structure HTML existante pour rendre la prévisualisation visible.

    let figConteneur = document.createElement('figure'); //crée un nouvel élément HTML <figure> utilisé pour afficher une image ou une illustration
    figConteneur.classList.add('preview-conteneur'); // lui ajoute la classe CSS "preview-conteneur" 
    
    let figContent = document.createElement('img'); //fonction crée un élément HTML <img> pour afficher l'image prévisualisée
    figContent.src = event.target.result; //attribue à cet élément la source de l'image prévisualisée 
    figContent.classList.add('preview-img'); //lui ajoute la classe "preview-img" pour le style

    previewWork.appendChild(figConteneur); // pour afficher la prévisualisation de l'image --> la fonction ajoute l'élément <figure> créé (figConteneur) en tant qu'enfant de l'élément avec la classe "preview-projet" (previewWork)
    figConteneur.appendChild(figContent);//pour afficher l'image elle-même --> ajoute également l'élément <img> (figContent) en tant qu'enfant de l'élément <figure> (figConteneur) 
}


// ****************************************************************************************************//
/************************** Changement couleur bouton quand formulaire rempli ***************************/
// ****************************************************************************************************//

// 1 ON gère le changement de couleur du bouton d'ajout en fonction de la saisie de l'utilisateur dans le formulaire. 
//1 bis Trois éléments sont surveillés: newTitle (champ de saisie du titre), newProjet (champ de sélection de fichier), et slcCateg (champ de sélection de catégorie).
// 1ter Lorsque l'utilisateur interagit avec l'un de ces champs, la fonction colorButton est déclenchée.

newTitle.addEventListener('input', colorButton) // Lorsque l'utilisateur saisit quelque chose dans le champ du titre, déclenche la fonction colorButton
newProjet.addEventListener('input', colorButton)// Lorsque l'utilisateur interagit avec le champ du projet, déclenche la fonction colorButton
slcCateg.addEventListener('input', colorButton) // Lorsque l'utilisateur change la sélection de la catégorie, déclenche la fonction colorButton

//2 La fonction colorButton est déclenchée à chaque interaction avec l'un des champs surveillés. 
function colorButton() { // fonction pour la couleur du bouton, on vérifie si les conditons sont vérifiées  

//2 bis Si l'une des conditions n'est pas remplie (champ du titre vide, pas de prévisualisation d'image, ou catégorie non sélectionnée), le bouton d'ajout est désactivé

    if (!newTitle.value || !imgPreview.firstChild || !slcCateg.value) { // Si le champ du titre est vide OU s'il n'y a pas d'élément enfant dans imgPreview (pas de prévisualisation d'image) OU si aucune catégorie n'a été sélectionnée
       // le bouton d'ajout est désactivé
        addBtn.classList.remove("allowed");// Retire la classe "allowed" du bouton d'ajout
        addBtn.classList.add("not-allowed");     // Le bouton d'ajout est désactivé (not-allowed) car toutes les conditions ne sont pas remplies.
        return // SInon
    }
// 2 ter Si toutes les conditions sont remplies, le bouton d'ajout est activé (affichage en vert).
    if(newTitle.value != "" && imgPreview.firstChild && slcCateg.value != "") {  // Si le champ du titre a une valeur, s'il y a une prévisualisation d'image et si une catégorie a été sélectionnée
        //le bouton d'ajout est activé
        addBtn.classList.remove("not-allowed"); // Retire la classe "not-allowed" du bouton d'ajout
        addBtn.classList.add("allowed");// Ajoute la classe "allowed" au bouton d'ajout
    }
}

// ****************************************************************************************************//
/************************** Message d'erreur / ajout du projet*** ***************************/
// ****************************************************************************************************//
//1 La fonction addProject est déclenchée par le clic sur le bouton "Ajouter" et gère le processus d'ajout d'un projet.
addBtn.addEventListener("click", (event) => addProject(event)) // quand l'utilisateur clique sur le bouton "Ajouter", déclenche la fonction addProject

// 2 élément binaire est représenté par variable picToSend, qui contient le premier fichier image sélectionné par l'utilisateur 
//2 bis newProjet fait référence à l'élément <input> de type fichier où l'utilisateur sélectionne l'image.
//2 ter .files est une propriété de l'élément <input> de type fichier qui renvoie une liste des fichiers sélectionnés. 
// 2qu  [0] pour accéder au premier fichier de cette liste.


function addProject(event) { // on définit la fonction 
    event.preventDefault(); // empêche le comportement par défaut du formulaire lors de la soumission
    let errorMessage1 = document.querySelector('.failure'); // sélectionne l'élément affichant les messages d'erreur
    let errorMessage2 = document.querySelector('.failure'); // sélectionne l'élément affichant les messages d'erreur
    let successMessage = document.querySelector('.success'); // sélectionne l'élément affichant les messages de succès
    let tailleMax = 4*1024*1024; // taille maximale autorisée pour l'image (4 Mo)

    let picToSend = newProjet.files[0]; // on récupère le fichier image à envoyer

    if (newTitle.value === "" || !imgPreview.firstChild) { // Si le champ du titre est vide OU s'il n'y a pas de prévisualisation d'image
        errorMessage1.textContent = "Attention ! Veuillez remplir tous les champs requis"; // alors on affiche le message d'erreur pour indiquer à l'utilisateur ce qui ne va pas
        successMessage.textContent = ""; //Le message de succès est effacé pour s'assurer qu'aucun message de succès précédent ne reste affiché
        return //La fonction addProject est immédiatement terminée à ce stade, sans poursuivre le traitement ni envoyer les données au serveur
    }

    if (picToSend.size > tailleMax ) { // si la taille de l'image dépasse la limite
        errorMessage2.textContent = "Attention ! Votre fichier est trop volumineux (maximum 4 Mo)"; // alors on affiche le message d'erreur pour indiquer à l'utilisateur ce qui ne va pas
        successMessage.textContent = ""; //Le message de succès est effacé pour s'assurer qu'aucun message de succès précédent ne reste affiché
        return //La fonction addProject est immédiatement terminée à ce stade, sans poursuivre le traitement ni envoyer les données au serveur
    }

    colorButton(); // Appelle la fonction colorButton pour mettre à jour l'état du bouton.


//3 Ainsi, picToSend contient une représentation binaire du fichier image que l'utilisateur a choisi. 
//Vous utilisez ensuite cet objet File dans la construction d'un objet FormData pour l'envoyer dans le corps de la requête POST à l'API

    let formData = new FormData(); // Crée un objet FormData pour envoyer les données du formulaire
//3 BIS Sert à l'envoi de fichiers binaires (images) vers un serveur via une requête HTTP. 

    formData.append("image", newProjet.files[0]); // Ajoute le fichier image au formulaire
    formData.append("title", newTitle.value); // Ajoute le titre au formulaire
    formData.append("category", slcCateg.value); // Ajoute la catégorie sélectionnée au formulaire
    let token = sessionStorage.getItem('token') // Récupère le jeton d'authentification de la session

    fetch("http://localhost:5678/api/works", { // Effectue une requête HTTP POST vers l'URL
        method: "POST", // Utilise la méthode POST pour envoyer les données au serveur
        headers: {
            "Authorization": `Bearer ${token}` // Ajoute le jeton d'authentification dans les en-têtes de la requête
        },
        body: formData, // Utilise l'objet FormData (contenant les données du formulaire) comme corps de la requête pour envoyer des données au serveur
    })

//3 TER L'objet FormData permet d'encapsuler facilement les données du formulaire, y compris les fichiers binaires, et de les envoyer de manière appropriée dans le corps de la requête. 

    .then(response => { // Gère la réponse de la requête
        if (!response.ok) {
        throw new Error("Erreur de la requête"); // Si la réponse n'est pas OK (statut HTTP différent de 200), génère une erreur avec le message "Erreur de la requête"
        }
    })

    .then(function(data){ // Traite les données de la réponse en cas de succès
        const successMessage = document.querySelector(".success"); // on sélectionne l'élément HTML pour afficher un message de succès
        successMessage.textContent = 'Bravo ! Votre image a été ajoutée avec succès'; //contenu du message de succès pour informer l'utilisateur que l'image a été ajoutée avec succès

        document.querySelector('.gallery').innerHTML=""; // efface le contenu de l'élément HTML avec la classe "gallery"
        document.querySelector('.gallery-modale').innerHTML=""; // efface le contenu de l'élément HTML avec la classe "gallery-modale"

        affichageProjets(); // Appelle une fonction pour afficher les projets mis à jour
        affichageProjetsModale(); // Appelle une fonction pour afficher les projets dans la modale
        clearAfterSent(); // Appelle une fonction pour réinitialiser le formulaire après l'envoi
    })

    .catch(error => { // ça gère les erreurs qui se produisent pendant la requête
        console.error("Erreur", error); // ça affiche une erreur dans la console avec des informations sur l'erreur
        errorMessage1.textContent = 'Erreur lors de l\'ajout du projet'; //message d'erreur pour informer l'utilisateur qu'il y a eu une erreur lors de l'ajout du projet
        errorMessage2.textContent = 'Erreur lors de l\'ajout du projet'; //message d'erreur pour informer l'utilisateur qu'il y a eu une erreur lors de l'ajout du projet

    })
}

function clearAfterSent() { // Définition de la fonction clearAfterSent
        slcCateg.value = "1"; // Réinitialise la valeur de la catégorie
        newTitle.value = ""; // Réinitialise la valeur du titre
        newProjet.value=""; // Réinitialise la valeur du fichier image
        document.querySelector(".generique-conteneur").style.display = "flex"; // Réaffiche le conteneur générique
        imgPreview.innerHTML=""; // Efface la prévisualisation de l'image
        imgPreview.style.display = "none"; // Masque la prévisualisation de l'image
        addBtn.classList.remove('allowed'); // Retire la classe "allowed" du bouton
        addBtn.classList.add('not-allowed'); // Ajoute la classe "not-allowed" au bouton
}

newProjet.addEventListener('change', clearMessage); // Lorsque l'utilisateur sélectionne un fichier image, déclenche la fonction clearMessage
newTitle.addEventListener("keydown", clearMessage); // Lorsque l'utilisateur tape une touche dans le champ du titre, déclenche la fonction clearMessage

function clearMessage() { // Définition de la fonction clearMessage
    document.querySelector('.failure').textContent=""; // Efface le message d'erreur
    document.querySelector('.success').textContent="";  // Efface le message de succès
}