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
    // je récupère les media du photographe
    const portfolio = data.media
        //Filtrage des media en fonction de l'id du photographe
        .filter((media) => media.photographerId === photographerId);
    // console.log(portfolio);

    //function accumulateur des likes des medias
    const totalLikes = portfolio.reduce((accumulateur, current) => {
        return accumulateur + current.likes;
    }, 0);
    // console.log(totalLikes);
    return {
        photographer,
        portfolio,
        totalLikes

    };
}

async function displayPhotographerContact(photographer) {
    const { name, portrait, city, country, tagline, description, price, totalLikes } = photographer;
    // console.log(photographer);
    const picture = `assets/photographers/${portrait}`;
    const sectionContact = document.querySelector(".photograph-header");
    // console.log(sectionContact);
    sectionContact.innerHTML = `<div class="photographer-info">
    <h1 tabindex="0">${name}</h1><div class="photographer-description">
    <p class="cityContact" tabindex="0">${city}, ${country}</p>
    <p class="taglineContact" tabindex="0">${tagline}</p>
    </div></div>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
     <img src=${picture} class="profilpicture" alt="${description}">
    `;

}


async function displaytotalLikes(photographer, totalLikes) {
    const { price } = photographer;
    const infolikejour = document.querySelector(".totallikejour");
    infolikejour.innerHTML = `<div class="gestionLikes"> <p class="valueTotalLike">${totalLikes}
    </p><img src="./assets/icons/heart-regular.svg" class="infos-Likes-Icon1" alt="icon like"/>  
     <p class="price" tabindex="0">${price}€/jour</p> </div>`;
}

async function displayMedia(portfoliomedia, photographer) {
    console.log(portfoliomedia);
    const sectionPortfolio = document.querySelector(".portfolio-section");

    portfoliomedia.forEach((elementportofolio) => {
        const templatemedia = factoryMedia(elementportofolio, photographer);
        const mediaelement = templatemedia.getmediaelement();

        sectionPortfolio.appendChild(mediaelement);

    });
}



async function init() {
    // récuperer l'id du photographe dans l'url et passer ce paramètre pour récuperer les données de ce photographe et ses media
    const urlParams = new URLSearchParams(window.location.search);
    //on analyse avec parseInt la chaine de caratère de l'url pour être sur de récuperer un nombre 
    const photographerId = parseInt(urlParams.get("photographer"));
    const { photographer, portfolio, totalLikes } = await getDataPhotographer(photographerId);
    displaytotalLikes(photographer, totalLikes);
    // console.log(photographer);
    displayPhotographerContact(photographer);
    displayMedia(portfolio, photographer);


}

init();