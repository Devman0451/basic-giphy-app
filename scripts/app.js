
const API_KEY = 'xu1XZQwBXKXaU296EbB91f2VNViUUKcf';


//let imageDivs = [...document.querySelectorAll('.image-img')];
let imageGallery = document.querySelector('.image-gallery');
document.getElementById('submit').addEventListener('click', loadTrending);


function loadTrending(event) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.giphy.com/v1/gifs/trending?api_key=' + API_KEY), true;

    xhr.onload = function () {
        if (this.status == 200) {
            let gifData = JSON.parse(this.responseText);
            
            for (let i = 0; i < gifData.data.length; i++) {
                generateImages(gifData.data[i].images.downsized_large.url);
            }
        }
    }

    xhr.send();
    event.preventDefault();
}


function generateImages(url) {
    let div = document.createElement("div");

    div.className = "image-img";
    div.style.background = "url(" + url + ")";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundPosition = "center";
    div.style.backgroundSize = "cover";

    imageGallery.appendChild(div);
}