const auth = "563492ad6f91700001000001ee39bf7723944ecd87c8df3505321ff3";
const gallery = document.querySelector('.gallery');
const searchInp = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchVal;
let currentSearch;
let fetchLink;
let page = 1;


// Event Listeners

searchInp.addEventListener("input", updateInp);
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    currentSearch = searchVal;
    searchPhotos(searchVal);
});
more.addEventListener("click", loadMore);


// Functions

function updateInp(e){
    searchVal = e.target.value;
}

async function fetchApi(url){
    const data = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });
    const res = await data.json();
    return res;
}

function genPhotos(res){
    res.photos.forEach(photo =>{
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const res = await fetchApi(fetchLink);
    genPhotos(res);
}

curatedPhotos();

async function searchPhotos(search){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=1`;
    const res = await fetchApi(fetchLink);
    genPhotos(res);
}

function clear(){
    gallery.innerHTML = "";
    searchInp.value = "";
}

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

    const res = await fetchApi(fetchLink);
    genPhotos(res);
}
