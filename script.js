const container=document.querySelector('.container');
const search=document.querySelector('.searchbox button');
const weatherbox=document.querySelector('.weatherbox');
const weatherdetails=document.querySelector('.details');
const error=document.querySelector('.notfound');
search.addEventListener('click',() =>{
    const APIkey='f58d456e6fc764af07c51470085c2926';
    const city=document.querySelector('.searchbox input').value;
    if(city=='')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {
        if(json.cod=="404"){
            container.style.height='400px';
            weatherbox.classList.remove('active');
            //weatherbox.style.visibility = 'hidden';
           weatherdetails.classList.remove('active');
            //weatherdetails.style.visibility = 'hidden';
            error.classList.add('active');
            return;
        }
            container.style.height='550px';
            weatherbox.classList.add('active');
            //weatherbox.style.visibility = 'visible';
            weatherdetails.classList.add('active');
           // weatherdetails.style.visibility = 'visible';
             error.classList.remove('active');
        const image=document.querySelector('.weatherbox img');
        const tempr=document.querySelector('.weatherbox .temperature');
        const desc=document.querySelector('.weatherbox .desc');
        const humidity=document.querySelector('.details .humidity span');
        const wind=document.querySelector('.details .wind span');
        switch (json.weather[0].main) {
            case 'Clear':
                image.src='images/sunny.png';
                break;
            case 'Rain':
                image.src='images/rain.png';
                break;
            case 'Snow':
                image.src='images/snow.png';
                break;
            case 'Clouds':
                image.src='images/cloudy.png';
                break;
            case 'Mist':
                image.src='images/mist.png';
                break;
            case 'Haze':
                image.src='images/mist.png';
                break;
            default:
                image.src="images/cloudy.png";
                break;
        }
        tempr.innerHTML=`${parseInt(json.main.temp)}<span><sup>℃</sup></span>`;
        desc.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;
    });
});