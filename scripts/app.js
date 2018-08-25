
(() => {
    //const API_KEY = /* INSERT API KEY  */;
    let searchText = "";
    let limit = 8;

    // DOM Elements
    let imageGallery = document.querySelector(".image-gallery");
    let searchField = document.getElementById("search-term");
    let loadMore = document.querySelector(".load-more");

    document.getElementById("submit").addEventListener("click", loadSearch);
    loadMore.addEventListener("click", loadMoreGIFS);

    window.addEventListener("load", loadTrending);


    // Get Data Functions
    function loadTrending() {
        let URL = "http://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY;
        getGIFS(URL);
    }


    function loadSearch(event) {
        event.preventDefault();

        if (searchField.value === "") return;

        loadMore.style.display = "block";

        clearElement(imageGallery);
        limit = 8;

        searchText = searchField.value.split(" ").join("+").toLowerCase().trim();
        createURL(searchText)
    }


    function loadMoreGIFS(event) {
        event.preventDefault();
        clearElement(imageGallery);

        limit += 8;
        if (limit >= 25) {
            limit = 25;
            loadMore.style.display = "none";
        }

        createURL(searchText)
    }

    function createURL(searchText) {
        let URL = `http://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${API_KEY}&limit=${limit}`;
        searchField.value = "";
        getGIFS(URL);
    }


    function getGIFS(url) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                let gifData = JSON.parse(this.responseText);

                for (let i = 0; i < gifData.data.length; i++) {
                    generateImages(gifData.data[i].images.downsized_large.url);
                }
            }
        }

        xhr.send();
    }


    // Helper Functions
    function generateImages(url) {

        let div = document.createElement("div");

        div.className = "image-img";
        div.style.background = "url(" + url + ")";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundPosition = "center";
        div.style.backgroundSize = "cover";

        imageGallery.appendChild(div);
    }


    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
})();