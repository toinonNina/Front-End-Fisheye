//établir le chemin des médias 

function factoryMedia(elementportofolio, photographer) {

    const { id, title, image, video, likes, date, name, type } = elementportofolio;

    let imglink = `assets/photo/${photographer.name}/${image}`;
    let linkvideo = `assets/video/${video}`;

    function getmediaelement() {
        const article = document.createElement("article");
        article.setAttribute('tabindex', '0');

        //comparé si le type est image ou video
        if (elementportofolio.hasOwnProperty('image')) {
            article.innerHTML = `<img class="media-card-img" src="${imglink}" alt="${title}">
      <div class="media-card-text">
           <span class="media-card-title">${title}</span>
           <div class="likesByMedia">
           <i class="fas fa-heart heart"></i>
            
            <span class="media-card-likes" value="${likes}">${likes}</span>
           </div>
         </div>`;
        } else if (elementportofolio.hasOwnProperty('video')) {
            article.innerHTML = `<video  preload="metadata" class="media-card-img"  >
                <source src="${linkvideo}" type="video/mp4">
              </video>
             <div class="media-card-text">
          <span class="media-card-title">${title}</span>
          <div class="likesByMedia">
           <img src="./assets/icons/heart-regular.svg" class="infos-Likes-Icon infos-Likes-Icon1 heart" alt="icon like"/>
           <span class="media-card-likes" value="${likes}">${likes}</span>
          </div>
        </div>
         `;

        }

        return article;

    }
    console.log(likes);

    return { id, likes, date, title, getmediaelement };

}