const messages = require("../../../app/Validators/messages");

// PDF para recarga: 
function content_pdf_recarga(data) {
    const pdf_content = {
        content: [
            {
                text: `QR de ${ data.bono[0].tipo }`,
                style: 'type_bono'
            },
            {
                text: `Hola ${ data.bono[0].clientes.nombre } ${ data.bono[0].clientes.apellido }`,
                style: 'user'
            },
            {
                text: 'Compraste un Código QR que puedes recargar. Ahora puedes usarlo como medio de pago en nuestras instalaciones.',
                style: 'body'
            },
            {
                image: `${ data.qr }`,
                style: 'qr'
            },
            {
                text: 'Franklin Ramos Salon \n Cra 13 #77a-65 \n 3132859321',
                style: 'footer'
            }
        ],
        styles: get_styles()
    };
    return pdf_content;
}
// PDF para regalo: 
function content_pdf_regalo(data) {
    const pdf_content = {
        content: [
            {
                text: `QR de ${ data.bono[0].tipo }`,
                style: 'type_bono'
            },
            {
                text: `Hola ${ data.bono[0].quien_redime }`,
                style: 'user'
            },
            {
                text: `${ data.bono[0].clientes.nombre } ${ data.bono[0].clientes.apellido } Quiere que vivas una experiencia maravillosa, te ha regalado un BONO con un codigo QR`, 
                style: 'body'
            },
            {
                image: `${ data.qr }`,
                style: 'qr'
            },
            {
                text: 'Franklin Ramos Salon \n Cra 13 #77a-65 \n 3132859321',
                style: 'footer'
            }
        ],
        styles: get_styles(),
    };
    return pdf_content;
}
// Style's by PDF: 
function get_styles() {
    const styles = {
        type_bono: {
            fontSize: 30,
            bold: true, 
            font: 'BarlowCondensed'
        },
        user: {
            fontSize: 25,
            bold: true,
            margin: [20, 160, 20, 20],
            font: 'BarlowCondensed'
        },
        body: {
            fontSize: 20,
            alignment: 'justify',
            margin: [20, 5, 20, 0],
            font: 'BarlowCondensed'
        },
        qr: {
            alignment: 'center',
            margin: [0, 60, 0, 0],
        },
        footer: {
            fontSize: 15,
            alignment: 'center',
            margin: [0, 180, 0, 0],
            font: 'BarlowCondensed'
        }
    };
    return styles;
}
// Download pdf: 
function download_pdf(tipo, data, message) {
    try {
        pdfMake.fonts = {
            BarlowCondensed: {
                    normal: 'BarlowCondensed-Regular',
                    bold: 'BarlowCondensed-Bold',
                    italics: 'BarlowCondensed-Italic',
                    bolditalics: 'BarlowCondensed-BoldItalic'
            }
        };
        
        if (tipo === 'Regalo') pdfMake.createPdf(content_pdf_regalo(data)).download();
        else if (tipo === 'Recarga') pdfMake.createPdf(content_pdf_recarga(data)).download();
        else toastr.error('Faltan datos por generar');
        toastr.success(message);
    } catch (error) {
        toastr.error(error);
    }
}