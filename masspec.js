/**
 * Created by Xaz on 3/5/2016.
 */

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var DOMParser = require('xmldom').DOMParser;
var xpath = require('xpath');

function massesToRID(masses){
    var host = "http://www.chemspider.com";
    var token = "0a4dc397-454a-4eb7-9767-3d63c6722f0c";
    var request = new XMLHttpRequest();
    var resource = '/MassSpecAPI.asmx';
    request.open('POST', host+resource, false);
    request.setRequestHeader('Content-Type', 'application/soap+xml');

    var range = 0.5;
    var m = '';
    for (var i=0; i<masses.length; i++){
        m += '<MassRange><Mass>'+masses[i]+'</Mass>' +
            '<Range>'+range+'</Range></MassRange>';
    }

    var payload =
        '<?xml version="1.0" encoding="utf-8"?>\
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
        xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
        xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
        <soap12:Body>\
        <SearchByMassArrayAsyncOrdered xmlns="http://www.chemspider.com/">\
                <masses>'
                    +m+
                '</masses>\
                <orderBy>eMolecularWeight</orderBy>\
            <orderDirection>eAscending</orderDirection>\
            <token>'+token+'</token>\
        </SearchByMassArrayAsyncOrdered>\
        </soap12:Body>\
        </soap12:Envelope>';

    request.send(payload);
    console.log(payload);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(request.responseText, 'text/xml');
    var result = xmlDoc.getElementsByTagName('SearchByMassArrayAsyncOrderedResult')[0];
    return result.firstChild.data;
}

/*
function ridToCSIDs(rid){
    var host = 'http://www.chemspider.com';
    var appid = '0a4dc397-454a-4eb7-9767-3d63c6722f0c';
    var request = new XMLHttpRequest();
    var resource = '/MassSpecAPI.asmx/GetMassArrayAsyncSearchResult?';
    var query = 'rid='+rid+'&token='+appid;
    console.log(host+resource+query);
    request.open('GET', host+resource+query, false);
    request.send();
    return request.responseText;
}
*/



function ridToCSIDs(rid){
    var host = "http://www.chemspider.com";
    var appid = '0a4dc397-454a-4eb7-9767-3d63c6722f0c';
    var request = new XMLHttpRequest();
    var resource = '/MassSpecAPI.asmx/GetMassArrayAsyncSearchResult';
    var payload = 'rid='+rid+'&token='+appid;
    request.open('POST', host+resource, false);
    request.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');
    request.send(payload);
    console.log(request.responseText);
}


var masses = [28, 29, 31, 45, 46];
var rid = massesToRID(masses);
console.log(rid);
var csids = ridToCSIDs(rid);
console.log(csids);