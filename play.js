/**
 * Created by Xaz on 3/6/2016.
 */

/*
var xml = '<?xml version="1.0" encoding="utf-8"?>\
    <ArrayOfInt xmlns:xsi="http://www.w3\
.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3\
.org/2001/XMLSchema" xmlns="http://www.chemspider.com/">\
    <int>682</int>\
    <int>682</int>\
    </ArrayOfInt>'


var thumbnail = {
    'operation': 'GetCompoundThumbnail',
    'options': {
        'token': '0a4dc397-454a-4eb7-9767-3d63c6722f0c'
    }
};
var re = /<int>(\d*)<\/int>/g;

while (res = re.exec(xml)){
    console.log(res[1]);
}


thumbnail['id'] = re.exec(xml)[1];

console.log(thumbnail);

*/

lst = [682, 682];

for (var i in lst){
    console.log(lst[i]);
}