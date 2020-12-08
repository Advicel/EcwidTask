"use strict"
const gallery = document.querySelector(".gallery");
let images;
let count = 0;

document.addEventListener('drop',event=>event.preventDefault());
document.addEventListener('dragover',event=>event.preventDefault());
document.querySelector(".buttonLoad").addEventListener("click",buttonLoadClick);
gallery.addEventListener("dragstart",event=>event.dataTransfer.setData('id',event.target.id))

gallery.addEventListener('drop',event => {
    event.preventDefault();
    if(event.dataTransfer.files[0] && event.dataTransfer.files[0].type.startsWith("image")){
        const file = event.dataTransfer.files[0];
        const url = URL.createObjectURL(file);
        addToGallery(url);
    }
})
gallery.addEventListener('click',event=>{
    const id = event.target.id;
    const img = document.getElementById(id);
    img.classList.toggle("active");
})

document.querySelector(".trash").addEventListener('drop',event => {
    event.target.classList.remove("open");
    const img = document.getElementById(event.dataTransfer.getData("id"));
    gallery.removeChild(img);
})
document.querySelector(".trash").addEventListener('click',event => {
    document.querySelectorAll(".active").forEach(img=>{
        gallery.removeChild(img);
    })
})

document.querySelector(".trash").addEventListener("mouseover",event => {
    event.target.classList.add("open");
})
document.querySelector(".trash").addEventListener("mouseleave",event => {
    event.target.classList.remove("open");
})

function buttonLoadClick(){
    const filePath = document.querySelector(".filePath");
    const fileUrl = document.querySelector(".fileUrl");
    if(filePath.value !==""){
        const file = filePath.files[0];
        if(file.type.endsWith("json")){        
            getDataFromJSON(file).then(data=>{
                data.galleryImages.forEach(element => {
                    addToGallery(element.url);
                });
            });
        }
        else if(file.type.startsWith("image")){
            const url = URL.createObjectURL(file);
            addToGallery(url)
        }
    } else if(document.querySelector(".fileUrl").value !==""){
        const url = fileUrl.value;
        addToGallery(url)
    }
    fileUrl.value = "";
    filePath.value = "";
}

async function getDataFromJSON(file) {
    const url = URL.createObjectURL(file);
    let response = await fetch(url);
    const data = await response.json();
    return data;
}   

function addToGallery(url){
    const image = document.createElement('img');
    image.src = url;
    image.id = count++;
    gallery.appendChild(image);
    images = document.querySelectorAll("img");
}
