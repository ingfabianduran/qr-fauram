// PDF para recarga: 
function generate_pdf_recarga() {
    const pdf_content = {
        content: [
            {
                text: 'QR Recargable',
                style: 'type_bono'
            },
            {
                text: 'Hola Fabian Esteban Duran A',
                style: 'user'
            },
            {
                text: 'Compraste un Código QR que puedes recargar. Ahora puedes usarlo como medio de pago en nuestras instalaciones.',
                style: 'body'
            },
            {
                text: 'Franklin Ramos Salon \n Cra 13 #77a-65 \n 3132859321',
                style: 'footer'
            }
        ],
        styles: get_styles()
    };
    pdfMake.createPdf(pdf_content).download();
}
// PDF para regalo: 
function generate_pdf_regalo() {
    const pdf_content = {
        content: [
            {
                text: 'QR de Regalo',
                style: 'type_bono'
            },
            {
                text: 'Hola Fabian Esteban Duran A',
                style: 'user'
            },
            {
                text: 'Omar Duran Quiere que vivas una experiencia maravillosa, te ha regalado un BONO con un codigo QR', 
                style: 'body'
            },
            {
                text: 'Franklin Ramos Salon \n Cra 13 #77a-65 \n 3132859321',
                style: 'footer'
            }
        ],
        styles: get_styles()
    };
    pdfMake.createPdf(pdf_content).download();
}
// Style's by PDF: 
function get_styles() {
    const styles = {
        type_bono: {
            fontSize: 30,
            bold: true               
        },
        user: {
            fontSize: 25,
            bold: true,
            margin: [20, 160, 20, 20]
        },
        body: {
            fontSize: 20,
            alignment: 'justify',
            margin: [20, 5, 20, 0]
        },
        footer: {
            fontSize: 15,
            alignment: 'center',
            margin: [0, 380, 0, 0]
        }
    };
    return styles;
}