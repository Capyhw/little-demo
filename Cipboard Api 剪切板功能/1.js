//左侧
//Type:Text
const textbox = document.querySelector(".textbox");
const textArea = document.querySelector("textarea");
const textbutton = textbox.querySelector("button");

//Type:HTML
const htmlbox = document.querySelector(".htmlbox");
const htmlp = htmlbox.querySelector("p");
const htmlbutton = htmlbox.querySelector("button");

//Type:JPG
const jpgbox = document.querySelector(".jpgbox");
const jpgimg = jpgbox.querySelector("img");
const jpgbutton = jpgbox.querySelector("button");

//事件监听
const { clipboard } = navigator;
textbutton.addEventListener("click", copyText);
htmlbutton.addEventListener("click", copyHtml);
jpgbutton.addEventListener("click", copyJpg);

//右侧
const historyitems = document.querySelector(".items");
const historyitem = document.querySelector(".item");
const itemType = historyitem.querySelector(".item-type");
const itemContent = historyitem.querySelector(".item-content");

async function copyText() {
  let text = textArea.value;
  if (!text) return;
  await clipboard.writeText(text);
  await updateHistory();
}

async function copyHtml() {
  let html = htmlp.innerHTML;
  const blob = new Blob([html], { type: "text/html" });
  const data = [
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ];
  await clipboard.write(data);
  await updateHistory();
}

async function copyJpg() {
  /*  这种写法只对应PNG     
  let res = await fetch(jpgimg.src);
  const blob = await res.blob();
  const data = [
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ]; */
  let res = await fetch(jpgimg.src);
  const jpgblob = await res.blob();
  console.log(jpgblob);
  const pngblob = await convertJpegToPng(
    jpgblob,
    jpgimg.naturalWidth,
    jpgimg.naturalHeight
  );
  const data = [
    new ClipboardItem({
      [pngblob.type]: pngblob,
    }),
  ];
  await clipboard.write(data);
  await updateHistory();
}

async function updateHistory() {
  // get all clipboard history
  const items = await clipboard.read();
  for (const item of items) {
    console.log("clipboardItem", item);
    for (const type of item.types) {
      // get clipboardItem's content in type of blob
      const blob = await item.getType(type);
      console.log("type", type);

      const itemDOM = historyitems.firstElementChild.cloneNode(true);
      const typeDOM = itemDOM.querySelector(".item-type");
      const contentDOM = itemDOM.querySelector(".item-content");
      console.log(contentDOM);
      // text item
      if (type === "text/plain") {
        // console.log('text', await blob.text());
        typeDOM.textContent = "Text";
        contentDOM.textContent = await blob.text();
      } else if (type === "text/html") {
        // HTML item
        // console.log('html', await blob.text());
        typeDOM.textContent = "HTML";
        contentDOM.innerHTML = await blob.text();
      } else if (type === "image/png") {
        // Png item
        typeDOM.textContent = "PNG Image";
        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        contentDOM.replaceChildren(img)
      }

      historyitems.prepend(itemDOM);
    }
  }
}

async function convertJpegToPng(jpgBlob, naturalWidth, naturalHeight) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    // set canvas size to the jpeg image's natrual size
    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
    const img = document.createElement("img");
    img.onload = function () {
      context.drawImage(img, 0, 0, naturalWidth, naturalHeight);
      canvas.toBlob(
        function (blob) {
          if (blob) resolve(blob);
          else reject("Cannot get blob from image");
        },
        "image/png", // image format is png
        1 // image quality is the best
      );
    };
    img.src = URL.createObjectURL(new Blob([jpgBlob]));
  });
}
