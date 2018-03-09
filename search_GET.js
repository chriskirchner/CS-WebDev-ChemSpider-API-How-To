/**
 * Created by Xaz on 3/6/2016.
 */
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function CSRequest(query){
    var host = 'http://www.chemspider.com';
    var resource = '/Search.asmx/';
    var request = new XMLHttpRequest();
    var q = query.operation+'?';
    for (var k in query.options){
        q += k +'='+ query.options[k] +'&';
    }
    q = q.slice(0,-1);
    console.log(q);
    request.open('GET', host+resource+q, false);
    request.send();
    return request.responseText;
}


var query = {
    'operation': 'SimpleSearch',
    'options': {
        'query': 'Ethanol',
        'token': '0a4dc397-454a-4eb7-9767-3d63c6722f0c'
    }
};

var xml = CSRequest(query);



var thumbnail = {
    'operation': 'GetCompoundThumbnail',
    'options': {
        'token': '0a4dc397-454a-4eb7-9767-3d63c6722f0c'
    }
};

var re = /<int>(\d*)<\/int>/g;
thumbnail.options['id'] = re.exec(xml)[1];


var binary = CSRequest(thumbnail);
var re = /<base64Binary .*>(.*)<\/base64Binary>/i;
var png = re.exec(binary)[1];
var pic = require('fs');

pic.writeFile('mass.jdx',
    png,
    'base64',
    function(err){
        if(err){
            console.log('Oops, someone hide the spetrum!');
        }
    }
);


