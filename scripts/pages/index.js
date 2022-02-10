async function getPhotographers() {
    let data = "";
    await fetch('data/photographers.json').then(async response => {
        try {
            data = await response.json();
        } catch (error) {
            console.log(error);
        }
    });
    return ({
        photographers: [...data.photographers]
    });
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();