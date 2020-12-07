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
function show_alert(title, message, icon) {
    Swal.fire({
        title: title, 
        text: message,
        icon: icon,
    });
}