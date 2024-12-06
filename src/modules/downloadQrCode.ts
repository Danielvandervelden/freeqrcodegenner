import qrcode from "qrcode";

export default async function downloadQrCode() {
    const urlInput = document.getElementById("qrcode-url");
    const imageUpload = document.getElementById("image-upload");
    const imageSize = document.getElementById("image-size");
    const downloadSize = document.getElementById("qrcode-size");

    if (!(urlInput instanceof HTMLInputElement)) {
        console.error("URL input isn't an input element");
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

    if (!(downloadSize instanceof HTMLSelectElement)) {
        console.error("Download size isn't a select element");
        return;
    }

    const finalSize = parseInt(downloadSize.value, 10);

    const hiddenCanvas = document.createElement("canvas");
    hiddenCanvas.width = finalSize;
    hiddenCanvas.height = finalSize;
    const ctx = hiddenCanvas.getContext("2d");

    await qrcode.toCanvas(hiddenCanvas, urlInput.value, {
        width: finalSize,
        margin: 1,
    });

    const imageSizeValue = imageSize.value;
    let imageDimension = 0;
    switch (imageSizeValue) {
        case "small":
            imageDimension = finalSize * 0.1;
            break;
        case "medium":
            imageDimension = finalSize * 0.15;
            break;
        case "large":
            imageDimension = finalSize * 0.2;
            break;
        default:
            imageDimension = 0;
            break;
    }

    if (imageDimension !== 0 && imageUpload.files?.length) {
        const file = imageUpload.files[0];
        const img = new Image();

        img.onload = () => {
            const x = (finalSize - imageDimension) / 2;
            const y = (finalSize - imageDimension) / 2;

            ctx?.drawImage(img, x, y, imageDimension, imageDimension);

            hiddenCanvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "qrcode.png";
                a.click();
                URL.revokeObjectURL(url);
            });
        };

        img.src = URL.createObjectURL(file);
    } else {
        // If no image is to be drawn, just download the QR code
        hiddenCanvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "qrcode.png";
            a.click();
            URL.revokeObjectURL(url);
        });
    }
}
