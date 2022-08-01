const fileInput= document.querySelector(".file-input");
chooseImgBtn=document.querySelector(".choose-img");
previewImg=document.querySelector(".preview-img img")
filterOptions=document.querySelectorAll(".filter button")
filterName= document.querySelector(".filter-info .name")
filterValue= document.querySelector(".filter-info .value")
filterSlider= document.querySelector(".slider input")
rotateOptions= document.querySelectorAll(".rotate button")
resetFilterBtn= document.querySelector(".reset-filter")
saveImagBtn= document.querySelector(".save-img")

let brightness=100, saturation=100, invertion=0,grayscale=0;
let rotate=0, fliHorizontal=1; flipVertical=1;

const applyFilter=()=>{
    previewImg.style.transform= `rotate(${rotate}deg) scale(${fliHorizontal},${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${invertion}%) grayscale(${grayscale}%)`;
}

const loadImage=()=>{
    let file=fileInput.files[0];
    if(!file) return;
    previewImg.src=URL.createObjectURL(file);
    previewImg.addEventListener("load",()=>{
        document.querySelector(".container").classList.remove("disable");
    })
}


filterOptions.forEach((option)=>{
    option.addEventListener("click",()=>{
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active");
        filterName.innerText=option.innerText;
        
        if(option.id==="brightness"){
            filterSlider.max="200";
            filterSlider.value=`${brightness}%`;
            filterValue.innerText=`${brightness}%`
        }else if(option.id==="saturation"){
            filterSlider.max="200";
            filterSlider.value=`${saturation}%`;
            filterValue.innerText=`${saturation}%`
        }else if(option.id==="invertion"){
            filterSlider.max="100";
            filterSlider.value=`${invertion}%`;
            filterValue.innerText=`${invertion}%`
        }else if(option.id==="grayscale"){
            filterSlider.max="100";
            filterSlider.value=`${grayscale}%`;
            filterValue.innerText=`${grayscale}%`
        }


    })
})

const updateFilter=()=>{
    filterValue.innerText=`${filterSlider.value}%`
    const selectedFilter=document.querySelector(".filter .active")
    
    if(selectedFilter.id === "brightness"){
        brightness=filterSlider.value;
    }else if(selectedFilter.id ==="saturation"){
        saturation=filterSlider.value;
    }else if(selectedFilter.id ==="invertion"){
        invertion=filterSlider.value;
    }else if(selectedFilter.id ==="grayscale"){
        grayscale=filterSlider.value;
    }
    applyFilter();
}






rotateOptions.forEach(option=>{
    option.addEventListener("click",()=>{

        if(option.id==="left"){
            rotate -=90;
        }else if(option.id==="right"){
            rotate +=90;
        }else if(option.id==="horizontal"){
            fliHorizontal= fliHorizontal===1 ? -1: 1;
        }else if(option.id==="vertical"){
            flipVertical= flipVertical===1 ? -1: 1;
        }
        applyFilter()
     
    })
})


const resetFilter=()=>{
    brightness=100, saturation=100, invertion=0,grayscale=0;
    rotate=0, fliHorizontal=1; flipVertical=1;
    filterOptions[0].click();
    applyFilter();
}


const saveImage=()=>{
    const canvas=document.createElement("canvas");
    const ctx= canvas.getContext("2d");
    canvas.width=previewImg.naturalWidth;
    canvas.height=previewImg.naturalHeight;
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${invertion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2,canvas.height / 2)
    if(rotate!==0){
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(fliHorizontal, flipVertical)
    ctx.drawImage(previewImg,-canvas.width / 2,-canvas.height / 2,canvas.width,canvas.height);
    const link= document.createElement("a");
    link.download="image.jpg";
    link.href=canvas.toDataURL();
    link.click();
}



fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click",resetFilter);
saveImagBtn.addEventListener("click",saveImage);
chooseImgBtn.addEventListener("click",()=>{
    fileInput.click();
})