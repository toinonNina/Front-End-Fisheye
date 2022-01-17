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
        <h2 class="photographerprofil">${name}
        </h2>
        </a>
        <div class="photographerinfo">
        <p class="city">${city}, ${country}</p>
        <p class ="tagline">${tagline}</p>
        <p class="price">${price}€/jour</p>
        </div>`;
        return (article);
    }
    return { name, picture, getUserCardDOM };
}