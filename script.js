//Initialize Toastr;
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

// Generate Qr Code
const generateQrCode = () => {
    const input = document.querySelector("#inputText").value;
    if (!input.trim()) {
        toastr.error("Please write something first to generate QR code.")
        return;
    }
    const code = document.querySelector("#qrcode");
    code.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input}`;
    qrcode.style.display = "block"
    downloadBtn.style.display = "block";
    toastr.success("Generated Successfully!");
    downloadBtn.onclick = function () {
        const link = document.createElement("a");
        link.href = code.src;
        link.download = "qr_code.png";
        link.click();
    };
    document.querySelector("#inputText").value = "";
}

generateBtn.addEventListener('click', generateQrCode);

//Registered Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
    navigator.serviceWorker.ready.then((swReg) => {
        var options = {
            message: "This is message body.",
            icon: "/images/icons/icon-512x512.png",
        }
        swReg.showNotification("This is message title.", options);
    })
}

