function populateDate(){
                 var mydate=new Date()
               var year=mydate.getYear()
               if(year<1000)
                 year+=1900
                 var day=mydate.getDay()
                 var month=mydate.getMonth()
                 var daym=mydate.getDate()
               if(daym<10)
                 daym="0"+daym
                 var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
                 var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December")
                  var timestamp = ""+dayarray[day]+", "+montharray[month]+" "+daym+", "+year+"";
                 document.getElementById('datetime').innerHTML = timestamp;
               }
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function populateTempDetails(weatherObject){
var content = '<div class="weatherDetails '+weatherObject.weather[0].main+'"><h3>'+weatherObject.weather[0].main+'</h3><p>'+weatherObject.main.temp_min+'&deg;C</p><p>'+weatherObject.main.temp_max+'&deg;C</p></div>';
document.getElementById('dayDiv').innerHTML+= content;
}
function getWeather(){
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid=cce2d2dc12fd50164aff353ad4e09ea2&cnt=5&units=metric", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      var response = JSON.parse(xhr.responseText);
      if(response.city.name){
        document.getElementById('city_name').innerHTML = response.city.name;
      }
      if(response.list.length > 0){
        response.list.forEach(populateTempDetails);
      }
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);  
}
