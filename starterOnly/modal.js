import {
    editNav,
    launchModal,
    closeModal,
    isValidInput,
    isValidBirth,
    isCitiesCheck,
    isValidCgu,
    getCheckedRadioValue
} from './functions.js'

//---------------------------------------------------------------------
// DOM Elements
//---------------------------------------------------------------------
    // btn
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelector(".close")
const btnSubmit = document.querySelector(".btn-submit")
    //input
const inputFirst = document.getElementById("first")
const inputLast = document.getElementById("last")
const inputEmail = document.getElementById("email")
const inputBirth = document.getElementById("birthdate")
const inputQuantity = document.getElementById("quantity")
const inputRadio = document.querySelectorAll("input[type='radio'")
const inputCgu = document.getElementById("checkbox1")
const inputNews = document.getElementById("checkbox2")
    //other
const formElem = document.querySelector("form[name='reserve'")    

//---------------------------------------------------------------------
// Constantes
//---------------------------------------------------------------------
// Objet contenant les messages d'erreur
const objMsg = {
    errName: "Doit comporter entre 2 et 31 caractères. Lettres (avec accents) et trait d'union sont acceptés",
    errEmail: "L'email semble invalide",
    errBirth: "La date semble incorrecte",
    errBirthYoung: "Vous devez être majeur pour participer",
    errQty: "Vous devez indiquer un chiffre entre 0 et 100",
    errCities: "Vous devez sélectionner une ville",
    errCgu: "Vous devez accepter les CGUs",
}
// Expression reguliere pour les tests
const rgxName = /^[a-zA-ZÀ-ÖØ-öøç]{2,15}[-]{0,1}[a-zA-ZÀ-ÖØ-öøç]{0,15}$/ // Nom et Prenom
const rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ //Email
const rgxQty = /^[0-9]{1,2}$/ // Quantite
//---------------------------------------------------------------------
// Events principaux
//---------------------------------------------------------------------

// launch editnav event
document.getElementById("burger").addEventListener("click", editNav)

// launch and close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtnClose.addEventListener("click", closeModal)

//---------------------------------------------------------------------
// Validation du formulaire
//---------------------------------------------------------------------

// event input validation form
inputFirst.addEventListener("input",() => isValidInput(inputFirst, objMsg.errName, rgxName))
inputLast.addEventListener("input",() => isValidInput(inputLast, objMsg.errName, rgxName))
inputEmail.addEventListener("input",() => isValidInput(inputEmail, objMsg.errEmail, rgxEmail))
inputBirth.addEventListener("input",() => isValidBirth(inputBirth, objMsg))
inputQuantity.addEventListener("input",() => isValidInput(inputQuantity, objMsg.errQty, rgxQty))
inputRadio.forEach((el) => el.addEventListener("change", () => isCitiesCheck(el,objMsg.errCities, inputRadio)))
inputCgu.addEventListener("change", () => isValidCgu(inputCgu, objMsg.errCgu))

/**
 * validate()
 * Indique si le formulaire passe la validation ou non
 * @returns {boolean} => true = validation OK, false = validation NOT OK
 */
function validate(){      
    let isValidFirstR = isValidInput(inputFirst, objMsg.errName, rgxName)
    let isValidLastR = isValidInput(inputLast, objMsg.errName, rgxName)
    let isValidEmailR = isValidInput(inputEmail, objMsg.errEmail, rgxEmail)
    let isValidBirthR = isValidBirth(inputBirth, objMsg)
    let isValidQuantityR = isValidInput(inputQuantity, objMsg.errQty, rgxQty)
    //let isValidCitieR = getCheckedRadioValue(inputRadio,objMsg.errCities) //WTF undefined
    let isValidCguR = isValidCgu(inputCgu, objMsg.errCgu)
    //console.log("--Debug 'isValidCitieR' at validate() => "+isValidCitieR)

    //if(isValidFirstR && isValidLastR && isValidEmailR && isValidBirthR && isValidQuantityR && isValidCitieR && isValidCguR){
    if(isValidFirstR && isValidLastR && isValidEmailR && isValidBirthR && isValidQuantityR && isValidCguR){
      return true
    }
    return false
}



// submit form event
btnSubmit.addEventListener("click",(e)=>{
    e.preventDefault()    
    if(validate()){
        //console.log("--Debug validate() TRUE")
        //alors on peut valider le formulaire
        // on récupère les valeur pour le traitement futur.
        
        // on affiche l'information au client sur la validation du formulaire
        
        // on ferme le modal avec un délai
        
    }
})


