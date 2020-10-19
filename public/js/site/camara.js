// Get cameras and validate if exist in this device:
function get_cameras() {
    Instascan.Camera.getCameras().then(camaras => {
        cameras_into_select(camaras);    
    }).catch(err => {
        disabled_select_camaras('camaras_redimir');
        disabled_select_camaras('camaras_recargar');
    });
}
// Render cameras in option's select: 
function cameras_into_select(camaras) {

}
// Disabled select cameras: 
function disabled_select_camaras(id_select) {
    $(`#${id_select}`).prop('disabled', true);
    $(`#${id_select}`).data('placeholder', 'No hay camaras disponibless');
    $(`#${id_select}`).select2();
}