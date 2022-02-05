/**
 * fonction factorie pour établir le chemin des medias 
 */

function factoryMedia(elementportfolio, photographer) {

    const { id, title, image, video, likes, date, name, type } = elementportfolio;

    let imglink = `assets/photo/${photographer.name}/${image}`;
    let linkvideo = `assets/video/${video}`;

    /**
     * function incluant un comparatif pour le type de media a afficher
     */
    function getmediaelement() {
        const article = document.createElement("article");
        article.className = 'filter';
        article.setAttribute('tabindex', '0');

        //comparé si le type est image ou video
        if (elementportfolio.hasOwnProperty('image')) {
            article.innerHTML = `<img class="media-card-img" src="${imglink}" alt="${title}">
      <div class="media-card-text">
           <span class="media-card-title" tabindex="0">${title}</span>
           <div class="likes-media">
           <p id="likes-${title}" class="media-card-likes numberLikes" value="${likes}">${likes}</p>
            <img id="${title}" src="./assets/icons/heart-regular.svg" class="infos-Likes-Icon heart" tabindex="0" alt="icon like photo"/>
           </div>
         </div>`;
        } else if (elementportfolio.hasOwnProperty('video')) {
            article.innerHTML = `<video title="${title}" preload="metadata" class="media-card-img"  >
                <source src="${linkvideo}" type="video/mp4">
              </video>
             <div class="media-card-text">
          <span class="media-card-title" tabindex="0">${title}</span>
          <div class="likes-media">
           <p class="media-card-likes numberLikes" value="${likes}">${likes}</p>
           <img src="./assets/icons/heart-regular.svg" class="infos-Likes-Icon heart" tabindex="0" alt="icon like video"/>
          </div> 
        </div>
         `;

        }

        return article;

    }

    return { id, likes, date, title, name, getmediaelement };

}