const gallery = document.querySelector(".gallery");

let count = 0;

document.addEventListener('drop',event=>event.preventDefault());
document.addEventListener('dragover',event=>event.preventDefault());

gallery.addEventListener('drop',event => {
    event.preventDefault();
    if(event.dataTransfer.files[0] && event.dataTransfer.files[0].type.startsWith("image")){
        const file = event.dataTransfer.files[0];
        const url = URL.createObjectURL(file);
        addToGallery(url);
    }
})

document.querySelector(".buttonLoad").addEventListener("click",()=>{
    if(document.querySelector(".filePath").value !==""){
        const file = document.querySelector(".filePath").files[0];
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
        console.log(document.querySelector(".fileUrl").value)
        const url = document.querySelector(".fileUrl").value;
        addToGallery(url)
    }
    document.querySelector(".fileUrl").value = "";
    document.querySelector(".filePath").value = "";

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

document.addEventListener("dragstart",event=>{
    console.log(event.target)   
    event.dataTransfer.setData('id',event.target.id)
})

document.querySelector(".trash").addEventListener('drop',event => {
    event.target.classList.remove("open");
    const img = document.getElementById(event.dataTransfer.getData("id"));
    gallery.removeChild(img);
    console.log(img)
})

document.querySelector(".trash").addEventListener("dragover",event => {
    event.target.classList.add("open");
    console.log(event.target)
})
document.querySelector(".trash").addEventListener("dragleave",event => {
    event.target.classList.remove("open");
    console.log("leave")
})
