
/////////////////////////////////////////////////////////////////////////////////////////////////
/*Création dynamique des galeries pour la homepage*/
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

//affichageProjets(); // Appelle la fonction pour afficher les projets

/////////////////////////////////////////////////////////////////////////////////////////////////
/*Création dynamique des galeries pour la Fenetre MODALE*/
////////////////////////////////////////////////////////////////////////////////////////////////
const galerie = document.querySelector(".gallery"); // Sélectionne l'élément avec la classe "gallery"

function affichageProjetsModale() { // // Cette fonction affiche les projets dans une fenêtre modale
    fetch("http://localhost:5678/api/works") // Effectue une requête HTTP GET pour récupérer des informations sur les projets depuis l'API
    .then(function(response) {     // on utilise la méthode .then pour traiter la réponse de la requête
        if(response.ok) { //  Si la réponse est "ok" = requet reussie 
            return response.json(); // alors les données de la réponse sont converties en format JSON
        }
    })

    // .then(function(value){

    //     value.forEach((work) => { // Parcours les informations sur les projets et crée des éléments pour chaque projet
            
    //     });
    // })

    .then(function(value){ //Une fois les données obtenues, le code parcourt chaque projet (dans la variable value)
        value.forEach((work) => { // à l'aide d'une boucle forEach 
            //pour chaque projet, des éléments HTML sont créés de manière dynamique pour afficher
           
          /////////////////////////////////////////// 
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
           
           //////////////////////////////////////

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

    .then(() => {
        travaux = document.querySelectorAll(".projets"); // Sélectionne tous les éléments ayant la classe "projets" et les stocke dans la variable "travaux"
    })

    .catch(function(error){
        alert('Erreur dans la création de la galerie modale') // Gère les erreurs potentielles en affichant une alerte
    });
}

affichageProjetsModale(); // Appel la fonction pour afficher les projets modaux

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

// // *******************************************************************************************************************************************************
/**********************Ouverture au clic sur Modifier/ fermeture sur la cross ou en dehors de la FENETRE MODALE*************************************************/
// // ***********************************************************************************************************************************************************

let modale = null; //On initialise une variable modale à null

document.querySelector('.open').addEventListener('click', (event) =>{ //On ajoute un écouteur d'événement de clic à "open". Lorsque cet élément est cliqué, la fonction anonyme est exécutée. Elle prend un objet "event" en argument, qui représente l'événement de clic
    event.preventDefault(); // On empêche le comportement par défaut de l'événement de clic, ce qui empêche par exemple le navigateur de recharger la page
    const target = document.querySelector('.modale'); //On sélectionne l'élément HTML avec la classe "modale" et on le stocke dans une variable appelée "target"
    target.style.display = "flex"; //On change le style de l'élément "target" pour le faire apparaître en utilisant la valeur "flex" (c'est-à-dire l'afficher)
    modale = target; //On affecte la valeur de "target" à la variable "modale". Maintenant, "modale" contient l'élément "target" qui est actuellement ouvert
    modale.addEventListener('click', closeModale); //On ajoute un écouteur d'événement de clic à "modale". Lorsque l'élément "modale" est cliqué, la fonction "closeModale" sera appelée
    let closeButton =  modale.querySelectorAll('.fa-xmark'); //On sélectionne tous les éléments avec la classe "close" qui se trouvent à l'intérieur de l'élément "modale" et on les stocke dans une variable "closeButton"


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

// on sélectionne des éléments HTML avec des classes et ces éléments sont stockés dans les variables deleteModale, addModale, et addProjets
let deleteModale = document.querySelector('.modale-conteneur-delete');
let addModale= document.querySelector('.modale-conteneur-add');
let addProjets = document.querySelector('.add');

addProjets.addEventListener('click', (event) => { // écouteur d'événements au clic sur l'élément addProjets --> quand le user clique dessus ça déclenche la fonction de rappel avec objet "event
    event.preventDefault(event); //fonction qui empêche le comportement par défaut du clic
    deleteModale.classList.add('hide'); // on ajoute la classe CSS "hide" pour masquer l'élément deleteModale
    addModale.classList.remove('hide'); //on supprime la classe "hide" de l'élément addModale, ce qui permet de passer d'une fenêtre (ou vue) à l'autre
})

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

newProjet.addEventListener('change', previewImg); //Lorsque l'utilisateur sélectionne un fichier à travers le champ newProjet, la fonction previewImg sera déclenchée

function previewImg() { //La fonction previewImg est déclenchée lorsqu'un fichier est sélectionné dans le champ newProjet

    let extension = /\.(jpe?g|png)$/i; //vérifie si le nom du fichier se termine par les extensions ".jpeg" ou ".jpg" ou ".png"

    if(this.files.length === 0 || !extension.test(this.files[0].name)) { // Si aucun fichier n'est sélectionné ou si le nom du fichier ne correspond pas à l'extension recherchée
        return;     // On quitte la fonction prématurément, car il n'y a pas de fichier valide à traiter
    }

    let file = this.files[0]; // On récupère le 1er fichier de la liste des fichiers sélectionnés (this.files)
    let fileRead = new FileReader();// On crée une instance de FileReader, qui nous permettra de lire le contenu du fichier
    fileRead.readAsDataURL(file);// On demande au FileReader de lire le contenu du fichier sous forme de data URL
    fileRead.addEventListener('load', (event) => displayWork(event, file));// On ajoute un gestionnaire d'événement qui sera déclenché lorsque la lecture du fichier sera terminée
}// Lorsque la lecture est terminée, la fonction displayWork sera appelée avec les données du fichier (event) et le fichier lui-même (file)

function displayWork(event, file) {  //fonction displayWork est appelée lorsque la lecture du fichier est terminé
    let previewWork = document.querySelector('.preview-projet'); // espace réservé pour prévisualiser une image --> on sélectionne l'élément HTML avec la classe "preview-projet"
    previewWork.style.display="flex" //change son style pour le faire apparaître en utilisant previewWork.style.display = "flex".

    let addWork = document.querySelector('.generique-conteneur') //  conteneur de formulaire --> la fonction sélectionne l'élément HTML avec la classe "generique-conteneur" 
    addWork.style.display = "none"; //change son style pour le masquer en utilisant "none"

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

newTitle.addEventListener('input', colorButton) // Lorsque l'utilisateur saisit quelque chose dans le champ du titre, déclenche la fonction colorButton
newProjet.addEventListener('input', colorButton)// Lorsque l'utilisateur interagit avec le champ du projet, déclenche la fonction colorButton
slcCateg.addEventListener('input', colorButton) // Lorsque l'utilisateur change la sélection de la catégorie, déclenche la fonction colorButton

function colorButton() { // fonction pour la couleur du bouton, on vérifie si les conditons sont vérifiées  
    if (!newTitle.value || !imgPreview.firstChild || !slcCateg.value) { // Si le champ du titre est vide OU s'il n'y a pas d'élément enfant dans imgPreview (pas de prévisualisation d'image) OU si aucune catégorie n'a été sélectionnée
       // le bouton d'ajout est désactivé
        addBtn.classList.remove("allowed");// Retire la classe "allowed" du bouton d'ajout
        addBtn.classList.add("not-allowed");     // Le bouton d'ajout est désactivé (not-allowed) car toutes les conditions ne sont pas remplies.
        return // SInon
    }

    if(newTitle.value != "" && imgPreview.firstChild && slcCateg.value != "") {  // Si le champ du titre a une valeur, s'il y a une prévisualisation d'image et si une catégorie a été sélectionnée
        //le bouton d'ajout est activé
        addBtn.classList.remove("not-allowed"); // Retire la classe "not-allowed" du bouton d'ajout
        addBtn.classList.add("allowed");// Ajoute la classe "allowed" au bouton d'ajout
    }
}

// ****************************************************************************************************//
/************************** Message d'erreur / ajout du projet*** ***************************/
// ****************************************************************************************************//

addBtn.addEventListener("click", (event) => addProject(event)) // quand l'utilisateur clique sur le bouton "Ajouter", déclenche la fonction addProject

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

    let formData = new FormData(); // Crée un objet FormData pour envoyer les données du formulaire
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