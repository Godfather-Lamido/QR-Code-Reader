//QUERYSELECTOR:: THAT MATCHES A CSS SELECTOR.
//ADDEVENTLISTENER : FOR EVENTS WHOSE TYPE ATTRIBUTE IS "TYPE"

const download = document.querySelector(".download");
const qrContainer = document.querySelector("#qr-code");
const  shareBtn = document.querySelector(".share-btn");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrText = document.querySelector(".qr-text");
const sizes = document.querySelector(".sizes");

//APPEND AN EVENTLISTENER
dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

//DECLERATION MUST BE INITIALIZED
const defaultUrl = "https://youtube.com/@AsmrProg";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

// e.target refers to the clicked type="color" element
function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}

async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    //EXPRESSION EXPECTED
    download.href = await resolveDataUrl();
}

//IDENTIFIER EXPECTED
async function handleShare(){
    setTimeout(async () => {
        try {
            //"CATCH" OR "FINALLY" EXPECTED  
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({ //EXPRESSION EXPECTED
                files: [file],
                title: text,
            });
        }catch (error) {
            alert("Your browser doesn't support sharing.");
        }
    }, 100);
}

//IDENTIFIER EXPECTED
function handleSize(e) { //DECLERATION OR STATEMENT EXPECTED 
    size = e.target.value;
    generateQRCode();
}

//IDENTIFIER EXPECTED
function resolveDataUrl() {
    //EXPRESSION EXPRESSED
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if(img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas"); //"CONST" DECLERATIONS MUST BE INITIALIZED.
            resolve(canvas.toDataURL()); //IDENTIFIER EXPECTED
        }, 50);
    });
}

generateQRCode();