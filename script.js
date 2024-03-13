const fileInput = document.querySelector(".file-input");
const previewImg = document.querySelector(".preview-img img");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const filterValue = document.querySelector(".filter-info .value");
const chooseImageBtn = document.querySelector(".choose-img");
const saveImageBtn = document.querySelector(".save-img");
const displayImageBtn = document.querySelector(".display-img");
const resetFilterBtn = document.querySelector(".reset-filter");
const imageCanvas = document.querySelector(".image_canvas");

let brightness = 100;
let saturation = 100;
let inversion = 0;
let grayscale = 0;
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;

const applyFilter = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brighness") {
      filterSlider.max = "200";
      filterSlider.value = `${brightness}`;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = `${saturation}`;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = `${inversion}`;
      filterValue.innerText = `${inversion}%`;
    } else if (option.id === "grayscale") {
      filterSlider.max = "100";
      filterSlider.value = `${grayscale}`;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = filterSlider.value + "%";
  const selectedFilter = document.querySelector(".filter .active");
  if (selectedFilter.id === "brighness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else if (selectedFilter.id === "grayscale") {
    grayscale = filterSlider.value;
  }
  applyFilter();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate = rotate - 90;
    } else if (option.id === "right") {
      rotate = rotate + 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilter();
  });
});

const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  applyFilter();
};

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);

  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }

  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  // document.body.appendChild(canvas);
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

const displayImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);

  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }

  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  imageCanvas.appendChild(canvas);
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImageBtn.addEventListener("click", saveImage);
displayImageBtn.addEventListener("click", displayImage);
chooseImageBtn.addEventListener("click", () => fileInput.click());

// SECOND ONE

let isDrawing = false;

window.addEventListener("load", () => {
  canvas1.width = canvas1.offsetWidth;
  canvas1.width = canvas1.offsetHeight;
});

const canvas1 = document.querySelector("canvas");
const ctx1 = canvas1.getContext("2d");
console.log(ctx1);

const startDraw = () => {
  isDrawing = true;
};

const drawing = (e) => {
  ctx1.lineTo(e.offsetX, e.offsetY);
  ctx1.stroke();
};

canvas1.addEventListener("mousedown", startDraw);
canvas1.addEventListener("mousemove", drawing);
canvas1.addEventListener("mouseup", () => (isDrawing = false));
