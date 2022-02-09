//Mettre le code JavaScript lié à la page photographer.html
/**
 * 
 * @param {number} photographerId 
 * @returns donnée du photographe et des media selon l'id ainsi que le cumul des likes
 */
async function getDataPhotographer(photographerId) {
    //récuperer les données json
    let data = "";
    await fetch('data/photographers.json').then(async response => {
        try {
            data = await response.json();
        } catch (error) {
            console.log(error);
        }
    });
    // on cherche dans le fichier json les données via l'id du photographer
    const photographer = data.photographers.find((photographe) => photographe.id === photographerId);
    // je récupère les media du photographe
    const portfolio = data.media
        //Filtrage des media en fonction de l'id du photographe et du nombre de like pour la popularité
        .filter((media) => media.photographerId === photographerId)
        .sort((a, b) => {
            if (a.likes > b.likes) {
                return -1;
            } else if (a.likes < b.likes) {
                return 1;
            } else {
                return 0;
            };
        });

    //function accumulateur des likes des medias
    const totalLikes = portfolio.reduce((accumulateur, current) => {
        return accumulateur + current.likes;
    }, 0);
    return {
        photographer,
        portfolio,
        totalLikes

    };
}

/**
 *  affichage de la carte contact du photographe
 * @param {string[]} photographer donnée du photographe  
 */
async function displayPhotographerContact(photographer) {
    const { name, portrait, city, country, tagline, description, price, totalLikes } = photographer;
    // console.log(photographer);
    const picture = `assets/photographers/${portrait}`;
    const sectionContact = document.querySelector(".photograph-header");
    // console.log(sectionContact);
    sectionContact.innerHTML = `<div class="photographer-info">
    <h1 tabindex="0">${name}</h1><div class="photographer-description">
    <p class="city-Contact" tabindex="0">${city}, ${country}</p>
    <p class="tagline-Contact" tabindex="0">${tagline}</p>
    </div></div>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
     <img src=${picture} class="profil-picture" alt="${description}">
    `;

}


/**
 * affichage du menu de filtrage
 */
function displayNavList() {

    const navDrop = document.querySelector(".nav-dropbox");
    navDrop.innerHTML = `
     <div class="works-type">
                <span id="type-text">Trier par</span>
                <div id="type-wrapper">
                    <div class="type-btn">
                        <button class="btn-click" aria-haspopup="listbox" >Popularité</button>
                        <img class="arrow-down-close" src="./assets/icons/chevron-down-solid.svg" role='button' aria-expanded alt="Arrow Icon" />
                    </div>
                    <ul class="hidden-type" aria-activedescendant="listbox-populaire" tabindex="1"   role="listbox">
                        <li id="filtre-pop" class="type border-li" aria-label="popularité" tabindex="0" aria-selected="true" role='option'>Popularité
                            <img class="arrow-up-close" src="./assets/icons/chevron-up-solid.svg" tabindex="0" alt="Arrow Icon" aria-hidden="true" />
                        </li>
                        <li id="filtre-date" class="type border-li" tabindex="0" aria-selected="false" role='option'>Date</li>
                        <li id="filtre-titre" class="type" tabindex="0" aria-selected="false" role='option'>Titre</li>
                    </ul>
                </div>
            </div > `;

}




/**
 * Events, open/close the dropDownMenu
 *@param {string[]} portfolioMedia element du portfolio
 * @param {string[]} photographer donnée du photographe 
 */
function dropDown(portfolioMedia, photographer) {
    let arrowOpen = document.getElementsByClassName('type-btn');
    let arrowClose = document.getElementsByClassName('arrow-up-close');
    let hiddenSort = document.getElementsByClassName('hidden-type');

    if (arrowOpen) {
        arrowOpen[0].addEventListener('click', () => {
            hiddenSort[0].style.display = 'block';
        });
        this.updateMedia(portfolioMedia, photographer);

    }
    if (arrowClose) {
        arrowClose[0].addEventListener('click', () => {
            hiddenSort[0].style.display = "none";
            console.log("ok");
        });
    }
}


/**
 * mise a jour des media selon les filtres
 *@param {string[]} portfolioMedia element du portfolio
 * @param {string[]} photographer donnée du photographe 
 */

