// DOM Elements
const modalbg = document.querySelector(".bground");


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
    if(document.querySelector(".form-success")){ // on enleve le message de formulaire sent si il existe
      document.querySelector(".form-success").remove()
    }
    modalbg.style.display = "block"; // on fait apparaitre le modal
}

/**
 * closeModal()
 * ferme le modal en vidant les champs du formulaire
 * 
 */
export function closeModal() {
    modalbg.style.display = "none" // on fait disparaitre le modal
    document.querySelector("form[name='reserve'").reset() // on reset tous les champs du formulaires
}
  
// validation du formulaire
/**
 * setErrMsg()
 * affiche le message d'erreur passe en argument de fonction via l'attribut data-set
 * @param {DOMElement} elem => element du dom concerne
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 */
function setErrMsg(elem, msg){
  elem.parentElement.dataset.errorVisible = true
  elem.parentElement.dataset.error = msg
}

/**
 * rmErrMsg()
 * retire le message d'erreur de l'attribut data-set
 * @param {DOMElement} elem => element du dom concerne
 */
function rmErrMsg(elem){
  elem.parentElement.removeAttribute('data-error-visible')
  elem.parentElement.removeAttribute('data-error')
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
  if (!rgx.test(elem.value)) {
    setErrMsg(elem, msg)
    return false
  } 
  rmErrMsg(elem)
  return true
}

/**
 * isValidBirth()
 * indique si la valeur du champs repond aux exigences et affiche le message d'erreur lie au champ le cas echeant
 * @param {DOMElement} elem => element du dom concerne
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @return {boolean} => true, la valeur du champ correspond a la demande - false, la valeur du champ ne correspond pas a la demande
 */
export function isValidBirth(elem, msg){
  let userDate = new Date(elem.value)
  if(isNaN(userDate.getTime())){
    // la date n'est pas conforme (ex 30/02/2020, ...)
    //console.log("--Debug date non conforme => "+userDate)
    setErrMsg(elem, msg.errBirth)
    return false
  }
  // la date est conforme, on vérifie la majorité
  let age = null
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
    return false
  }
  //utilisateur majeur
  //console.log("--Debug date All good => "+diffyear)
  rmErrMsg(elem)
  return true
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
  let oneChecked = Array.from(inputs).some(radioElem => radioElem.checked) // on duplique le tableau cities, puis on vérifie si au moins un elem a l'attribut checked
  if(!oneChecked){
    setErrMsg(elem,msg)
    return false
  }
  rmErrMsg(elem)
  return true
}

/**
 * getCheckedRadioValue()
 * Recupere la valeur du bouton radio coche
 * @param {DOMElements} elemList => variable contenant l'ensemble des bouton radio (DOM)
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @return {boolean} ou {string} => true = un bouton coche, false = aucun bouton coche ou Une valeur = un bouton coche
 */
export function getCheckedRadioValue(elemList,msg = ""){
  elemList.forEach((elem)=>{
    //console.log(elem)
    if(elem.checked){
        console.log("--Debug elem.checked")
        console.log("--Debug radio checked => "+elem.value)
        if(msg !== ""){
          console.log("--Debug if msg !== ''")
          rmErrMsg(elem)
          return true
        }
        return elem.value
    }
    if(msg !== ""){
      setErrMsg(elem,msg)
    }
    return false
  })
}

/**
 * isValidCgu()
 * Determine si la checkbox CGU est coche ou non
 * @param {DOMElement} elem => element du dom concerne par le message d'erreur
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @returns {boolean} => true = case coche, false = case non coche
 */
export function isValidCgu(elem, msg){
  if(!elem.checked){
    setErrMsg(elem, msg)
    return false
  }
  rmErrMsg(elem)
  return true
}

