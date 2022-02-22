/**
 * 
 * @param {number} photographerId 
 * @returns data of the photographer and the media according to the id as well as the accumulation of likes
 */
async function getDataPhotographer(photographerId) {

    let data = "";
    await fetch('data/photographers.json').then(async response => {
        try {
            data = await response.json();
        } catch (error) {
            console.log(error);
        }
    });

    const photographer = data.photographers.find((photographe) => photographe.id === photographerId);

    const portfolio = data.media
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

    //function media likes accumulator
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
 *  
 * @param {string[]} photographer photographer contact  
 */
async function displayPhotographerContact(photographer) {
    const { name, portrait, city, country, tagline, description, price, totalLikes } = photographer;
    const picture = `assets/photographers/${portrait}`;
    const sectionContact = document.querySelector(".photograph-header");

    sectionContact.innerHTML = `<div class="photographer-info">
    <h1 tabindex="0">${name}</h1><div tabindex="0" class="photographer-description">
    <p class="city-Contact" >${city}, ${country}</p>
    <p class="tagline-Contact">${tagline}</p>
    </div></div>
    <button class="contact_button" >Contactez-moi</button> <img src=${picture} class="profil-picture" alt="${description}">
    `;

    getPhotographerForm(photographer);

}



function displayNavList() {

    const navDrop = document.querySelector(".nav-dropbox");
    navDrop.innerHTML = `
     <div class="works-type">
                <span id="type-text">Trier par</span>
                <div id="type-wrapper" tabindex="-1">
                    <div class="type-btn">
                        <button class="btn-click"  aria-haspopup="listbox" >Popularité</button>
                        <img class="arrow-down-close"  src="./assets/icons/chevron-down-solid.svg" role='button' aria-expanded alt="fermer le menu" />
                    </div>
                    <ul class="hidden-type" aria-activedescendant="listbox-populaire" role="listbox">
                        <li id="filtre-pop" class="type border-li" aria-label="popularité" tabindex="0" aria-selected="true" role='option'>Popularité
                            
                        </li>
                        <li id="filtre-date" class="type border-li" tabindex="0" aria-label="Date" aria-selected="false" role='option'>Date</li>
                        <li id="filtre-titre" class="type" tabindex="0" aria-selected="false" aria-label="Titre" role='option'>Titre</li>
                    </ul><img class="arrow-up-close" tabindex="0" src="./assets/icons/chevron-up-solid.svg"  alt="fermer le menu" />
                </div>
            </div > `;

}




/**
 * Events, open/close the dropDownMenu
 *@param {string[]} portfolioMedia 
 * @param {string[]} photographer  
 */
function dropDown(portfolioMedia, photographer) {
    let arrowOpen = document.getElementsByClassName('type-btn');
    let arrowClose = document.getElementsByClassName('arrow-up-close');
    let hiddenSort = document.getElementsByClassName('hidden-type');
    let arrowCloseup = document.querySelector('.arrow-up-close');

    if (arrowOpen) {

        arrowOpen[0].addEventListener('click', () => {
            arrowCloseup.style.display = "block";
            hiddenSort[0].style.display = 'block';
        });
        this.updateMedia(portfolioMedia, photographer);

    }
    if (arrowClose) {
        arrowClose[0].addEventListener('click', () => {
            hiddenSort[0].style.display = "none";
            arrowCloseup.style.display = "none";

        });
        arrowClose[0].addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                hiddenSort[0].style.display = "none";
                arrowCloseup.style.display = "none";
            }
        });
    }
}


/**
 * update of the media according to the filters
 *@param {string[]} portfolioMedia 
 * @param {string[]} photographer 
 */

