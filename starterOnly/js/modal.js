import{
    objForm,
    objMsg
} from './class.js'

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

export let tmOut
//---------------------------------------------------------------------
// DOM Elements
//---------------------------------------------------------------------
    // btn
const modalBtn = document.querySelectorAll(".modal-btn")
const modalBtnClose = document.querySelector(".close")
const btnSubmit = document.querySelector(".btn-submit")
    //input
const inputFirst = document.getElementById("first")
const inputLast = document.getElementById("last")
const inputEmail = document.getElementById("email")
const inputBirth = document.getElementById("birthdate")
const inputQuantity = document.getElementById("quantity")
const inputRadio = document.querySelectorAll("input[type='radio']")
const inputCgu = document.getElementById("checkbox1")
const inputNews = document.getElementById("checkbox2")
    //other
const modalBody = document.querySelector(".modal-body")
const formElem = document.querySelector("form[name='reserve']")   

//---------------------------------------------------------------------
// Constantes
//---------------------------------------------------------------------

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
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))
modalBtnClose.addEventListener("click", closeModal)

//---------------------------------------------------------------------
// Validation du formulaire
//---------------------------------------------------------------------

// event input validation form
inputFirst.addEventListener("input",() => isValidInput(inputFirst, objMsg.errName, rgxName))
inputLast.addEventListener("input",() => isValidInput(inputLast, objMsg.errNameLast, rgxName))
inputEmail.addEventListener("input",() => isValidInput(inputEmail, objMsg.errEmail, rgxEmail))
inputBirth.addEventListener("focusout",() => isValidBirth(inputBirth, objMsg))
inputQuantity.addEventListener("input",() => isValidInput(inputQuantity, objMsg.errQty, rgxQty))
inputRadio.forEach((el) => el.addEventListener("change", () => isCitiesCheck(el,objMsg.errCities, inputRadio)))
inputCgu.addEventListener("change", () => isValidCgu(inputCgu, objMsg.errCgu))

/**
 * validate()
 * Indique si le formulaire passe la validation ou non
 * @returns {boolean} => true = validation OK, false = validation NOT OK
 */
function validate(){
    isValidInput(inputFirst, objMsg.errName, rgxName)
    isValidInput(inputLast, objMsg.errNameLast, rgxName)
    isValidInput(inputEmail, objMsg.errEmail, rgxEmail)
    isValidBirth(inputBirth, objMsg)
    isValidInput(inputQuantity, objMsg.errQty, rgxQty)
    getCheckedRadioValue(inputRadio,objMsg.errCities)
    isValidCgu(inputCgu, objMsg.errCgu)

    return objForm.isValid()
}



// submit form event
btnSubmit.addEventListener("click",(e)=>{
    e.preventDefault()    
    if(validate()){
        //console.log("--Debug validate() TRUE")
        //alors on peut valider le formulaire
        // on récupère les valeur pour le traitement futur.
        let cityChecked = getCheckedRadioValue(inputRadio)
        
        objForm.values.firstName = inputFirst.value
        objForm.values.lastName = inputLast.value
        objForm.values.email = inputEmail.value
        objForm.values.birthDate = inputBirth.value
        objForm.values.qty = Number(inputQuantity.value)
        objForm.values.city = cityChecked
        objForm.values.cgu = inputCgu.checked
        objForm.values.news = inputNews.checked

        console.log(objForm.allValues)
        // on affiche l'information au client sur la validation du formulaire
        
        let modalH = modalBody.offsetHeight        
        modalBody.setAttribute("style", "height:"+modalH+"px")
        formElem.style.display = 'none'

        let validMsgBox = document.createElement("div")
        let valideMsgElem = document.createElement("p")
        let btnQuit = document.createElement("button")

        validMsgBox.classList.add("modal-body-validate")
        valideMsgElem.innerHTML = "Merci pour<br>votre inscription"
        valideMsgElem.classList.add("valideMsgElem-validate")
        btnQuit.innerText = "Fermer"
        btnQuit.classList.add("button","btn-quit")
        
        validMsgBox.appendChild(valideMsgElem)
        validMsgBox.appendChild(btnQuit)
        modalBody.appendChild(validMsgBox)
        // on ferme le modal à la croix (deja prevu), au click sur le nouveau bouton fermer ou avec un délai
        btnQuit.addEventListener("click", closeModal)
        tmOut = setTimeout(closeModal, 10000)        
    }  
})


