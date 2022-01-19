//Mettre le code JavaScript lié à la page photographer.html
async function getDataPhotographer(photographerId) {
    //récuperer les données json
    let data = "";
    await fetch('data/photographers.json').then(async response => {
        try {
            data = await response.json();
            //console.log('response datas?', data);
        } catch (error) {
            console.log(error);
        }
        //console.log(data.photographers);
    });
    // on cherche dans le fichier json les données via l'id du photographer
    const photographer = data.photographers.find((photographe) => photographe.id === photographerId);
    // console.log(photographer);

    return {
        photographer,

    };
}

async function displayPhotographerContact(photographer) {
    const { name, portrait, city, country, tagline, description } = photographer;
    console.log(photographer);
    const picture = `assets/photographers/${portrait}`;
    const sectionContact = document.querySelector(".photograph-header");
    // console.log(sectionContact);
    sectionContact.innerHTML = `<div class="photographer-info">
    <h1>${name}</h1><div class="photographer-description">
    <p class="cityContact">${city}, ${country}</p>
    <p class="taglineContact">${tagline}</p>
    </div></div>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
     <img src=${picture} class="profilpicture" alt="${description}">
    `;
}

async function init() {
    // récuperer l'id du photographe dans l'url et passer ce paramètre pour récuperer les données de ce photographe et ses media
    const urlParams = new URLSearchParams(window.location.search);
    //on analyse avec parseInt la chaine de caratère de l'url pour être sur de récuperer un nombre 
    const photographerId = parseInt(urlParams.get("photographer"));
    const { photographer } = await getDataPhotographer(photographerId);
    // console.log(photographer);
    displayPhotographerContact(photographer);
}

init();