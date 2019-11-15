/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* module.exports = function test() {
  return 32;
}; */
import './assets/styles/style.scss';

window.addEventListener('load', () => {
  /* Canvas */
  const canvas = document.getElementById('canv');
  const ctx = canvas.getContext('2d');
  /* Painting permission */
  let painting = false;
  /* Calculate canvas size */
  let canvasSize = 128;
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const RESOLUTION = 512;
  let resolutionRate = RESOLUTION / canvasSize;
  /* Get draw color */
  const currentColorNode = document.getElementById('currentColor');
  const prevColorNode = document.getElementById('prevColor');
  const imageSizeRange = document.getElementById('imageSize');
  const grayScale = document.getElementById('grayscale');
  let currentColor;
  let prevColor;
  let state = {};

  function getState() {
    if (localStorage.getItem('state')) {
      // load state
      state = JSON.parse(localStorage.getItem('state'));
      // load colors
      state.currentColor ? currentColor = state.currentColor : currentColor = '#ffffff';
      currentColorNode.value = currentColor;
      state.prevColor ? prevColor = state.prevColor : prevColor = '#000000';
      prevColorNode.value = prevColor;
      // load saved image
      // eslint-disable-next-line no-use-before-define
      state.canvasImgFromState ? loadCanvas(null, state.canvasImgFromState) : null;
    } else {
      currentColor = '#ffffff';
      currentColorNode.value = currentColor;
      prevColor = '#000000';
      prevColorNode.value = prevColor;
    }
  }
  getState();
  /* Save application state */
  function appStateSaver(option, field) {
    if (option === 'currentColor') {
      state.currentColor = field;
    }
    if (option === 'prevColor') {
      state.prevColor = field;
    }
    if (option === 'canvasImgFromState') {
      state.canvasImgFromState = field;
      console.log(field);
    }
    localStorage.setItem('state', JSON.stringify(state));
  }
  /* First color (current color) picker */
  function currentColorPicker(e) {
    prevColorNode.value = currentColor;
    prevColor = currentColor;
    appStateSaver('prevColor', prevColor);
    currentColor = e.target.value;
    appStateSaver('currentColor', currentColor);
    console.log('sfa');
  }

  /* Second color (prev color) picker */
  function prevColorPicker(e) {
    e.preventDefault();
    const tempColor = currentColor;
    currentColorNode.value = prevColor;
    currentColor = prevColor;
    appStateSaver('currentColor', currentColor);
    prevColorNode.value = tempColor;
    prevColor = tempColor;
    appStateSaver('prevColor', tempColor);
  }
  /* Bucket */
  function paintBucket() {
    /* const canvasWidth = 32;
    const startX = Math.floor(e.offsetX / resolutionRate);
    const startY = Math.floor(e.offsetY / resolutionRate);
    const pixelStack = [[startX, startY]];
    const imgData = ctx.getImageData(Math.floor(e.offsetX / resolutionRate), Math.floor(e.offsetY / resolutionRate), 1, 1);
    const startColor = [imgData.data[0], imgData.data[1], imgData.data[2]];
    console.log(startColor); */
    ctx.fillStyle = currentColor;
    ctx.rect(0, 0, canvasSize, canvasSize);
    ctx.fill();
  }
  /* Permissions for draw */
  function startDraw() {
    painting = true;
  }

  function endDraw() {
    painting = false;
  }
  function colorPickerInstrument(e) {
    const rgbToHex = function (rgb) {
      let hex = Number(rgb).toString(16);
      if (hex.length < 2) {
        hex = `0${hex}`;
      }
      return hex;
    };
    const fullColorHex = function (r, g, b) {
      const red = rgbToHex(r);
      const green = rgbToHex(g);
      const blue = rgbToHex(b);
      return red === '00' && green === '00' && blue === '00' ? 'ffffff' : red + green + blue;
    };
    const getColor = ctx.getImageData(Math.floor(e.offsetX / resolutionRate), Math.floor(e.offsetY / resolutionRate), 1, 1);
    currentColor = `#${fullColorHex(getColor.data[0], getColor.data[1], getColor.data[2])}`;
    ctx.fillStyle = currentColor;
    currentColorNode.value = currentColor;
    ctx.save();
    appStateSaver('currentColor', currentColor);
  }
  /* Bresenghem */
  function bresenhamLine(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const sx = x1 < x2 ? 1 : -1;
    const dy = -Math.abs(y2 - y1);
    const sy = y1 < y2 ? 1 : -1;
    let e2;
    let er = dx + dy;
    let end = false;
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    while (!end) {
      ctx.rect(x1, y1, 1, 1);
      if (x1 === x2 && y1 === y2) {
        end = true;
      } else {
        e2 = 2 * er;
        if (e2 > dy) {
          er += dy;
          x1 += sx;
        }
        if (e2 < dx) {
          er += dx;
          y1 += sy;
        }
      }
    }
    ctx.fill();
  }
  /* Draw line */
  function drawLine(e) {
    if (painting) {
      ctx.beginPath();
      ctx.fillStyle = currentColor;
      // eslint-disable-next-line max-len
      ctx.fillRect(Math.floor(e.offsetX / resolutionRate), Math.floor(e.offsetY / resolutionRate), 1, 1);
      ctx.stroke();
    }
  }

  /* Remove all events */
  const eventList = [];
  function removeEvents() {
    eventList.map((item) => {
      canvas.removeEventListener('mousedown', item[Object.keys(item)[0]]);
      canvas.removeEventListener('mouseup', item[Object.keys(item)[0]]);
      canvas.removeEventListener('mousemove', item[Object.keys(item)[0]]);
      return canvas;
    });
  }
  let pencil;
  let bucket;
  let colorPicker;
  let bresenham;
  let globalX1;
  let globalY1;
  let globalX2;
  let globalY2;
  function startPos(eDown) {
    globalX1 = Math.floor(eDown.offsetX / resolutionRate);
    globalY1 = Math.floor(eDown.offsetY / resolutionRate);
  }
  function endPos(eUp) {
    globalX2 = Math.floor(eUp.offsetX / resolutionRate);
    globalY2 = Math.floor(eUp.offsetY / resolutionRate);
    bresenhamLine(globalX1, globalY1, globalX2, globalY2);
  }
  /* Do something according to option */
  function chosenElement() {
    // Clean all active items and remove events, before add new
    document.querySelectorAll('.instrument').forEach((item) => {
      item.classList.remove('active');
    });
    // Add new events
    this.classList.add('active');
    if (this.id === 'pencil') {
      removeEvents();
      eventList.length = 0;
      canvas.addEventListener('mousedown', startDraw);
      canvas.addEventListener('mouseup', endDraw);
      canvas.addEventListener('mousemove', drawLine);
      eventList.push({ startDraw }, { endDraw }, { drawLine });
    }
    if (this.id === 'bresenham') {
      removeEvents();
      eventList.length = 0;
      canvas.addEventListener('mousedown', startPos);
      canvas.addEventListener('mouseup', endPos);
      eventList.push({ startPos }, { endPos });
    }
    if (this.id === 'colorPicker') {
      removeEvents();
      eventList.length = 0;
      canvas.addEventListener('mousedown', colorPickerInstrument);
      eventList.push({ colorPickerInstrument });
    }
    if (this.id === 'paintBucket') {
      removeEvents();
      eventList.length = 0;
      canvas.addEventListener('mousedown', paintBucket);
      eventList.push({ paintBucket });
    }
  }
  /* Init keyboard events */
  function keyBoardEvents(e) {
    console.log(e);
    if (e.keyCode === 80) {
      pencil = document.getElementById('pencil');
      chosenElement.apply(pencil);
    }
    if (e.keyCode === 66) {
      bucket = document.getElementById('paintBucket');
      chosenElement.apply(bucket);
    }
    if (e.keyCode === 67) {
      colorPicker = document.getElementById('colorPicker');
      chosenElement.apply(colorPicker);
    }
  }

  /* Init drawing elements */
  function initElements() {
    pencil = document.getElementById('pencil');
    pencil.addEventListener('click', chosenElement.bind(pencil));
    bucket = document.getElementById('paintBucket');
    bucket.addEventListener('click', chosenElement.bind(bucket));
    colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('click', chosenElement.bind(colorPicker));
    bresenham = document.getElementById('bresenham');
    bresenham.addEventListener('click', chosenElement.bind(bresenham));
  }

  /* Save and load to local or from server */
  function saveCanvas() {
    const toData = canvas.toDataURL('image/jpeg', 1.0);
    appStateSaver('canvasImgFromState', toData);
  }
  function loadCanvas(e, img) {
    const image = new Image();
    if (!img) {
      image.src = state.canvasImgFromState;
    } else {
      image.setAttribute('crossorigin', 'anonymous');
      image.src = img;
      window.imgUrl = img;
    }
    image.onload = function () {
      ctx.drawImage(image, 0, 0, canvasSize, canvasSize);
    };
  }
  /* Load random image from server  */
  const loadRandomImgButton = document.getElementById('loadRandomImgButton');
  async function loadRandomImage() {
    const citySearchValue = document.getElementById('citySearch').value;
    const url = `https://api.unsplash.com/photos/random?query=town,${citySearchValue}&client_id=0eca6307463dee5325a2ae91a9da38db508f782489581ce710b85697aad07d09`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        loadCanvas(null, data.urls.small);
      });
  }
  function onRangeChange(e) {
    canvasSize = e.target.value * 64;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    resolutionRate = RESOLUTION / canvasSize;
    loadCanvas(null, window.imgUrl);
  }
  loadRandomImgButton.addEventListener('click', loadRandomImage);
  /* Grayscale */
  function grayScaleImg() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  }
  /* Events for load and save state */
  const saveToLocalStorage = document.getElementById('saveToLocalStorage');
  saveToLocalStorage.addEventListener('click', saveCanvas);
  const loadFromLocalStorage = document.getElementById('loadFromLocalStorage');
  loadFromLocalStorage.addEventListener('click', loadCanvas);
  /* Event listeners */
  currentColorNode.addEventListener('change', currentColorPicker);
  prevColorNode.addEventListener('click', prevColorPicker);
  document.addEventListener('keydown', keyBoardEvents);
  imageSizeRange.addEventListener('change', onRangeChange);
  grayScale.addEventListener('click', grayScaleImg);
  initElements();
});
