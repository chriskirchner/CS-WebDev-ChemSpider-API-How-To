/**
 * Created by Xaz on 3/1/2016.
 */
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function CSRequest(query){
    var host = 'http://www.chemspider.com';
    var resource = '/MassSpecAPI.asmx';
    var request = new XMLHttpRequest();
    request.open('POST', host+resource, false);
    request.setRequestHeader('Content-Type', 'application/soap+xml');
    request.send(query);
    console.log(request.responseText);
    return request.responseText;
}




var databases = '<?xml version="1.0" encoding="utf-8"?>\
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
<soap12:Body>\
<GetDatabases xmlns="http://www.chemspider.com/" />\
</soap12:Body>\
</soap12:Envelope>';
//var sources = CSRequest(databases);

var token = "0a4dc397-454a-4eb7-9767-3d63c6722f0c";
var db1 = 'Cool Pharm';
var formula =
'<?xml version="1.0" encoding="utf-8"?> \
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"> \
    <soap12:Body> \
        <SearchByFormulaAsync xmlns="http://www.chemspider.com/"> \
            <formula>CH3CH2OH</formula> \
            <token>'+token+'</token> \
        </SearchByFormulaAsync> \
    </soap12:Body> \
</soap12:Envelope>';
var rid = CSRequest(formula);

rid = 'b5b6f94e-922b-4a00-a644-cfcf8ecc9889';
var sdf =
    '<?xml version="1.0" encoding="utf-8"?>\
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
  <soap12:Body>\
    <GetRecordsSdf xmlns="http://www.chemspider.com/">\
      <rid>'+rid+'</rid>\
      <token>'+token+'</token>\
    </GetRecordsSdf>\
  </soap12:Body>\
</soap12:Envelope>';
var result = CSRequest(sdf);




/*
resource = '/MassSpecAPI.asmx/GetRecordsSdf';
payload = 'rid=77460bc5-8f8c-40ae-abf1-8957901a6653' +
    '&token='+appid;
request.open('POST', host+resource, false);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
request.send(payload);

var text = request.responseText;
text = text.replace(/&lt;/g, '<').replace(/&gt;/g,'>');
console.log(text);
*/