function updateMedia(portfolioMedia, photographer) {
    let items = portfolioMedia;
    let btnSelection = document.querySelector('.btn-click');
    let hiddentype = document.getElementsByClassName('hidden-type');
    let typeBtn = Array.from(document.getElementsByClassName('type'));
    let arrowCloseup = document.querySelector('.arrow-up-close');

    /**
     * @param {MouseEvent} typebtn click filtering selection
     */
    typeBtn.forEach((btn, index) => btn.addEventListener('click', () => {
        if (index == 0) {
            btnSelection.innerHTML = `Popularité`;
            items.sort((a, b) => b.likes - a.likes);
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";
            arrowCloseup.style.display = "none";

        } else if (index == 1) {
            btnSelection.innerHTML = `Dates`;
            items.sort((a, b) => b.date.localeCompare(a.date));
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";
            arrowCloseup.style.display = "none";

        } else if (index == 2) {
            btnSelection.innerHTML = `Titre`;
            items.sort((a, b) => a.title.localeCompare(b.title));
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";
            arrowCloseup.style.display = "none";
        }

    }));

    /**
     * @param {KeyboardEvent} typebtn selection of filtering with tabindex and enter
     */

    typeBtn.forEach((btn, index) => btn.addEventListener('keydown', (e) => {
        if (index == 0 && e.key === 'Enter') {
            btnSelection.innerHTML = `Popularité`;
            items.sort((a, b) => b.likes - a.likes);
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";
            arrowCloseup.style.display = "none";

        } else if (index == 1 && e.key === 'Enter') {
            btnSelection.innerHTML = `Dates`;
            items.sort((a, b) => b.date.localeCompare(a.date));
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";
            arrowCloseup.style.display = "none";

        } else if (index == 2 && e.key === 'Enter') {
            btnSelection.innerHTML = `Titre`;
            items.sort((a, b) => a.title.localeCompare(b.title));
            displayMedia(items, photographer);
            hiddentype[0].style.display = "none";
            arrowCloseup.style.display = "none";

        }

    }));

}


/**
 * display of total likes and price per day
 * @param {string[]} photographer 
 * @param {number} totalLikes 
 */
function displaytotalLikes(photographer, totalLikes) {
    const { price } = photographer;
    const infoLikeDay = document.querySelector(".total-like-jour");
    infoLikeDay.innerHTML = `<div class="gestion-likes"> <p class="value-Total-Like">${totalLikes}
    </p><img src="./assets/icons/heart-solid.svg" class="infos-Likes-Icon1" alt="icon like"/>  
     <p class="price" tabindex="0">${price}€/jour</p> </div>`;
}


/**
 * display of basic media content with call to the likes incrementation function
 * @param {string[]} portfolioMedia portfolio element
 * @param {string[]} photographer photographer data
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
 * function incrementation of the likes of each media with update of the total of likes 
 */
function likeIncremente() {

    let heart = document.querySelectorAll(".infos-Likes-Icon");
    const totalLikes = document.querySelector(".value-Total-Like");

    /**
     * @param {MouseEvent} heart 
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
     * @param {KeyboardEvent} heart 

     */
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener("keydown", (event) => {
            event.preventDefault;
            if (event.key === 'Enter') {
                let buttonClicked = event.target;
                let likeSpan = buttonClicked.parentElement.children[0];
                let values = parseInt(likeSpan.textContent);
                let newvalue = values + 1;
                likeSpan.textContent = `${newvalue}`;
                currentTotalLike = parseInt(totalLikes.textContent);
                let newtotalLike = currentTotalLike + 1;
                totalLikes.textContent = `${newtotalLike}`;
            }

        });
    }
}






async function init() {

    //retrieve the photographer's id in the url and pass this parameter to retrieve the data of this photographer and his media
    const urlParams = new URLSearchParams(window.location.search);
    //we analyze with parseInt the character string of the url to be sure to recover a number 
    const photographerId = parseInt(urlParams.get("photographer"));
    const { photographer, portfolio, totalLikes } = await getDataPhotographer(photographerId);
    displaytotalLikes(photographer, totalLikes);
    displayPhotographerContact(photographer);
    displayNavList(portfolio, photographerId);
    dropDown(portfolio, photographer);
    displayMedia(portfolio, photographer);
    updateMedia(portfolio, photographer);


}

init();