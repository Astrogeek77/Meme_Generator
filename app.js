const imageFileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");

// imageFileInput.addEventListener('change', (e) => {
//   // Get the selected file
//   const [file] = e.target.files;
//   // Get the file name and size
//   const { name: fileName, size } = file;
//   // Convert size in bytes to kilo bytes
//   const fileSize = (size / 1000).toFixed(2);
//   // Set the text content
//   const fileNameAndSize = `${fileName} - ${fileSize}KB`;
//   document.querySelector('.file-name').textContent = fileNameAndSize;
// });

let image;

imageFileInput.addEventListener("change", (e) => {
  const imageDataUrl = URL.createObjectURL(e.target.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value
      );
    },
    { once: true }
  );
});

topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // Update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // Add top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}

// const btnDownload = document.querySelector(".btn-download");
// // let img = document.querySelector('img');
// // Must use FileSaver.js 2.0.2 because 2.0.3 has issues.
// btnDownload.addEventListener("click", () => {
//   let imagePath = image.src;
//   console.log({ imagePath });
//   let fileName = getFileName(imagePath);
//   console.log({ fileName });
//   saveAs(imagePath, fileName);
// });
// function getFileName(str) {
//   return str.substring(str.lastIndexOf("/") + 1);
// }


download_image = async () => {
  var canvas = document.getElementById("meme");
  image = await canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = await document.createElement('a');
  link.download = "meme.png";
  link.href = image;
  link.click();
}
