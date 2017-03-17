'use strict';
var request = require('superagent')

//sl=en&tl=zh-CN&p=1&q=hello
request
    .post('http://www.tastemylife.com/gtr.php')
    .send(
        {
            sl: 'zh-CN',
            tl: 'ru',
            p: 1,
            q:'他妈的'
        }
    )
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
        // Calling the end function will send the request
        //console.log(res.text);
        var text = JSON.parse(res.text);
        var result = decodeURIComponent(text.result);
        console.log(result)

    });