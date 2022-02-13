/**
 * lightbox display and navigation menu
 *@param {string[]} portfolioMedia portfolio items
 * @param {string[]} photographer photographer data
 */

function displayLightbox(portfolioMedia, photographer) {
    const openLinks = document.querySelectorAll(".media-card-img");
    const lightbox = document.querySelector(".slider-media-container");
    const close = document.querySelector(".lightbox-close");
    const container = document.querySelector(".lightbox-container");
    const prev = document.querySelector('.lightbox-prev');
    const next = document.querySelector('.lightbox-next');
    let domMediaId = 0;
    let indexVue = -1;

    /**
     * @param {MouseEvent} openlightbox
     */
    openLinks.forEach(Itemsclicks => {
        Itemsclicks.addEventListener("click", (e) => {
            let idItems = e.target.getAttribute('media-ID');
            portfolioMedia.forEach(portfolio => {
                if (portfolio.id == idItems) {
                    getLightBox(portfolio, container);
                    indexVue = portfolioMedia.findIndex((portfolio) => portfolio.id == domMediaId);
                }
            });
            launchLightbox();
            nav();


        });
        Itemsclicks.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                Itemsclicks.click();
            }
        });

    });

    // open lightbox 
    function launchLightbox() {
        lightbox.style.display = "block";
        lightbox.focus();

    };

    // close lightbox 
    close.addEventListener("click", closeLightBox);


    function closeLightBox() {
        lightbox.style.display = "none";
        document.querySelector(".lightbox-container").innerHTML = ``;
        window.location.reload;
        const portfoliosection = document.querySelector('.portfolio-section');
        portfoliosection.focus();
    }

    function nav() {
        next.addEventListener("click", (e) => {
            e.preventDefault();
            nextArrow();
        });
        prev.addEventListener("click", (e) => {
            e.preventDefault();
            prevArrow();
        });
        window.addEventListener("keydown", (e) => {
            const helpfocus = document.querySelector(".slider-media-container");
            if (e.key === "ArrowRight") {
                nextArrow();
            } else if (e.key === "ArrowLeft") {
                prevArrow();
            } else if (e.key === "Escape") {
                closeLightBox();
            } else if (e.key === 'Tab') {
                if (document.activeElement === close) helpfocus.focus();
            }
        });

    }

    function nextArrow() {
        if (indexVue > -1 && indexVue < portfolioMedia.length - 1) {
            indexVue++;

            container.innerHTML = "";
            getLightBox(portfolioMedia[indexVue], container);
        } else if (indexVue == portfolioMedia.length - 1) {
            indexVue = 0;

            container.innerHTML = "";
            getLightBox(portfolioMedia[0], container);
        }
    }

    function prevArrow() {
        if (indexVue > 0) {
            indexVue--;

            container.innerHTML = "";
            getLightBox(portfolioMedia[indexVue], container);
        } else if (indexVue == 0) {
            indexVue = portfolioMedia.length - 1;

            container.innerHTML = "";
            getLightBox(portfolioMedia[portfolioMedia.length - 1], container);
        }
    }
    /**
     * 
     * @param {string[]} items items array
     * @returns the contents of the lighbox according to the type of file
     */
    function lightboxFactory(items) {
        getLightBoxdisplay = () => {
            const containerInLightbox = document.createElement("div");
            containerInLightbox.classList.add("lightbox-content");
            if (isAVideo) {
                containerInLightbox.innerHTML = ` 
            <video class="media-card-lightbox" tabindex="1" media-id="${items.id}" preload="metadata" controls autoplay tabindex="1" aria-label="${items.title}">
                <source src="assets/video/${items.video}" type="video/mp4">
            </video>
            <p tabindex="1" lang="en" aria-label="titre du média">${items.title}</p> 
          `;
            } else {
                containerInLightbox.innerHTML = `
            <img class="media-card-lightbox" media-id="${items.id}" src="assets/photo/${photographer.id}/${items.image}" 
            tabindex="1" alt="${items.title}" aria-label="${items.title}"/>
            <p tabindex="1" lang="en" aria-label="titre du média">${items.title}</p> 
          `;
            }
            return containerInLightbox;
        };
        return this;

    };




    /**
     * 
     * @param {string[]} itemsSelected 
     * @param {*} containerDom 
     * @returns 
     */
    function getLightBox(itemsSelected, containerDom) {
        isAVideo = itemsSelected.video;
        const templateLight = lightboxFactory(itemsSelected, photographer);
        const udaptelightbox = templateLight.getLightBoxdisplay();
        containerDom.appendChild(udaptelightbox),
            domMediaId = udaptelightbox.querySelector(".media-card-lightbox").getAttribute("media-id");
        return domMediaId;
    };

};