function updateMedia(portfolioMedia, photographer) {
    let items = portfolioMedia;
    let btnSelection = document.querySelector('.btn-click');
    let hiddentype = document.getElementsByClassName('hidden-type');
    let typeBtn = Array.from(document.getElementsByClassName('type'));

    /**
     * @param {MouseEvent} typebtn selection du filtrage au click
     */
    typeBtn.forEach((btn, index) => btn.addEventListener('click', () => {
        if (index == 0) {
            btnSelection.innerHTML = `Popularité`;
            items.sort((a, b) => b.likes - a.likes);
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";
        } else if (index == 1) {
            btnSelection.innerHTML = `Dates`;
            items.sort((a, b) => b.date.localeCompare(a.date));
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";

        } else if (index == 2) {
            btnSelection.innerHTML = `Titre`;
            items.sort((a, b) => a.title.localeCompare(b.title));
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";
        }

    }));

    /**
     * @param {KeyboardEvent} typebtn selection du filtrage avec tabindex et entrée
     */

    typeBtn.forEach((btn, index) => btn.addEventListener('keydown', (e) => {
        if (index == 0 && e.key === 'Enter') {
            btnSelection.innerHTML = `Popularité`;
            items.sort((a, b) => b.likes - a.likes);
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";

        } else if (index == 1 && e.key === 'Enter') {
            btnSelection.innerHTML = `Dates`;
            items.sort((a, b) => b.date.localeCompare(a.date));
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";

        } else if (index == 2 && e.key === 'Enter') {
            btnSelection.innerHTML = `Titre`;
            items.sort((a, b) => a.title.localeCompare(b.title));
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";

        }

    }));

}


/**
 * affichage du total des likes et du prix par jour
 * @param {string[]} photographer donnée du prix du photographe
 * @param {number} totalLikes likes total des media du photographe
 */
function displaytotalLikes(photographer, totalLikes) {
    const { price } = photographer;
    const infoLikeDay = document.querySelector(".total-like-jour");
    infoLikeDay.innerHTML = `<div class="gestion-likes" tabindex="9"> <p class="value-Total-Like">${totalLikes}
    </p><img src="./assets/icons/heart-solid.svg" class="infos-Likes-Icon1" alt="icon like"/>  
     <p class="price" tabindex="0">${price}€/jour</p> </div>`;
}


/**
 * affichage du contenu media de base avec appel de la fonction d'incrémentation des likes
 * @param {string[]} portfolioMedia element du portfolio
 * @param {string[]} photographer donnée du photographe
 */
async function displayMedia(portfolioMedia, photographer) {
    const sectionPortfolio = document.querySelector(".portfolio-section");
    sectionPortfolio.innerHTML = '';
    portfolioMedia.forEach((elementPortfolio) => {
        const templateMedia = factoryMedia(elementPortfolio, photographer);
        const mediaElement = templateMedia.getmediaelement();
        sectionPortfolio.appendChild(mediaElement);
    });
    likeIncremente();
    displayLightbox(portfolioMedia, photographer);

}


/**
 * function d'incrémentation des likes de chaque media avec mise a jour du total des likes 
 */
function likeIncremente() {

    let heart = document.querySelectorAll(".infos-Likes-Icon");
    const totalLikes = document.querySelector(".value-Total-Like");

    /**
     * @param {MouseEvent} heart validation du like au click du coeur
     */
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener("click", (event) => {
            event.preventDefault;

            let buttonClicked = event.target;
            let likeSpan = buttonClicked.parentElement.children[0];

            let values = parseInt(likeSpan.textContent);

            let newvalue = values + 1;

            likeSpan.textContent = `${newvalue}`;
            currentTotalLike = parseInt(totalLikes.textContent);

            let newtotalLike = currentTotalLike + 1;
            totalLikes.textContent = `${newtotalLike}`;

        });
    }
    /**
     * @param {KeyboardEvent} heart validation du like avec la touche entrée
     */
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener("keydown", (event) => {
            event.preventDefault;
            // console.log("ok");
            if (event.key === 'Enter') {
                let buttonClicked = event.target;
                let likeSpan = buttonClicked.parentElement.children[0];
                // console.log(likespan);
                let values = parseInt(likeSpan.textContent);
                // console.log(valeur);
                let newvalue = values + 1;
                // console.log(newvalue);
                likeSpan.textContent = `${newvalue}`;
                currentTotalLike = parseInt(totalLikes.textContent);
                // console.log(currenttotalLike);
                let newtotalLike = currentTotalLike + 1;
                totalLikes.textContent = `${newtotalLike}`;
            }

        });
    }
}






async function init() {

    // récuperer l'id du photographe dans l'url et passer ce paramètre pour récuperer les données de ce photographe et ses media
    const urlParams = new URLSearchParams(window.location.search);
    //on analyse avec parseInt la chaine de caratère de l'url pour être sur de récuperer un nombre 
    const photographerId = parseInt(urlParams.get("photographer"));
    const { photographer, portfolio, totalLikes } = await getDataPhotographer(photographerId);
    displaytotalLikes(photographer, totalLikes);
    displayPhotographerContact(photographer);
    displayNavList(portfolio, photographerId);
    dropDown(portfolio, photographer);
    updateMedia(portfolio, photographer);
    displayMedia(portfolio, photographer);

}

init();