// Get cameras and validate if exist in this device:
function get_cameras() {
    Instascan.Camera.getCameras().then(camaras => {
        cameras_into_select('camaras_recargar', camaras);   
        cameras_into_select('camaras_redimir', camaras);
        start_cameras('camaras_recargar', 'video_recargar', camaras);
        start_cameras('camaras_redimir', 'video_redimir', camaras);   
    }).catch(err => {
        disabled_select_camaras('camaras_recargar');
        disabled_select_camaras('camaras_redimir');
    });
}
// Render cameras in option's select: 
function cameras_into_select(id_select, camaras) {
    for (let i = 0; i < camaras.length; i ++) {
        const option = new Option(camaras[i].name, camaras[i].id, false, false);
        $(`#${id_select}`).append(option).trigger('change');
    }
}
// Disabled select cameras: 
function disabled_select_camaras(id_select) {
    $(`#${id_select}`).prop('disabled', true);
    $(`#${id_select}`).data('placeholder', 'No hay camaras disponibless');
    $(`#${id_select}`).select2();
}
// Start scan and camera: 
function start_cameras(id_select, id_video, cameras) {
    const scanner = new Instascan.Scanner({ video: document.getElementById(id_video) });
    scanner.addListener('scan', function (content) {
        console.log(content);
    });

    $(`#${id_select}`).on('select2:selecting', function(e) {
        for (let i = 0; i < cameras.length; i ++) {
            if (cameras[i].id === e.params.args.data.id) {
                scanner.start(cameras[i]);
                break;
            }
        }  
    });
}