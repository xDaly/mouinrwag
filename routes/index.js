const express = require('express');
const homeRoute = require('./home.route');
const authRoute = require('./auth.route');
const adminRoute = require('./admin.route');
const stageRoute = require('./stage.route');
const organismeRoute = require('./organisme.route');
const tuteurRoute = require('./tuteur.route');
// const announceRoute = require('./announce.route');

module.exports = (app) => {
    app.use('/', homeRoute),
    app.use('/auth', authRoute)
    app.use('/admin', adminRoute)
    app.use('/stage', stageRoute)
    app.use('/organisme', organismeRoute)
    app.use('/tuteur', tuteurRoute)
    // app.use('/**', (req, res) => {
    //     res.writeHead(301, {
    //         Location: `http://localhost:3000/dashboard`
    //       }).end();
    // })

    // app.use('/user', userRoute)
    // app.use('/image', imageRoute)
    // app.use('/announce', announceRoute)
}