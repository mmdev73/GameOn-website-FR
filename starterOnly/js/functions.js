import{
  objForm,
  objMsg
} from './class.js'

import{
  tmOut
} from './modal.js'

// DOM Elements
const modalbg = document.querySelector(".bground");
const radioBox = document.getElementById("container-checkbox")

//edit nav

/**
 * editnav()
 * 
 * 
 */
export function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}


// launch modal form and close modal
/**
 * launchModal()
 * ouvre le modal en retirant les elements d'une precedente validation le cas echeant
 * 
 */
export function launchModal() {
    document.querySelector("form[name='reserve']").style.display = 'block'
    modalbg.style.display = "block"; // on fait apparaitre le modal
    if(document.querySelector(".modal-body-validate")){
      document.querySelector(".modal-body-validate").remove()
    }        
    objForm.resetobj()
}

/**
 * closeModal()
 * ferme le modal en vidant les champs du formulaire
 * 
 */
export function closeModal() {
    modalbg.style.display = "none" // on fait disparaitre le modal
    document.querySelector("form[name='reserve'").reset() // on reset tous les champs du formulaires 
    document.querySelector(".modal-body").setAttribute("style","height: auto;")
    clearTimeout(tmOut)
}
  
// validation du formulaire
/**
 * setErrMsg()
 * affiche le message d'erreur passe en argument de fonction via l'attribut data-set
 * @param {DOMElement} elem => element du dom concerne
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 */
function setErrMsg(elem, msg){
  //console.log(elem)
  if(elem.id === "container-checkbox"){
    elem.dataset.errorVisible = true
    elem.dataset.error = msg
    return true
  }
  elem.parentElement.dataset.errorVisible = true
  elem.parentElement.dataset.error = msg
  return true
}

/**
 * rmErrMsg()
 * retire le message d'erreur de l'attribut data-set
 * @param {DOMElement} elem => element du dom concerne
 */
function rmErrMsg(elem){
  if(elem.id === "container-checkbox"){
    elem.removeAttribute('data-error-visible')
    elem.removeAttribute('data-error')
    return true
  }
  elem.parentElement.removeAttribute('data-error-visible')
  elem.parentElement.removeAttribute('data-error')
  return true  
}

/**
 * isValidInput()
 * indique si la valeur du champs repond au test de l'expression regex du param 3, et affiche le message d'erreur lie au champ le cas echeant
 * @param {DOMElement} elem => element du dom concerne
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @param {regex} rgx => expression reguliere permettant de valider ou non le test
 * @return {boolean} => true, la valeur du champ correspond a la demande - false, la valeur du champ ne correspond pas a la demande
 */
export function isValidInput(elem, msg, rgx){
  let result = null
  if (!rgx.test(elem.value)) {
    setErrMsg(elem, msg)
    result = false          
  }else{
    rmErrMsg(elem)
    result = true
  }
  switch (msg){
    case objMsg.errName:
      //console.log("firstName")
      objForm.validator.firstName = result
      break
    case objMsg.errNameLast:
      //console.log("lastName")
      objForm.validator.lastName = result
      break
    case objMsg.errEmail:
      //console.log("Email")
      objForm.validator.email = result
      break
    case objMsg.errQty:
      //console.log("Qty")
      objForm.validator.qty = result
      break
    default:
      break
  }
  //console.log({objForm})
  return result
}

/**
 * isValidBirth()
 * indique si la valeur du champs repond aux exigences et affiche le message d'erreur lie au champ le cas echeant
 * @param {DOMElement} elem => element du dom concerne
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @return {boolean} => true, la valeur du champ correspond a la demande - false, la valeur du champ ne correspond pas a la demande
 */
export function isValidBirth(elem, msg){
  let result = false
  let userDate = new Date(elem.value)
  objForm.validator.birthDate = result
  if(isNaN(userDate.getTime())){
    // la date n'est pas conforme (ex 30/02/2020, ...)
    //console.log("--Debug date non conforme => "+userDate)
    setErrMsg(elem, msg.errBirth)
    return result
  }else{
    // la date est conforme, on vérifie la majorité
    let now = new Date() // Date du jour
    let diffyear = now.getYear() - userDate.getYear() // on fait la différence entre les deux timestamp
    let diffMonth = now.getMonth() - userDate.getMonth() // on fait la différence entre le mois de naissance et le mois actuel pour ajuster l'age
    if(diffMonth < 0||(diffMonth === 0 && now.getDate() < userDate.getDate())){ // il y a un décalage avec les mois ou les jours (bonne annee mais majo pas atteinte)
      diffyear-- // on enleve donc un an pour ajuster
      //console.log("--Debug -1 an => "+diffyear)
    }
    if(diffyear < 18){
      // utilisateur mineur : refus
      //console.log("--Debug est mineur => "+diffyear)
      setErrMsg(elem, msg.errBirthYoung)
      return result
    }
  }  
  //utilisateur majeur
  //console.log("--Debug date All good => "+diffyear)
  rmErrMsg(elem)
  result = true
  objForm.validator.birthDate = result
  return result
}


/**
 * isCitiesCheck()
 * indique si un des bouton radio a ete selectionne
 * @param {DOMElement} elem => element du dom concerne par le message d'erreur
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @param {DOMElements} inputs => variable contenant l'ensemble des bouton radio (DOM)
 * @return {boolean} => true, la valeur du champ correspond a la demande - false, la valeur du champ ne correspond pas a la demande
 */
export function isCitiesCheck(elem, msg, inputs){
  let result = null
  let oneChecked = Array.from(inputs).some((radioElem) => radioElem.checked) // on duplique le tableau cities, puis on vérifie si au moins un elem a l'attribut checked
  if(!oneChecked){
    setErrMsg(elem,msg)    
    result = false
  }else{
    rmErrMsg(elem)
    result = true
  }
  //console.log("--Debug isCitiesCheck() - TRUE oneChecked => "+oneChecked)  
  objForm.validator.city = result
  return result
}

/**
 * getCheckedRadioValue()
 * Recupere la valeur du bouton radio coche
 * @param {DOMElements} elemList => variable contenant l'ensemble des bouton radio (DOM)
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @return {boolean} ou {string} => true = un bouton coche, false = aucun bouton coche ou Une valeur = un bouton coche
 */
export function getCheckedRadioValue(elem,msg){
  //console.log({elem})
  let result = ""
  rmErrMsg(radioBox)
  for (var i = 0; i < elem.length; i++) {
    if (elem[i].checked) {
      result = elem[i].value
      objForm.validator.city = true
      return result
    }
  }
  setErrMsg(radioBox,msg)
  objForm.validator.city = false
  return result
}

/**
 * isValidCgu()
 * Determine si la checkbox CGU est coche ou non
 * @param {DOMElement} elem => element du dom concerne par le message d'erreur
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @returns {boolean} => true = case coche, false = case non coche
 */
export function isValidCgu(elem, msg){
  let result = null
  if(!elem.checked){
    setErrMsg(elem, msg)
    result = false
  }else{
    rmErrMsg(elem)
    result = true
  }
  objForm.validator.cgu = result
  return result
}
