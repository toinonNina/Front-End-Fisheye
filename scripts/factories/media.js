//établir le chemin des médias 

function factoryMedia(elementportfolio, photographer) {

    const { id, title, image, video, likes, date, name, type } = elementportfolio;

    let imglink = `assets/photo/${photographer.name}/${image}`;
    let linkvideo = `assets/video/${video}`;

    function getmediaelement() {
        const article = document.createElement("article");
        article.setAttribute('tabindex', '0');

        //comparé si le type est image ou video
        if (elementportfolio.hasOwnProperty('image')) {
            article.innerHTML = `<img class="media-card-img" src="${imglink}" alt="${title}">
      <div class="media-card-text">
           <span class="media-card-title">${title}</span>
           <div class="likesMedia">
            <img id="${title}" src="./assets/icons/heart-regular.svg" class="infos-Likes-Icon infos-Likes-Icon1 heart" alt="icon like"/>
             <p id="likes-${title}" class="media-card-likes .numberLikes" value="${likes}">${likes}</p>
           </div>
         </div>`;
        } else if (elementportfolio.hasOwnProperty('video')) {
            article.innerHTML = `<video  preload="metadata" class="media-card-img"  >
                <source src="${linkvideo}" type="video/mp4">
              </video>
             <div class="media-card-text">
          <span class="media-card-title">${title}</span>
          <div class="likesMedia">
           <img src="./assets/icons/heart-regular.svg" class="infos-Likes-Icon infos-Likes-Icon1 heart" alt="icon like"/>
          <p class="media-card-likes numberLikes" value="${likes}">${likes}</p>
          </div> 
        </div>
         `;

        }

        return article;

    }

    return { id, likes, date, title, getmediaelement };

}