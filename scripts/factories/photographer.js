function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id, description } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const wayUrl = "photographer.html";
        const url = `${wayUrl}?photographer=${id}`;
        article.innerHTML = `
        <a href=${url}>
        <img src=${picture} class="profil-picture" alt="photo de ${name}">
        <h2 class="photographer-profil" aria-label="${name}">${name}
        </h2>
        </a>
        <div class="photographer-info" tabindex="0">
        <h3 class="city" >${city}, ${country}</h3>
        <p class ="tagline" >${tagline}</p>
        <p class="price" >${price}€/jour</p>
        </div>`;
        return (article);
    }


    return { name, picture, getUserCardDOM };
}