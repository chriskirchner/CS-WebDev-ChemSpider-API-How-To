/**
 * Created by Xaz on 3/5/2016.
 */

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function CSRequest(query){
    var host = 'http://www.chemspider.com';
    var resource = '/JSON.ashx?';
    var request = new XMLHttpRequest();
    var q = 'op='+query.operation+'&';
    for (var k in query.options){
        q += k +'='+ query.options[k] +'&';
    }
    q = q.slice(0,-1);
    console.log(host+resource+q);
    request.open('GET', host+resource+q, false);
    request.send();
    return request.responseText;
}

var query = {
    'operation': 'SimpleSearch',
    'options': {
        'searchOptions.queryText': 'ethanol'
    }
};

var rid = CSRequest(query);

var status = {
    'operation': 'GetSearchStatus',
    'options': {
        'rid': rid
    }
};
var stat = JSON.parse(CSRequest(status));

if (stat['Status'] == 6){
    console.log('ResultReady');
}

var csids = {
    'operation': 'GetSearchResult',
    'options': {
        'rid': rid
    }
};
var csidList = JSON.parse(CSRequest(csids));
//result
//[682,682]


var compounds = {
    'operation': 'GetRecordsAsCompounds',
    'options': {
        'csids[0]': csidList[0],
        'csids[1]': csidList[1]
    }
};
var mol = CSRequest(compounds);
var pic = require('fs');
pic.writeFile('ethanol.handlebars',
    mol,
    function(err){
        if(err){
            console.log('Oops, someone already clipped their thumbnail!');
        }
    }
);






