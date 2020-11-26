// Show small alert: 
function show_small_alert (icon, message, url, container) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        onClose: () => {
            if (url === null || url === undefined) {
                stop_preloader(container, 500);
            } else {
                location.href = url;
            }
        }
    });
    Toast.fire({
        icon: icon,
        title: message
    });
}
// Show confirm alert: 
function show_alert_confirm(title, message, icon, text_btn, callback) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: text_btn,
        cancelButtonText: 'Cancelar',
      }).then((confirm) => {
        callback(confirm && confirm.value == true);
    });
}
// Show alert: 
function show_alert(title, message, icon, url, container) {
    Swal.fire({
        title: title, 
        text: message,
        icon: icon,
        onClose: () => {
            if (url === null || url === undefined) {
                stop_preloader(container, 500);
            } else {
                location.href = url;
            }
        }
    });
}