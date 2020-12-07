const gallery = document.querySelector(".gallery");
let count = 0;

document.addEventListener('drop',event=>event.preventDefault());
document.addEventListener('dragover',event=>event.preventDefault());

gallery.addEventListener('drop',event => {
    event.preventDefault();
    if(event.dataTransfer.files[0].type.startsWith("image")){
        const file = event.dataTransfer.files[0];
        const url = URL.createObjectURL(file);
        addToGallery(url);
    }
})

document.querySelector(".buttonLoad").addEventListener("click",()=>{
    const file = document.querySelector(".filePath").files[0];
    getDataFromJSON(file).then(data=>{
        data.galleryImages.forEach(element => {
            addToGallery(element.url);
        });
    });
})

function addToGallery(url){
    const image = document.createElement('img');
    image.src = url;
    image.id = count++;
    gallery.appendChild(image);
}

async function getDataFromJSON(file) {
    const url = URL.createObjectURL(file);
    let response = await fetch(url);
    const data = await response.json();
    return data;
}   