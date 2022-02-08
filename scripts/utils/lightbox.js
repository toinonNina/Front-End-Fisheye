function displayLightbox() {
    const modal = document.querySelector('.slider-media-container');
    const containerimg = document.querySelector('.lightbox-container');
    const close = document.querySelector(".lightbox-close");

    const links = Array.from(document.querySelectorAll('a[href$=".png"],a[href$=".jpg"],a[href$=".mp4"]'));

    const gallery = links.map(link => link.getAttribute('href'));

    const title = links.map(link => link.getAttribute('id'));
    console.log(title);

    console.log(gallery);

    links.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        let href = link.getAttribute('href');
        let index = gallery.indexOf(href);
        console.log(index);
        modal.classList.add('show');
        modal.focus();
        console.log(link.href);
        let url = link.href;
        // let unplit = url.split("/")[5];
        // console.log(unplit);
        console.log(link);
        const idlink = link.getAttribute('id');
        console.log(idlink);
        newidTtitle = idlink.replaceAll("-", " ");
        console.log(newidTtitle);
        extlink = url.substring(url.lastIndexOf('.') + 1);
        console.log(extlink);
        Lightboxbtnclose();
        nextarrow(gallery, title, link, index);
        prevarrow(gallery, title, link, index);

        if (extlink == ('jpg')) {
            containerimg.innerHTML = ` <figure>
                <img src="${link}" alt="${newidTtitle}">
                <figcaption>${newidTtitle}</figcaption>
            </figure>`;
        } else {
            containerimg.innerHTML = `<figure>
                 <video title="${newidTtitle}" preload="metadata" controls autoplay  >
                 <source src="${link}" type="video/mp4">
               </video>
                 <figcaption>${newidTtitle}</figcaption>
             </figure>
            `;
        }


    }));

}
/**
 * ferme la LightBox
 * @param {MouseEvent} e
 * @param {keyboardEvent} e
 */
function Lightboxbtnclose() {
    const container = document.querySelector(".slider-media-container");
    const close = document.querySelector(".lightbox-close");
    close.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.remove('show');
        }

    );
    close.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === 'Escape') {
                container.classList.remove('show');
            }
        }

    );
};


function nextarrow(gallery, title, link, index) {

    const next = document.querySelector('.lightbox-next');
    next.addEventListener('click', (e) => {

        e.preventDefault();


        console.log('ok');
        if (index > -1 && index < gallery.length - 1) {
            index++;
            console.log(index);
            updatelightbox(gallery[index], title[index], index);

        } else if (index == gallery.length - 1) {
            index = 0;
            console.log(index);
            updatelightbox(gallery[0], title[0], index);
        }
    });
}

function prevarrow(gallery, title, link, index) {

    const prev = document.querySelector('.lightbox-prev');
    prev.addEventListener('click', (e) => {

        e.preventDefault();
        console.log('ok');
        if (index > 0) {
            index--;
            console.log(index);
            updatelightbox(gallery[index], title[index], );
        } else if (index == 0) {
            index = gallery.length - 1;
            console.log(index);
            updatelightbox(gallery[-1], title[-1], );
        }



    });
}

function updatelightbox(gallery, title) {
    const containerimg = document.querySelector('.lightbox-container');
    console.log(gallery);
    newidTtitle = title.replaceAll("-", " ");
    console.log(title);

    // extname = newlink.substring(newlink);
    extlink = gallery.substring(gallery.lastIndexOf('.') + 1);
    console.log(extlink);
    if (extlink == ('jpg')) {
        containerimg.innerHTML = ` <figure>
                <img src="${gallery}" alt="${newidTtitle}">
                <figcaption>${newidTtitle}</figcaption>
            </figure>`;
    } else if (extlink == ('mp4')) {
        containerimg.innerHTML = `<figure>
                 <video title="${newidTtitle}" preload="metadata" controls autoplay  >
                 <source src="${gallery}" type="video/mp4">
               </video>
                 <figcaption>${newidTtitle}</figcaption>
             </figure>
            `;
    }
}