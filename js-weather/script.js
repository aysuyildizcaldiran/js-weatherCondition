randomWeather();
document.querySelector("#btnSearch").addEventListener("click",()=>{
    const text= document.querySelector("#textSearch").value;
    document.querySelector("#loading").style.display="block";
    document.querySelector("#details").style.opacity=0;
    getWeather(text);

});

//Konum Bilgilerini çekme 
document.querySelector("#btnLocation").addEventListener("click",()=>{
    document.querySelector("#loading").style.display="block";
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
});

async function onSuccess(position){
    const lat=position.coords.latitude;
    const lng=position.coords.longitude;
    const api_key="62ad7732007d4ce381b08e0e83cbff37";
    const url1=`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`;

    const response=await fetch(url1);
    const json=await response.json();
    console.log(json);
    const country=json.results[0].components.country;
    const city=json.results[0].components.state;
    //console.log(city);
  
    document.querySelector("#textSearch").value=country+","+city;
    document.querySelector("#btnSearch").click();
    document.querySelector("#loading").style.display="none";
}
function onError(error){
    document.querySelector("#loading").style.display="none";
    renderError(error);
}

async function getWeather(text){

    try {
    const url2=`http://api.weatherstack.com/current?access_key=ea9bf0ad7e75885761b0ee49d31d030d&query=${text}`;
    const response2= await fetch(url2);
    const json2=await response2.json();
    console.log(json2);
    console.log(json2.current.weather_descriptions[0]);
    const icon=json2.current.weather_icons[0];

    document.querySelector("#loading").style.display="none";
    document.querySelector("#weather-details").innerHTML="";
    const html2=`
       <div id="det">
            <h3 class="card-title">${json2.location.name}</h3>
            <hr>
            <div class="row">
              <img src="${icon}" alt="" class="img-fluid">
            </div>
            <div class="row">
                <p>${json2.current.weather_descriptions[0]}/${json2.current.temperature}°</p>
            </div>                   
        </div>
    `;
    document.querySelector("#details").style.opacity=1;
    document.querySelector("#weather-details").innerHTML=html2;
    

    } catch (error) {
            renderError(error);
    }
}

function renderError(error){
    const html=`
         <div class="alert alert-danger">
          ${error.message}
            </div>
        `;
    setTimeout(function(){
        document.querySelector("#errors").innerHTML="";
    },3000);
    document.querySelector("#errors").innerHTML=html;
}


 async function randomWeather(){
    list=["İstanbul","Ankara","Londra","Berlin","Paris","Tokyo","Vancouver","Amsterdam"];
    let random_html="";
    for(const i of list){
        const url2=`http://api.weatherstack.com/current?access_key=ea9bf0ad7e75885761b0ee49d31d030d&query=${i}`;
        const response3= await fetch(url2);
            const json3=await response3.json();
            random_html+=`
            <div id="random">
            <h3 class="card-title">${json3.location.name}</h3>
            <div class="row">
                <img src="${json3.current.weather_icons[0]}" alt="" class="img-fluid">
            </div>
            <div class="row">
                <div>${json3.current.weather_descriptions[0]}/${json3.current.temperature}°</div>
            </div>                   
        </div>
        `;
        document.querySelector(".nav").innerHTML=random_html;
 }
}

