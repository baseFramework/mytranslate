'use strict';

var meta = require('./package.json'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    q = require('q'),
    path = require('path'),
    request = require('request'),
    app = module.exports = express();
   // middleware = ['combo', 'router', 'proxy', 'static', 'error'];


// lazy load middlewares
// middleware.forEach(function (m) {
//     middleware.__defineGetter__(m, function () {
//         return require('./' + m);
//     });
// });

// process.on('uncaughtException', function (err) {
//     (app.get('logger') || console).error('Uncaught exception:\n', err.stack);
// });

app.set('name', meta.name);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('version', meta.version);
app.set('port', process.env.PORT || 8080);
app.set('root', path.resolve(__dirname, '../').replace(/\/+$/, ''));
app.set('logger', console);
app.enable('trust proxy');

// app.use(compress());
// app.use('/co', middleware.combo());
// app.use(middleware.router({
//     index: '/' + meta.name + '/' + meta.version + '/index.html'
// }));

// app.use(middleware.static());
// app.use(middleware.error());

//var translateUrl = 'http://translate.google.cn/translate_a/single?client=t&sl=zh-CN&tl=es&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&ssel=6&tsel=4&kc=21&tk=566800.980559&q=%E4%BD%A0%E5%A5%BD'

app.get('/api/hello', function (req, res) {
    try {
        var options = {};
        options.method = 'get';
        options.url = translateUrl;
        options.timeout = 10000;
        request.get(options, function(err, res, body) {
            console.log(err);
            console.log(res);
        })
        res.send({
            "code": "200",
            "msg": "success",
            "data": {}
        });

    } catch (e) {
        res.send({
            "code": "10000",
            "msg": "server error",
            "data": {}
        });
    }
});

// 设置响应使可以跨域
// app.use(function (req, res, next) {
//     res.set('Access-Control-Allow-Credentials', 'true');
//     res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.set('Access-Control-Allow-Methods', 'GET');
//     res.set('Access-Control-Allow-Origin', 'http://test.va.vip.vipme.com');
//     res.set('Access-Control-Max-Age', 3600);
//     next();
// });


if (require.main === module) {
    app.listen(app.get('port'), function () {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'));
    });
}
