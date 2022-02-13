function getPhotographerForm(photographer) {
    //modal base
    const closebtn = document.getElementById("close-form");
    const namePhotographer = document.querySelector('.name-photographer');
    namePhotographer.innerHTML = `Contactez moi  ${photographer.name}`;
    namePhotographer.setAttribute("aria-label", `${photographer.name}`);
    const contactBtn = document.querySelector(".contact_button");
    const submitForm = document.getElementById("submitform");
    const closeValid = document.getElementById("close-valid-message");

    // input form
    const firstname = document.querySelector("#first-name");
    const lastname = document.querySelector("#last-name");
    const email = document.querySelector("#email");
    const messageContent = document.querySelector("#message-content");
    // error message
    const alertFirstName = document.getElementById("alert-firts-name");
    const alertLastName = document.getElementById("alert-last-name");
    const alertEmail = document.getElementById("alert-email");
    const alertMessage = document.getElementById("alert-message");

    contactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        displayModal();

    });
    closeValid.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalValid();
    });


    closebtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
    closebtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            closeModal();
            closeModalValid();
        }
    });

    window.addEventListener("keydown", (e) => {
        const helpfocus = document.querySelector(".name-photographer");

        if (e.key === "Escape") {
            closeModal();
            closeModalValid();
        }
        if (e.key === 'Tab') {
            if (document.activeElement === closebtn) helpfocus.focus();
        }
    });
    contactBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            displayModal();
        }
    });



    // function that will control the different inputs and insert error messages in the html
    /**
     * spacing control before input characters
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

        //control firstname
        const regExControlname = /^[A-Za-z-àâäéèêëïîôöùûüç ]{2,15}$/;
        if (!regExControlname.test(firstname.value) || firstname.value == "" && firstname.value.trim()) {
            alertFirstName.innerHTML = "le champs Prenom ne doit contenir que des lettres (au moins 2) et ne peut pas être vide";
            firstname.style.border = "2px solid red";
            alertFirstName.className = 'error-current';
            firstname.className = "current-error";
            return false;
        } else {
            alertFirstName.innerHTML = "";
            firstname.style.border = "none";
        }
        // control LastName
        if (!regExControlname.test(lastname.value) || lastname.value == "") {
            alertLastName.innerHTML = "le champs Nom ne doit contenir que des lettres (au moins 2)";
            lastname.style.border = "4px solid red";
            alertLastName.className = 'error-current';
            lastname.className = "current-error";
            return false;
        } else {
            alertLastName.innerHTML = "";
            lastname.style.border = "none";
        }
        // control email
        const regExControlEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/g;
        if (!regExControlEmail.test(email.value) || email.value == "") {
            alertEmail.innerHTML = "veuillez entrer une adresse mail valide";
            email.style.border = "4px solid red";
            alertEmail.className = 'error-current';
            email.className = "current-error";
            return false;
        } else {
            alertEmail.innerHTML = "";
            email.style.border = "none";
        }

        // control message Content
        if (messageContent.value.trim() == "") {
            alertMessage.innerHTML = "Le champs message ne doit pas etre vide(2 caractère minimum)";
            messageContent.style.border = "4px solid red";
            alertMessage.className = 'error-current';
            messageContent.className = "current-error";
            return false;
        } else {
            alertMessage.innerHTML = "";
            messageContent.style.border = "none";
        }
        return true;
    }


    function resetForm() {
        document.getElementById("form-container").reset();
    }

    submitForm.addEventListener("click", (e) => {
        e.preventDefault();
        controlInputs();
        if (controlInputs() === true) {
            console.log("Prénom :" + firstname.value.trim());
            console.log("Nom :" + lastname.value);
            console.log("Email :" + email.value);
            console.log("votre message :" + messageContent.value.trim());
            console.log("Votre message a été envoyé a " + photographer.name);
            resetForm(),
                closeModal();
            launchModal();

        } else {
            error();

            return false;
        }
    });


    function launchModal() {
        const launchValidation = document.querySelector(".modal-confirm");
        launchValidation.style.display = "block";
        const messageValid = document.querySelector('#message-valid');
        messageValid.innerHTML = `Votre message a bien été envoyé a ${photographer.name} `;
        launchValidation.focus();
    }



    function displayModal() {
        const modal = document.getElementById("contact-modal");
        const containermodal = document.querySelector('#form-container');
        const helpfocus = document.querySelector(".name-photographer");
        modal.style.display = "block";
        helpfocus.focus();
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

    function error() {
        const errorCurrent = document.querySelector(".error-current");
        errorCurrent.setAttribute("tabindex", "0");
        const currentError = document.querySelector(".current-error");
        currentError.focus();
    }
}