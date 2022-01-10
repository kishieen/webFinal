var uri = "http://140.128.102.242:8080";

function renew(){
  genTable = document.getElementsByClassName('genTable');
  genTable.remove;
  while(genTable.length > 0){
    genTable[0].parentNode.removeChild(genTable[0]);
}
  drawTable();
}
async function drawTable() {
  var jsondata = await fetch(uri+'/getdata')
    .then(function(response) {
      return response.json();
    })
    .then(function(myjson) {
      console.log(myjson)
      return myjson
    })
  var tr, td;
  tbody = document.getElementById('tbody');

  for (var i = jsondata.length-1; i >=0 ; i--) // loop through data source
  {
    tr = tbody.insertRow(tbody.rows.length);
    tr.classList.add('genTable');
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = jsondata[i]['date'];
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = jsondata[i]['in'];
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = jsondata[i]['out'];
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = jsondata[i]['amount'];


  }
}
async function newData() {
  var tr, td;
  var data = document.getElementsByClassName('newData');
  console.log(data)

  // for (var i = 0; i < data.length; i++) // loop through data source
  // {

  // }

  var body = {
    "date": new Date().toISOString().slice(0, 19).replace('T', ' '),
    "in": data[0].value,
    "out": data[1].value,
    "amount": data[0].value-data[1].value,
  };
  console.log(body);
  await fetch(uri+"/newdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  renew();

}
$(document).ready(function() {

  drawTable();

});