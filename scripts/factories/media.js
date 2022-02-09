/**
 * fonction factorie pour établir le chemin des medias 
 */

function factoryMedia(elementportfolio, photographer) {

    const { id, title, image, video, likes, date, name, type } = elementportfolio;

    let imglink = `assets/photo/${photographer.id}/${image}`;
    let linkvideo = `assets/video/${video}`;

    /**
     * function incluant un comparatif pour le type de media a afficher
     */
    function getmediaelement() {
        const article = document.createElement("article");
        article.className = 'filter';

        //comparé si le type est image ou video
        if (elementportfolio.hasOwnProperty('image')) {
            article.innerHTML = ` <img tabindex="0" class="media-card-img" media-id="${id}" src="${imglink}" alt="${title}">
      <div class="media-card-text">
           <span class="media-card-title">${title}</span>
           <div class="likes-media">
           <p id="likes-${title}" class="media-card-likes numberLikes" value="${likes}">${likes}</p>
          
            <img id="${title}" src="./assets/icons/heart-regular.svg" class="infos-Likes-Icon heart" tabindex="0" alt="icon like photo"/>
           </div>
         </div>`;
        } else if (elementportfolio.hasOwnProperty('video')) {
            article.innerHTML = `<video tabindex="0" title="${title}" media-id="${id}" preload="metadata" class="media-card-img"  >
                <source src="${linkvideo}" type="video/mp4">
              </video>
             <div class="media-card-text">
          <span class="media-card-title" >${title}</span>
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