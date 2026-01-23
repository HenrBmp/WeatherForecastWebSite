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
        const MAIN_BOX = document.getElementById("main");

        const CITY = document.createElement("span");
        CITY.setAttribute("id", "city-name")

        const TEMP = document.createElement("span");
        TEMP.setAttribute("id", "temperatura");

        const FEELSLIKE = document.createElement("span");
        FEELSLIKE.setAttribute("id", "sensacao");
        
        const NOW_BOX = document.createElement("div");
        NOW_BOX.setAttribute("id", "now");
        [CITY, FEELSLIKE].forEach(
            e => NOW_BOX.appendChild(e)
        );

        const DESC = document.createElement("span");
        DESC.setAttribute("id", "descricao");

        const ICON = document.createElement("img");
        ICON.setAttribute("id", "forecast-icon");

        const DESC_BOX = document.createElement("div");
        DESC.setAttribute("id", "desc");
        [DESC, ICON].forEach(
            e => DESC_BOX.appendChild(e)
        );

        const MIN_TEMP = document.createElement("span");
        MIN_TEMP.setAttribute("id", "temp-minima");

        const MAX_TEMP = document.createElement("span");
        MAX_TEMP.setAttribute("id", "temp-maxima");

        const MINMAX = document.createElement("div");
        MINMAX.setAttribute("id", "minmax");
        [MIN_TEMP, MAX_TEMP].forEach(
            e => MINMAX.appendChild(e)
        );

        const HUMIDADE = document.createElement("span");
        HUMIDADE.setAttribute("id", "humidade");

        const WIND = document.createElement("span");
        WIND.setAttribute("id", "vento-vel");

        const OTHERS_BOX = document.createElement("div");
        OTHERS_BOX.setAttribute("id", "others-info");
        [HUMIDADE, WIND].forEach(
            e => OTHERS_BOX.appendChild(e)
        );
        
        // TRADUZINDO A DESCRICAO
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

        // ADICIONANDO OS ELEMENTOS NA PAGINA
        [ CITY, NOW_BOX, DESC_BOX, MINMAX, OTHERS_BOX ].forEach(e => MAIN_BOX.appendChild(e));
        
        // APLICANDO INFORMAÇÕES NA TELA
        CITY.innerHTML = DATA.name;
        TEMP.innerHTML = DATA.main.temp;
        MIN_TEMP.appendChild(DOWN_ARROW);
        MIN_TEMP.innerHTML += DATA.main.temp_min;
        MAX_TEMP.appendChild(UP_ARROW);
        MAX_TEMP.innerHTML += DATA.main.temp_max;
        FEELSLIKE.innerHTML = DATA.main.feels_like;
        HUMIDADE.innerHTML = DATA.main.humidity;
        WIND.innerHTML = DATA.wind.speed;
        ICON.setAttribute("src", `https://openweathermap.org/img/wn/${DATA.weather[0].icon}.png`);
        DESC.innerHTML = DESC_PT ? DESC_PT : DESC_EN;
        [TEMP, MIN_TEMP, MAX_TEMP, FEELSLIKE].forEach(
            e => e.innerHTML += "ºC"
        );

    },
    function error(err) {
        console.log(err)
        // TRATAMENTO DE ERRO
        // PARA DEPOIS
    }
)
