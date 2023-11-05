let emailConteneur = document.querySelector('#emailLog'); // Sélection de l'élément HTML avec ID "emailLog" et stocke dans variable "emailConteneur"
let pswdConteneur = document.querySelector('#passwordLog'); // Sélection de l'élément HTML avec ID "passwordLog" et  stocke dans variable "pswdConteneur"
let errorMessage = document.querySelector(".error-connection"); // Sélection de l'élément HTML classe "error-connection" et  stocke  dans variable "errorMessage"


function connection(){ // Appel de la fonction "connection" quand événement se produit
    if (emailConteneur.value ==="" || pswdConteneur.value === ""){     // On vérifie si les champs e-mail et mot de passe sont vides
        errorMessage.textContent = "Les champs e-mail et mot de passe sont manquants" // Si l'un des champs est vide alors affiche texte de "errorMessage" avec un message d'erreur et quittez la fonction
        return
    }

    // Envoie une requête POST au serveur avec les valeurs de l'e-mail et du mot de passe
    fetch ('http://localhost:5678/api/users/login', {
      	method: 'POST', //méthode POST pour envoyer les données d'authentification
      	headers: { // Définition des en-têtes pour indiquer que le contenu est au format JSON
            "Accept": 'application/json', // indique que nous acceptons une réponse au format JSON
            "Content-Type": 'application/json' //  indique que le contenu de la requête est au format JSON
        },
          body: JSON.stringify({ // Charge utile --> On convertit les données en format JSON pour le corps de la requête
            email: emailConteneur.value, // Valeur de l'e-mail
            password: pswdConteneur.value, // Valeur du mot de passe
        }), 
})

.then(function(response) {     // Traitement de la réponse de la requête
        
    if(response.ok) {         // Si la réponse est OK, renvoyez les données JSON
        return response.json();
    }else{              // Sinon, on génère une erreur avec un message personnalisé
        throw new Error("Nom d'utilisateur·rice ou mot de passe incorrect");
    }
})
.then(function(data) {      // Traitement des données renvoyées par le serveur
    sessionStorage.setItem("token", data.token);         // pour les deux lignes on stocke le token et l'ID de l'utilisateur dans la session
    sessionStorage.setItem("userId", data.userId); 
    window.location.replace("index.html");         // Là on redirige l'utilisateur vers "index.html"
})

.catch(function(err){     // Gestion des erreurs de la requête
    errorMessage.textContent = "Nom d'utilisateur·rice ou mot de passe incorrect"  // le texte de "errorMessage" est défini avec un message d'erreur
});

clearAfterSubmit();     // Ici on appelle la fonction "clearAfterSubmit" pour effacer les champs après la soumission

}

let loginForm = document.getElementById("submitLog"); // on définit l'élément HTML avec l'ID "submitLog" et stocke variable "loginForm"

loginForm.addEventListener("click", connection); // Ajoute un écouteur d'événements pour le clic sur le bouton "Se connecter"
//ça va déclencher la fonction "connection"

document.querySelectorAll('form').forEach(form => {  // tous les formulaires sur la page sont sélectionnés 
    form.addEventListener('submit', (event) => {     //ajout  écouteur d'événements 
        event.preventDefault(); //pour empêcher leur soumission par défaut
    });
});

function clearAfterSubmit() { // On définit fonction "clearAfterSubmit" pour effacer les champs email et mot de passe
    emailConteneur.value ="";
    pswdConteneur.value ="";
}