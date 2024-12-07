import qrcode from "qrcode";

export default async function generateQrCode() {
    const urlInput = document.getElementById("qrcode-url");
    const imageUpload = document.getElementById("image-upload");
    const imageSize = document.getElementById("image-size");
    const canvas = document.getElementById("qr-code");
    const downloadDiv = document.getElementById("download-qrcode");

    if (!(urlInput instanceof HTMLInputElement)) {
        console.error("URL input isn't an input element");
        return;
    }

    if (!(canvas instanceof HTMLCanvasElement)) {
        console.error("Canvas isn't a canvas HTML element");
        return;
    }

    if (!(imageUpload instanceof HTMLInputElement)) {
        console.error("Image upload field isn't an input");
        return;
    }

    if (!(imageSize instanceof HTMLSelectElement)) {
        console.error("Image size isn't a select element");
        return;
    }

    const qrCodeWidth = 330;

    const qrCodeOptions = {
        width: qrCodeWidth,
        margin: 1,
    };

    await qrcode.toCanvas(canvas, urlInput.value, qrCodeOptions);

    const ctx = canvas.getContext("2d");

    const imageSizeValue = imageSize.value;
    let imageDimension = 0;

    switch (imageSizeValue) {
        case "small":
            imageDimension = qrCodeWidth * 0.1;
            break;
        case "medium":
            imageDimension = qrCodeWidth * 0.15;
            break;
        case "large":
            imageDimension = qrCodeWidth * 0.22;
            break;
        default:
            imageDimension = 0;
            break;
    }

    if (imageDimension !== 0 && imageUpload.files?.length) {
        const file = imageUpload.files[0];
        const img = new Image();

        img.onload = () => {
            const qrWidth = 330;
            const x = (canvas.width - qrWidth) / 2 + qrWidth / 2 - imageDimension / 2;
            const y = (canvas.height - qrWidth) / 2 + qrWidth / 2 - imageDimension / 2;

            ctx?.drawImage(img, x, y, imageDimension, imageDimension);
        };

        img.src = URL.createObjectURL(file);
    }

    downloadDiv?.classList.remove("hidden");
    canvas.classList.remove("hidden");
}
