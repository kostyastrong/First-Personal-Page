const gallery = document.getElementById("gallery")

window.onmousedown = e => {
    gallery.dataset.mousePosition = e.clientX;
}

window.onmousemove = e => {
    if (gallery.dataset.mousePosition === "0") {
        return;
    }
    const delta = parseFloat(gallery.dataset.mousePosition) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = -(delta / maxDelta) * 100;
    let nextPercentage = parseFloat(gallery.dataset.mousePrevPosition) + percentage;
    
    if (nextPercentage > 0) {
        nextPercentage = 0;
    }
    if (nextPercentage < -100) {
        nextPercentage = -100;
    }
    
    gallery.dataset.percentage = nextPercentage;
    // gallery.style.transform = 'translate(${percentage}%, -50%)';

    
    gallery.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 600, fill: "forwards" });

    for (const image of gallery.getElementsByClassName("gallery_img")) {
        
        image.animate({
            objectPosition: `${nextPercentage + 100}% center`
          }, { duration: 600, fill: "forwards" });
    }
}

window.onmouseup = e => {
    gallery.dataset.mousePosition = "0";
    gallery.dataset.mousePrevPosition = gallery.dataset.percentage;
}