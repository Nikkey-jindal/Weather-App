const btn=document.getElementById("button")
const input=document.getElementById("inputs")
const second=document.getElementById("seconddiv");
const currloc=document.getElementById("current");
async function weather(val)
{ 
    try{
        input.value="";
    let APIkey="100c6085aba6186cde700156edeecba2"; 
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&appid=${APIkey}`);
    let result=await response.json();
    console.log(result);
    if(result.message)
    {
        second.innerHTML=`${val} not found`
        return;
    }
    details(result);
}
catch(err)
{
    console.log(err);
}
}
btn.addEventListener('click',()=>{
    let val=input.value;
    weather(val);
})
async function currentloc(lati,longi)
{
    try{
        let APIkey="100c6085aba6186cde700156edeecba2";
   let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${APIkey}&units=metric`);
   let result=await response.json();
    if(result.message)
    {
        second.innerHTML=`Location  not found`
        return;
    }
    details(result)
    }
    catch(error)
    {
        console.log(error);
    }
       
    
}

currloc.addEventListener('click',()=>
{
    navigator.geolocation.getCurrentPosition((position)=>{
        let lati=position.coords.latitude;
        let longi=position.coords.longitude;
        currentloc(lati,longi);

    })
})
 function details({main,name,wind})
 {
    second.innerHTML=`<div class="temp">
                <p>${main.temp}°C</p>
            </div>
            <div class="city">
                <p>${name}</p>
            </div>
            <div class="parameters">
                <div class="wind">
                    <p>Wind</p>
                    <p>${wind.speed}m/s</p>
                </div>
                <div class="pressure">
                    <p>Pressure</p>
                    <p>${main.pressure}</p>
                </div>
                <div class="humidity">
                    <p>Humidity</p>
                    <p>${main.humidity}%</p>
                </div>
            </div>`
 }