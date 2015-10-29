var fs = require("fs");

var lastDataShowed = null;

fs.readFile('./action.log', function(err, data) {
    if(err) {
        return;
    }

    var _data = transformFileContent(data);
    for (var i = 0; i < _data.length; i++) {
        lastDataShowed = _data[i];
        console.log(_data[i]);
    };
});

setInterval(function() {
    fs.readFile('./action.log', function(err, data) {
        if(err) {
            return;
        }

        var _data = transformFileContent(data);
        var lastData = _data[_data.length - 1];
        if(lastDataShowed != lastData) {
            lastDataShowed = lastData;
            console.log(lastData);    
        }
        
    });
},1000);

function transformFileContent(buff) {
    var newArrayWithoutEmpty = [];

    var _d = buff.toString().split("\n");
    for (var i = 0; i < _d.length; i++) {
        if(_d[i].length > 0) {
            newArrayWithoutEmpty.push(_d[i]);
        }
    }

    return newArrayWithoutEmpty;
}
