// 1 Sélection des éléments HTML avec document.querySelector et stockés dans les variables 
let emailConteneur = document.querySelector('#emailLog'); // Sélection de l'élément HTML avec ID "emailLog" et stocke dans variable "emailConteneur"
let pswdConteneur = document.querySelector('#passwordLog'); // Sélection de l'élément HTML avec ID "passwordLog" et  stocke dans variable "pswdConteneur"
let errorMessage = document.querySelector(".error-connection"); // Sélection de l'élément HTML classe "error-connection" et  stocke  dans variable "errorMessage"

//2 La fonction connection() est appelée
function connection(){ // Appel de la fonction "connection" quand événement se produit

//3 On vérifie si les champs email et psw sont vides, si oui, affiche message d’erreur dans l’élément avec la classe et quitte la fonction
    if (emailConteneur.value ==="" || pswdConteneur.value === ""){     // On vérifie si les champs e-mail et mot de passe sont vides
        errorMessage.textContent = "Les champs e-mail et mot de passe sont manquants" // Si l'un des champs est vide alors affiche texte de "errorMessage" avec un message d'erreur et quittez la fonction
        return
    }
// 4 Requête HTTP POST effectuée vers l’URL avec les data email et pswd (en-tete indiquent qu’on est en format JSON)
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
// 5 Traitement de la réponse : promesses .then et .catch used de manière asynchrone (garantit une exécution ordonée des opé)
//5 BIS Rep est traitée dans la 1ère .then si rep OK, les data JSON sont renvoyées. Sinon un erreur est générée avec un message 
.then(function(response) {     // Traitement de la réponse de la requête
        
    if(response.ok) {         // Si la réponse est OK, renvoyez les données JSON
        return response.json();
    }else{              // Sinon, on génère une erreur avec un message personnalisé
        throw new Error("Nom d'utilisateur·rice ou mot de passe incorrect");
    }
})
//6 Stockage du token :Si rép OK, la 2ème.then stocke le token et l’ID user dans le sessionStorage  => pour stocker temporairement des data sensibles tq token et ID user , reste dsipo pdt la session de user
     //window.location.replace("index.html"); redirige evrs page accueil si connexion réussie 
.then(function(data) {      // Traitement des données renvoyées par le serveur
    sessionStorage.setItem("token", data.token);         // pour les deux lignes on stocke le token et l'ID de l'utilisateur dans la session
    sessionStorage.setItem("userId", data.userId);  // Mecanisme de stockage --> DUREE DE VIE : only pendant la session du navigateur, les data stockées dans l'onglet sont effacées une fois fermeture
    window.location.replace("index.html");         // Là on redirige l'utilisateur vers "index.html"
})
//7 Gestion des erreurs potentielles de requête avec méthode .catch:Si erreur produit, affiche message dans l’élément de classe .error-connection
.catch(function(err){     // Gestion des erreurs de la requête
    errorMessage.textContent = "Nom d'utilisateur·rice ou mot de passe incorrect"  // le texte de "errorMessage" est défini avec un message d'erreur
});

//8 Nettoyage après Soumission :Fonction clearAfterSubmit() appelée pour erffacer champs email et pswd après la soumission
clearAfterSubmit();     // Ici on appelle la fonction "clearAfterSubmit" pour effacer les champs après la soumission

}
// 9 Ajout d’écouteur d’event au bouton soumission de connexion (submitLog) pour déclencher la fonction connection lors d’un clic

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