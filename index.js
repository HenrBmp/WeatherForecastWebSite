import { translateText } from "./scripts/translate.js";
navigator.geolocation.getCurrentPosition(
    async function success(position) {
        // OBTENDO A PREVISÃO DO TEMPO
        const LAT = position.coords.latitude;
        const LON = position.coords.longitude;
        const API_KEY = "2baa7ddf3cd92dc580ddb29560a1e03c";
        const API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
        
        const REQ = await fetch(API_WEATHER_URL);
        const DATA = await REQ.json();
        
        // CRIANDO OS ELEMENTOS DA PAGINA
        const CITY = document.getElementById("city-name");
        const TEMP = document.getElementById("temperatura");
        const MIN_TEMP = document.getElementById("temp-minima");
        const MAX_TEMP = document.getElementById("temp-maxima");
        const FEELSLIKE = document.getElementById("sensacao");
        const ICON = document.getElementById("forecast-icon");
        const DESC = document.getElementById("descricao");
        const DESC_EN = DATA.weather[0].description;

        // TRADUZINDO DESCRICAO
        // const res = await 
        const DESC_PT = "placeholder";
        
        // REMOVENDO O CARREGAMENTO
        document.getElementById("loader").remove();
        
        // APLICANDO INFORMAÇÕES NA TELA
        CITY.innerHTML = DATA.name;
        TEMP.innerHTML = DATA.main.temp;
        MIN_TEMP.innerHTML = DATA.main.temp_min;
        MAX_TEMP.innerHTML = DATA.main.temp_max;
        FEELSLIKE.innerHTML = DATA.main.feels_like;
        ICON.setAttribute("src", `https://openweathermap.org/img/wn/${DATA.weather[0].icon}.png`);
        DESC.innerHTML = DESC_PT;
    },
    function error(err) {
        // TRATAMENTO DE ERRO
        // PARA DEPOIS
    }
)
