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
        console.log(DATA);
        
        // CRIANDO OS ELEMENTOS DA PAGINA
        const CITY = document.getElementById("city-name");
        const TEMP = document.getElementById("temperatura");
        const MIN_TEMP = document.getElementById("temp-minima");
        const MAX_TEMP = document.getElementById("temp-maxima");
        const FEELSLIKE = document.getElementById("sensacao");
        const ICON = document.getElementById("forecast-icon");

        const DESC = document.getElementById("descricao");
        const DESC_EN = DATA.weather[0].description;

        const DESC_PT = await translateText(DESC_EN);

        // SETA PARA A TEMPERATURA MINIMA
        const DOWN_ARROW = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        DOWN_ARROW.setAttribute("viewBox", "0 -960 960 960");
        const DOWN_ARROW_PATH = document.createElement("path");
        DOWN_ARROW_PATH.setAttribute("d", "M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z");
        DOWN_ARROW.appendChild(DOWN_ARROW_PATH);

        // SETA PARA A TEMPERATURA MAX
        const UP_ARROW = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        UP_ARROW.setAttribute("viewBox", "0 -960 960 960");
        const UP_ARROW_PATH = document.createElement("path");
        UP_ARROW_PATH.setAttribute("d", "M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z");
        UP_ARROW.appendChild(UP_ARROW_PATH);

        [DOWN_ARROW, UP_ARROW].forEach(
            e => e.classList.add("svg_arrow")
        );
        
        // REMOVENDO O CARREGAMENTO
        document.getElementById("loader").remove();
        
        // APLICANDO INFORMAÇÕES NA TELA
        CITY.innerHTML = DATA.name;
        TEMP.innerHTML = DATA.main.temp;
        MIN_TEMP.appendChild(DOWN_ARROW);
        MIN_TEMP.innerHTML += DATA.main.temp_min;
        MAX_TEMP.appendChild(UP_ARROW);
        MAX_TEMP.innerHTML += DATA.main.temp_max;
        FEELSLIKE.innerHTML = DATA.main.feels_like;
        ICON.setAttribute("src", `https://openweathermap.org/img/wn/${DATA.weather[0].icon}.png`);
        DESC.innerHTML = DESC_PT ? DESC_PT : DESC_EN;
        const TEMP_ELEMENTS = document.getElementsByClassName("celsius");
        console.log(TEMP_ELEMENTS);
        for (let i = 0 ; i < TEMP_ELEMENTS.length ; i++) {
            TEMP_ELEMENTS[i].innerHTML += "ºC";
        };
    },
    function error(err) {
        console.log(err)
        // TRATAMENTO DE ERRO
        // PARA DEPOIS
    }
)
