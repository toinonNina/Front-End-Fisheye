function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id, description } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const wayUrl = "photographer.html";
        const url = `${wayUrl}?photographer=${id}`;
        article.innerHTML = `
        <a href=${url}>
        <img src=${picture} class="profilpicture" alt="${description}">
        <h2 class="photographerprofil" aria-label="${name}">${name}
        </h2>
        </a>
        <div class="photographerinfo">
        <h3 class="city" tabindex="0">${city}, ${country}</h3>
        <p class ="tagline" tabindex="0">${tagline}</p>
        <p class="price" tabindex="0">${price}€/jour</p>
        </div>`;
        return (article);
    }


    return { name, picture, getUserCardDOM };
}