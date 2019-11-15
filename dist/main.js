!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);window.addEventListener("load",()=>{const e=document.getElementById("canv"),t=e.getContext("2d");let n=!1,r=128;e.width=r,e.height=r;const a=512;let o=a/r;const i=document.getElementById("currentColor"),s=document.getElementById("prevColor"),c=document.getElementById("imageSize"),u=document.getElementById("grayscale");let l,p,d={};function f(e,t){"currentColor"===e&&(d.currentColor=t),"prevColor"===e&&(d.prevColor=t),"canvasImgFromState"===e&&(d.canvasImgFromState=t,console.log(t)),localStorage.setItem("state",JSON.stringify(d))}function m(){t.fillStyle=l,t.rect(0,0,r,r),t.fill()}function g(){n=!0}function h(){n=!1}function b(e){const n=function(e){let t=Number(e).toString(16);return t.length<2&&(t=`0${t}`),t},r=t.getImageData(Math.floor(e.offsetX/o),Math.floor(e.offsetY/o),1,1);l=`#${function(e,t,r){const a=n(e),o=n(t),i=n(r);return"00"===a&&"00"===o&&"00"===i?"ffffff":a+o+i}(r.data[0],r.data[1],r.data[2])}`,t.fillStyle=l,i.value=l,t.save(),f("currentColor",l)}function w(e){n&&(t.beginPath(),t.fillStyle=l,t.fillRect(Math.floor(e.offsetX/o),Math.floor(e.offsetY/o),1,1),t.stroke())}localStorage.getItem("state")?(d=JSON.parse(localStorage.getItem("state")),l=d.currentColor?d.currentColor:"#ffffff",i.value=l,p=d.prevColor?d.prevColor:"#000000",s.value=p,d.canvasImgFromState&&O(null,d.canvasImgFromState)):(l="#ffffff",i.value=l,p="#000000",s.value=p);const v=[];function x(){v.map(t=>(e.removeEventListener("mousedown",t[Object.keys(t)[0]]),e.removeEventListener("mouseup",t[Object.keys(t)[0]]),e.removeEventListener("mousemove",t[Object.keys(t)[0]]),e))}let y,E,k,I,L,S,C,j;function B(e){L=Math.floor(e.offsetX/o),S=Math.floor(e.offsetY/o)}function M(e){C=Math.floor(e.offsetX/o),j=Math.floor(e.offsetY/o),function(e,n,r,a){const o=Math.abs(r-e),i=e<r?1:-1,s=-Math.abs(a-n),c=n<a?1:-1;let u,p=o+s,d=!1;for(t.fillStyle=l,t.beginPath();!d;)t.rect(e,n,1,1),e===r&&n===a?d=!0:((u=2*p)>s&&(p+=s,e+=i),u<o&&(p+=o,n+=c));t.fill()}(L,S,C,j)}function _(){document.querySelectorAll(".instrument").forEach(e=>{e.classList.remove("active")}),this.classList.add("active"),"pencil"===this.id&&(x(),v.length=0,e.addEventListener("mousedown",g),e.addEventListener("mouseup",h),e.addEventListener("mousemove",w),v.push({startDraw:g},{endDraw:h},{drawLine:w})),"bresenham"===this.id&&(x(),v.length=0,e.addEventListener("mousedown",B),e.addEventListener("mouseup",M),v.push({startPos:B},{endPos:M})),"colorPicker"===this.id&&(x(),v.length=0,e.addEventListener("mousedown",b),v.push({colorPickerInstrument:b})),"paintBucket"===this.id&&(x(),v.length=0,e.addEventListener("mousedown",m),v.push({paintBucket:m}))}function O(e,n){const a=new Image;n?(a.setAttribute("crossorigin","anonymous"),a.src=n,window.imgUrl=n):a.src=d.canvasImgFromState,a.onload=function(){t.drawImage(a,0,0,r,r)}}document.getElementById("loadRandomImgButton").addEventListener("click",(async function(){const e=`https://api.unsplash.com/photos/random?query=town,${document.getElementById("citySearch").value}&client_id=0eca6307463dee5325a2ae91a9da38db508f782489581ce710b85697aad07d09`;await fetch(e).then(e=>e.json()).then(e=>{O(0,e.urls.small)})})),document.getElementById("saveToLocalStorage").addEventListener("click",(function(){f("canvasImgFromState",e.toDataURL("image/jpeg",1))})),document.getElementById("loadFromLocalStorage").addEventListener("click",O),i.addEventListener("change",(function(e){s.value=l,f("prevColor",p=l),f("currentColor",l=e.target.value),console.log("sfa")})),s.addEventListener("click",(function(e){e.preventDefault();const t=l;i.value=p,f("currentColor",l=p),s.value=t,p=t,f("prevColor",t)})),document.addEventListener("keydown",(function(e){console.log(e),80===e.keyCode&&(y=document.getElementById("pencil"),_.apply(y)),66===e.keyCode&&(E=document.getElementById("paintBucket"),_.apply(E)),67===e.keyCode&&(k=document.getElementById("colorPicker"),_.apply(k))})),c.addEventListener("change",(function(t){r=64*t.target.value,e.width=r,e.height=r,o=a/r,O(0,window.imgUrl)})),u.addEventListener("click",(function(){const n=t.getImageData(0,0,e.width,e.height),r=n.data;for(let e=0;e<r.length;e+=4){const t=(r[e]+r[e+1]+r[e+2])/3;r[e]=t,r[e+1]=t,r[e+2]=t}t.putImageData(n,0,0)})),(y=document.getElementById("pencil")).addEventListener("click",_.bind(y)),(E=document.getElementById("paintBucket")).addEventListener("click",_.bind(E)),(k=document.getElementById("colorPicker")).addEventListener("click",_.bind(k)),(I=document.getElementById("bresenham")).addEventListener("click",_.bind(I))})},function(e,t,n){var r=n(2);"string"==typeof r&&(r=[[e.i,r,""]]);var a={insert:"head",singleton:!1};n(4)(r,a);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,"body{margin:0 auto;max-width:1440px}header{display:flex;justify-content:space-between;margin:0 auto 75px auto;padding:0 15px;box-shadow:0px 4px 4px rgba(0,0,0,0.24),0px 0px 4px rgba(0,0,0,0.12)}header .burger{display:flex;justify-content:flex-start;align-items:center;padding:12px 0}header .burger .header__title{display:block;padding-left:30px;font-family:Roboto;font-style:normal;font-weight:500;font-size:20px;line-height:23px;color:rgba(0,0,0,0.87)}header .options{display:flex;align-items:center}.active{background:rgba(0,0,0,0.3)}.draw-wrapper{display:flex;justify-content:space-between;width:100%;margin:0 auto}.draw-wrapper .instruments-wrapper{width:18%;position:relative;margin-left:25px;min-width:230px}.draw-wrapper .instruments-wrapper .instruments-main{box-shadow:0px 4px 4px rgba(0,0,0,0.24),0px 0px 4px rgba(0,0,0,0.12);z-index:1;margin-bottom:30px}.draw-wrapper .instruments-wrapper .instruments-main .instrument{display:flex;align-items:center;padding:15px 65px 15px 20px;font-family:Roboto;font-style:normal;font-weight:normal;font-size:16px;line-height:24px;color:rgba(0,0,0,0.541327)}.draw-wrapper .instruments-wrapper .instruments-main .instrument:hover{cursor:pointer;background:rgba(0,0,0,0.1);transition:0.1s}.draw-wrapper .instruments-wrapper .instruments-main .instrument:nth-child(2){border-bottom:1px solid rgba(0,0,0,0.12)}.draw-wrapper .instruments-wrapper .instruments-main .instrument:last-child{margin-bottom:20px}.draw-wrapper .instruments-wrapper .instruments-main .instrument span{display:block;padding-left:35px}.draw-wrapper .instruments-wrapper .instruments-sub{box-shadow:0px 4px 4px rgba(0,0,0,0.24),0px 0px 4px rgba(0,0,0,0.12);margin-bottom:100px}.draw-wrapper .instruments-wrapper .instruments-sub .instrument{display:flex;align-items:center;padding:15px 65px 15px 20px;font-family:Roboto;font-style:normal;font-weight:normal;font-size:16px;line-height:24px;color:rgba(0,0,0,0.541327)}.draw-wrapper .instruments-wrapper .instruments-sub .instrument:hover{cursor:pointer;background:rgba(0,0,0,0.1);transition:0.1s}.draw-wrapper .instruments-wrapper .instruments-sub .instrument:nth-child(2){border-bottom:1px solid rgba(0,0,0,0.12)}.draw-wrapper .instruments-wrapper .instruments-sub .instrument:last-child{margin-bottom:20px}.draw-wrapper .instruments-wrapper .instruments-sub .instrument .color{width:20px;height:20px;border-radius:50%;background:red}.draw-wrapper .instruments-wrapper .instruments-sub .instrument span{display:block;padding-left:35px}.draw-wrapper .instruments-wrapper .instruments-change-img{box-shadow:0px 4px 4px rgba(0,0,0,0.24),0px 0px 4px rgba(0,0,0,0.12);margin-bottom:30px}.draw-wrapper .instruments-wrapper .instruments-change-img .instrument{display:flex;align-items:center;padding:15px 65px 15px 20px;font-family:Roboto;font-style:normal;font-weight:normal;font-size:16px;line-height:24px;color:rgba(0,0,0,0.541327)}.draw-wrapper .instruments-wrapper .instruments-change-img .instrument:hover{cursor:pointer;background:rgba(0,0,0,0.1);transition:0.1s}.draw-wrapper .instruments-wrapper .instruments-change-img .instrument:last-child{margin-bottom:20px}.draw-wrapper .instruments-wrapper .instruments-change-img .instrument span{display:block;padding-left:35px}.draw-wrapper .canvas .load-source{display:flex;justify-content:space-between;margin-bottom:20px}.draw-wrapper .canvas .load-source .load-source__button{padding:5px 10px;border:1px solid rgba(103,93,246,0.8);background:rgba(103,93,246,0.8);border-radius:5px;color:white}.draw-wrapper .canvas .load-source .load-source__button:hover{background:rgba(103,93,246,0.6);cursor:pointer}.draw-wrapper .canvas .load-source .load-source__button:active{background:#675df6}.draw-wrapper .canvas canvas{border:1px solid black;image-rendering:pixelated;height:512px;width:512px;z-index:-1}.draw-wrapper .canvas .change-size{display:flex;justify-content:space-between;padding-top:20px}.draw-wrapper .canvas .change-size .grayscale__button{padding:5px 10px;border:1px solid rgba(103,93,246,0.8);background:rgba(103,93,246,0.8);border-radius:5px;color:white}.draw-wrapper .canvas .change-size .grayscale__button:hover{background:rgba(103,93,246,0.6);cursor:pointer}.draw-wrapper .canvas .change-size .grayscale__button:active{background:#675df6}\n",""])},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var a=(i=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),o=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot).concat(e," */")}));return[n].concat(o).concat([a]).join("\n")}var i,s,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2],"{").concat(n,"}"):n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},a=0;a<this.length;a++){var o=this[a][0];null!=o&&(r[o]=!0)}for(var i=0;i<e.length;i++){var s=e[i];null!=s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),t.push(s))}},t}},function(e,t,n){"use strict";var r,a={},o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}();function s(e,t){for(var n=[],r={},a=0;a<e.length;a++){var o=e[a],i=t.base?o[0]+t.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}function c(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=a[r.id],i=0;if(o){for(o.refs++;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(h(r.parts[i],t))}else{for(var s=[];i<r.parts.length;i++)s.push(h(r.parts[i],t));a[r.id]={id:r.id,refs:1,parts:s}}}}function u(e){var t=document.createElement("style");if(void 0===e.attributes.nonce){var r=n.nc;r&&(e.attributes.nonce=r)}if(Object.keys(e.attributes).forEach((function(n){t.setAttribute(n,e.attributes[n])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var l,p=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function d(e,t,n,r){var a=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=p(t,a);else{var o=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}function f(e,t,n){var r=n.css,a=n.media,o=n.sourceMap;if(a&&e.setAttribute("media",a),o&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var m=null,g=0;function h(e,t){var n,r,a;if(t.singleton){var o=g++;n=m||(m=u(t)),r=d.bind(null,n,o,!1),a=d.bind(null,n,o,!0)}else n=u(t),r=f.bind(null,n,t),a=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else a()}}e.exports=function(e,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=s(e,t);return c(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var i=n[o],u=a[i.id];u&&(u.refs--,r.push(u))}e&&c(s(e,t),t);for(var l=0;l<r.length;l++){var p=r[l];if(0===p.refs){for(var d=0;d<p.parts.length;d++)p.parts[d]();delete a[p.id]}}}}}]);