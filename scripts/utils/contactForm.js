function getPhotographerForm(photographer) {
    //modal base
    const closebtn = document.getElementById("close-form");
    const namePhotographer = document.querySelector('.name-photographer');
    namePhotographer.innerHTML = `Contactez moi  ${photographer.name}`;
    namePhotographer.setAttribute("aria-label", `${photographer.name}`);
    const formControl = document.getElementById("form-container");

    const submitForm = document.getElementById("submitform");
    const closeValid = document.getElementById("close-valid-message");

    // input form
    const firstname = document.querySelector("#first-name");
    console.log(firstname);
    const lastname = document.querySelector("#last-name");
    const email = document.querySelector("#email");
    const messageContent = document.querySelector("#message-content");
    console.log(messageContent);
    // message d'erreur
    const alertFirstName = document.getElementById("alert-firts-name");
    const alertLastName = document.getElementById("alert-last-name");
    const alertEmail = document.getElementById("alert-email");
    const alertMessage = document.getElementById("alert-message");


    closeValid.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalValid();
    });


    closebtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
            closeModalValid();
        }
    });



    // fonction qui va controler les différents input et insérer des message d'erreur dans le html
    /**
     * controle d'espacement avant caratère des inputs
     * @returns 
     */

    window.onload = function() {
        var inputs = document.getElementsByTagName('input');
        console.log(inputs);
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type == 'text') {
                inputs[i].onchange = function() {
                    this.value = this.value.replace(/^\s+/, '').replace(/\s+$/, '');
                };
            }
        }
    };

    function controlInputs() {



        //controle prénom
        const regExControlname = /^[A-Za-z-àâäéèêëïîôöùûüç ]{2,15}$/;
        if (!regExControlname.test(firstname.value) || firstname.value == "" && firstname.value.trimLeft()) {
            alertFirstName.innerHTML = "Ne doit contenir que des lettres (au moins 2)";
            firstname.style.border = "2px solid red";
            return false;
        } else {
            alertFirstName.innerHTML = "";
            firstname.style.border = "none";
        }
        // controle nom de famille
        if (!regExControlname.test(lastname.value) || lastname.value == "") {
            alertLastName.innerHTML = "Ne doit contenir que des lettres (au moins 2)";
            lastname.style.border = "2px solid red";
            return false;
        } else {
            alertLastName.innerHTML = "";
            lastname.style.border = "none";
        }
        // controle de l'email
        const regExControlEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/g;
        if (!regExControlEmail.test(email.value) || email.value == "") {
            alertEmail.innerHTML = "veuillez entrer une adresse mail valide";
            email.style.border = "2px solid red";
            return false;
        } else {
            alertEmail.innerHTML = "";
            email.style.border = "none";
        }
        //controle message
        // let messageisvalid = false;
        // if (messageContent.value !== "" && firstname.value.trim()) {
        //     messageisvalid = true;
        //     alertMessage.innerHTML = "";
        //     messageContent.style.border = "none";

        // } else {
        //     alertMessage.innerHTML = "ce champs doit être remplis";
        //     messageContent.style.border = "2px solid red";
        //     console.log(messageContent.value);


        // }

        if (messageContent.value.trimLeft() == "") {
            alertMessage.innerHTML = "Ne doit contenir que des lettres (au moins 2)";
            messageContent.style.border = "2px solid red";
            return false;
        } else {
            alertMessage.innerHTML = "";
            messageContent.style.border = "none";
        }
        return true;
    }



    // fonction qui va reset le formulaire aprés submit;

    function resetForm() {
        document.getElementById("form-container").reset();
    }


    submitForm.addEventListener("click", (e) => {
        e.preventDefault();
        controlInputs();
        if (controlInputs() === true) {
            console.log("Prénom :" + firstname.value.trimLeft());
            console.log("Nom :" + lastname.value);
            console.log("Email :" + email.value);
            console.log("votre message :" + messageContent.value.trimLeft());
            console.log("Votre message a été envoyé a " + photographer.name);
            resetForm(),
                closeModal();
            launchModal();
            const launchValidation = document.querySelector(".modal-confirm");
            launchValidation.focus();
        } else {
            return false;
        }
    });


    function launchModal() {
        const launchValidation = document.querySelector(".modal-confirm");
        launchValidation.style.display = "block";
        const messageValid = document.querySelector('#message-valid');
        messageValid.innerHTML = `Votre message a bien été envoyé a ${photographer.name} `;
    }


}




function displayModal() {
    const modal = document.getElementById("contact-modal");
    const containermodal = document.querySelector('#form-container');
    modal.style.display = "block";
    containermodal.focus();
}


function closeModal() {
    const modal = document.getElementById("contact-modal");
    modal.style.display = "none";
}

function closeModalValid() {
    const launchValidation = document.querySelector(".modal-confirm");
    launchValidation.style.display = "none";
    const portfoliosection = document.querySelector('.portfolio-section');
    portfoliosection.focus();
}