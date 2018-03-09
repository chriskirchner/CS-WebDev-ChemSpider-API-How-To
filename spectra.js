/**
 * Created by Xaz on 3/7/2016.
 */

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function CSRequest(query){
    var host = 'https://www.chemspider.com';
    var resource = '/Spectra.asmx/';
    var request = new XMLHttpRequest();
    var q = '';
    for (var i in query.options.ids){
        q += query.options.id_name+'='+
            query.options.ids[i] +'&';
    }
    q += 'token='+query.options.token;
    console.log(q);
    request.open('POST', host+resource+query.operation, false);
    request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    request.send(q);
    console.log(request.responseText);
    return request.responseText;
}

var spectraInfoArray = {
    'operation': 'GetSpectraInfoArray',
    'options': {
        'id_name':'CSIDs',
        'csids': [682, 682],
        'token': '0a4dc397-454a-4eb7-9767-3d63c6722f0c'
    }
};
CSRequest(spectraInfoArray);

var compoundSpectraInfo = {
    'operation': 'GetCompoundSpectraInfo',
    'options': {
        'id_name': 'csid',
        'ids': [682],
        'token': '0a4dc397-454a-4eb7-9767-3d63c6722f0c'
    }
};
CSRequest(compoundSpectraInfo);

var spectrumInfo = {
    'operation': 'GetSpectrumInfo',
    'options': {
        'id_name': 'spc_id',
        'ids': [6723],
        'token': '0a4dc397-454a-4eb7-9767-3d63c6722f0c'
    }
};
CSRequest(spectrumInfo);


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