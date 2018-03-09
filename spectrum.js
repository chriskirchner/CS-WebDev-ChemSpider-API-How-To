/**
 * Created by Xaz on 3/9/2016.
 */
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function CSRequest(query){
    var host = 'https://www.chemspider.com/';
    var request = new XMLHttpRequest();
    var q = '';
    for (var option in query.options){
        q += option+'='+
            query.options[option] +'&';
    }
    q = q.slice(0,-1);
    request.open('GET', host+query.resource+'?'+q, false);
    request.send();
    return request.responseText;
}


//http://www.chemspider.com/FilesHandler.ashx?type=blob&disp=1&id=6722


var file = require('fs');
var spc_id = 6722;
var spectrum = {
    'resource':'FilesHandler.ashx',
    'options': {
        'type': 'blob',
        'disp': 1,
        'id': spc_id
    }
};
var jdx = CSRequest(spectrum);
file.writeFile('mass.jdx',
    jdx,
    function(err){
        if(err){
            console.log('Oops, someone hide the spetrum!');
        }
    }
);