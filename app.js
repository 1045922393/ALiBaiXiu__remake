const express = require('express')
const app = express();
const bodyParser = require('body-parser')
let session = require('express-session')
app.listen(7777, () => {
    console.log('http://127.0.0.1:7777/')
})
const router = require('./router');
app.set('view engine', 'ejs');
app.set('views', './pages')
app.use('/assets', express.static('./assets'));
app.use('/uploads', express.static('./uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'ALiBaiXiu',
    resave: false,
    saveUninitialized: false
}))
app.use(function (req, res, next) {
    if ((req.session && req.session.isLogin == 'true') || !req.url.startsWith('/admin') || req.url == '/admin/login.html') {
        next()
    } else {
        res.writeHead(301, {
            'Location': '/admin/login.html'
        })
        res.end()
        // res.redirect('/admin/login.html')
    }
})


app.use(router);