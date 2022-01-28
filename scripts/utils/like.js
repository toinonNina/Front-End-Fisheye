function likeincremente() {

    let heart = document.querySelectorAll(".infos-Likes-Icon");
    const totalLikes = document.querySelector(".valueTotalLike");
    // console.log(valuelike);
    // console.log(heart);
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener("click", function(event) {
            event.preventDefault;
            // console.log("ok");
            let buttonclicked = event.target;
            let likespan = buttonclicked.parentElement.children[1];
            // console.log(likespan);
            let valeur = parseInt(likespan.textContent);
            // console.log(valeur);
            let newvalue = valeur + 1;
            // console.log(newvalue);
            likespan.textContent = `${newvalue}`;
            currenttotalLike = parseInt(totalLikes.textContent);
            // console.log(currenttotalLike);
            let newtotalLike = currenttotalLike + 1;
            totalLikes.textContent = `${newtotalLike}`;

        });
    }
}