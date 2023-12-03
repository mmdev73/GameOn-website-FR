/**
 * Class Contenant l'objet validation. Cet aobjet permet d avoir l etat de chaque champs ainsi que sa valeur
 */
class Validation {
    constructor (){
      this.validator = {
        firstName: false,
        lastName: false,
        birthDate: false,
        email: false,
        qty: false,
        city: false,
        cgu: true
      }   
      this.values = {
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        qty: null,
        city: "",
        cgu: false,
        news: false
      }
    }  
  
    // recuperation des valeurs de champs
    get allValues () {
      return this.values
    }
  
    // methode de retour pour le test de validation
    isValid() {
        return !Object.values(this.validator).includes(false)
    }

    //reinit obj
    resetobj(){
        this.validator = {
            firstName: false,
            lastName: false,
            birthDate: false,
            email: false,
            qty: false,
            city: false,
            cgu: true
        } 
        this.values = {
            firstName: "",
            lastName: "",
            birthDate: "",
            email: "",
            qty: null,
            city: "",
            cgu: false,
            news: false
        }
    }
}

/**
 * Class contenant les messages d'erreurs
 */
class ErrorMsg {
    constructor(){
        this.errName = "Prénom : entre 2 et 31 caractères. Lettres (avec accents) et trait d'union sont acceptés"
        this.errNameLast = "Nom : entre 2 et 31 caractères. Lettres (avec accents) et trait d'union sont acceptés"
        this.errEmail = "L'email semble invalide"
        this.errBirth = "La date semble incorrecte"
        this.errBirthYoung = "Vous devez être majeur pour participer"
        this.errQty = "Vous devez indiquer un chiffre entre 0 et 100"
        this.errCities = "Vous devez sélectionner une ville"
        this.errCgu = "Vous devez accepter les termes et conditions"
    }
}

/**
 * instanciation des objets
 */
export var objForm = new Validation() // instenciation de l'objet pour les champs de formulaire
export var objMsg = new ErrorMsg() // instenciation de l'objet contenant les messages derreurs
