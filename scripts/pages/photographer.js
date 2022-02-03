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

function myDropDown() {
    let dropDown = document.getElementById("myDropdown").classList.toggle("show");
    window.onclick = (event) => {
        if (!event.target.matches(".dropbtn")) {
            let dropDowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropDowns.length; i++) {
                let openDrop = dropDowns[i];
                if (openDrop.classList.contains("show")) {
                    openDrop.classList.remove("show");
                }
            }
        }
    };
}

function displayNavList(portfoliomedia, photographerId) {

    const navDrop = document.querySelector(".navdropbox");
    navDrop.innerHTML = ` <div class="containerListBox">
      <div class="sortList">
        <p class="trierTitle">Trier par</p>
      </div>
      <div class="dropdown">
        <button onclick="myDropDown()" class="dropbtn popularity" aria label="Popularité"><a href="" class="filterBypop" aria-labelled="Trier par popularité" id="populaire">Populaire</a></button>

      <div id="myDropdown" class="dropdown-content">
        <a href="" class="filterByDates" aria-labelledby="Trier par dates" id="date">Date</a>
        <a href="" class="filterByTitle" aria-labelled="Trier par titre" id="title">Titre</a>

      </div> 
      </div>
      </div> `;

}


async function displaytotalLikes(photographer, totalLikes) {
    const { price } = photographer;
    const infoLikeDay = document.querySelector(".totallikejour");
    infoLikeDay.innerHTML = `<div class="gestionLikes"> <p class="valueTotalLike">${totalLikes}
    </p><img src="./assets/icons/heart-solid.svg" class="infos-Likes-Icon1" alt="icon like"/>  
     <p class="price" tabindex="0">${price}€/jour</p> </div>`;
}

async function displayMedia(portfolioMedia, photographer) {
    const sectionPortfolio = document.querySelector(".portfolio-section");
    sectionPortfolio.innerHTML = '';
    portfolioMedia.forEach((elementPortfolio) => {
        const templateMedia = factoryMedia(elementPortfolio, photographer);
        const mediaElement = templateMedia.getmediaelement();
        sectionPortfolio.appendChild(mediaElement);

    });
    likeIncremente();

}
/**
 * mise a jour des media selon les filtres
 */
async function udapteMediaFilter(portfolioMedia, photographer) {
    const sectionPortfolio = document.querySelector(".portfolio-section");

    const filterByTitleMedia = document.querySelector(".filterByTitle");
    const filterByDateMedia = document.querySelector(".filterByDates");
    const filterBypop = document.querySelector(".filterBypop");
    let items = portfolioMedia;
    sectionPortfolio.innerHTML = '';
    filterByTitleMedia.addEventListener("click", (event) => {
        items.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            } else if (a.title > b.title) {
                return 1;
            } else {
                return 0;
            };
        });
        event.preventDefault();
        displayMedia(items, photographer);

    });

    filterByDateMedia.addEventListener("click", (event) => {
        items.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else if (a.date > b.date) {
                return -1;
            } else {
                return 0;
            };
        });
        event.preventDefault();
        displayMedia(items, photographer);
    });

    filterBypop.addEventListener("click", (event) => {
        items.sort((a, b) => {
            if (a.likes > b.likes) {
                return -1;
            } else if (a.likes < b.likes) {
                return 1;
            } else {
                return 0;
            };
        });
        event.preventDefault();
        displayMedia(items, photographer);
    });

};


/**
 * function d'incrémentation des likes de chaque media avec mise a jour du total des likes 
 */
function likeIncremente() {

    let heart = document.querySelectorAll(".infos-Likes-Icon");
    const totalLikes = document.querySelector(".valueTotalLike");
    // console.log(heart);
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener("click", function(event) {
            event.preventDefault;
            // console.log("ok");
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
    // console.log(photographer);
    displayPhotographerContact(photographer);
    displayNavList(portfolio, photographerId);
    udapteMediaFilter(portfolio, photographer);
    displayMedia(portfolio, photographer);
}

init();