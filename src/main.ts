import downloadQrCode from "./modules/downloadQrCode";
import generateQrCode from "./modules/generateQrCode";

function init() {
    const generateQrcodeButton = document.getElementById("generate-qrcode");
    const downloadQrcodeButton = document.getElementById("download-qrcode-button");
    const imageUpload = document.getElementById("image-upload");
    const clearImageButton = document.getElementById("clear-image");

    generateQrcodeButton?.addEventListener("click", generateQrCode);

    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            generateQrCode();
        }
    });

    downloadQrcodeButton?.addEventListener("click", downloadQrCode);

    clearImageButton?.addEventListener("click", () => {
        if (!(imageUpload instanceof HTMLInputElement)) {
            return;
        }
        imageUpload.value = "";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});
