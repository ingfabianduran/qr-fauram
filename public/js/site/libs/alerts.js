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
// Show confirm alert: 
async function show_alert_print_bono(title, message, icon, text_btn) {
    const { value: text } = await Swal.fire({
        title: title,
        text: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: text_btn,
        cancelButtonText: 'Cancelar',
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Si desea escribir un mensaje perzonalizado digitelo aquí',
        inputAttributes: {
            'aria-label': 'Si desea escribir un mensaje perzonalizado digitelo aquí'
        },
        showCancelButton: true
    });
      
    return text;
}