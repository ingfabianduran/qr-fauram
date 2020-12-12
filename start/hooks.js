'use strict'

const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
    const View = use('View');
    const Env = use('Env');
    const Exception = use('Exception');

    View.global('appUrl', path => {
        const APP_URL = Env.get('APP_URL');
        return path ? `${APP_URL}/${path}` : APP_URL;
    });

    Exception.handle('InvalidSessionException', async (error, { response, session }) => {
        session.withErrors({ session: 'Por favor iniciar sesion en el sistema' }).flashAll()
        await session.commit()
        response.redirect('/')
        return
    });
});