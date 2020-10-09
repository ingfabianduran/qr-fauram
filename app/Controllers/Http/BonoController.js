'use strict'

class BonoController {
    index({view}) {
        return view.render('bono');
    }

    async add_bono({response}) {
        const qr_code = require('qrcode');
        try {
            const qr = await qr_code.toDataURL('Aqui va la info');
            response.send({ status: true, qr: qr, error: null});
        } catch (error) {
            response.send({ status: false, qr: null, error: error.code});
        }
    }
}

module.exports = BonoController