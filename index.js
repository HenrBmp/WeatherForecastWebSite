import { createSVG } from "./scripts/createSVG.js";
navigator.geolocation.getCurrentPosition(
    async function success(position) {
        // OBTENDO A PREVISÃO DO TEMPO
        const LAT = position.coords.latitude;
        const LON = position.coords.longitude;
        const API_KEY = "2baa7ddf3cd92dc580ddb29560a1e03c";
        const API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=pt`;
        
        const REQ = await fetch(API_WEATHER_URL);
        const DATA = await REQ.json();
        console.log(DATA);
        
        // CRIANDO OS ELEMENTOS DA PAGINA
        const MAIN_BOX = document.getElementById("main");

        const CITY = document.createElement("span");
        CITY.setAttribute("id", "city-name")

        const FEELSLIKE = document.createElement("span");
        FEELSLIKE.setAttribute("id", "sensacao");
        
        const NOW_BOX = document.createElement("div");
        NOW_BOX.setAttribute("id", "now");
        NOW_BOX.appendChild(FEELSLIKE);

        const DESC = document.createElement("span");
        DESC.setAttribute("id", "descricao");

        const ICON = document.createElement("img");
        ICON.setAttribute("id", "forecast-icon");

        const DESC_BOX = document.createElement("div");
        DESC_BOX.setAttribute("id", "desc");
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

        const DESC_EN = DATA.weather[0].description;
        const DESC_EN_UPPERCASE = DESC_EN[0].toUpperCase() + DESC_EN.slice(1);

        // SETA PARA A TEMPERATURA MINIMA
        const DOWN_ARROW = createSVG("M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z");

        // SETA PARA A TEMPERATURA MAX
        const UP_ARROW = createSVG("M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z");

        // ICONE DE VENTO
        const WIND_ICON = createSVG("M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z");

        // ICONE DE HUMIDADE
        const HUMIDITY_ICON = createSVG("M580-240q25 0 42.5-17.5T640-300q0-25-17.5-42.5T580-360q-25 0-42.5 17.5T520-300q0 25 17.5 42.5T580-240Zm-202-2 260-260-56-56-260 260 56 56Zm2-198q25 0 42.5-17.5T440-500q0-25-17.5-42.5T380-560q-25 0-42.5 17.5T320-500q0 25 17.5 42.5T380-440ZM480-80q-137 0-228.5-94T160-408q0-100 79.5-217.5T480-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80Zm0-80q104 0 172-70.5T720-408q0-73-60.5-165T480-774Q361-665 300.5-573T240-408q0 107 68 177.5T480-160Zm0-320Z");

        // CLASSE PARA A FORMATAÇÃO DOS VETORES
        [DOWN_ARROW, UP_ARROW, WIND_ICON, HUMIDITY_ICON].forEach(
            e => e.classList.add("svg")
        );
        
        // REMOVENDO O CARREGAMENTO
        document.getElementById("loader").remove();

        // ADICIONANDO OS ELEMENTOS NA PAGINA
        [ CITY, NOW_BOX, DESC_BOX, MINMAX, OTHERS_BOX ].forEach(e => MAIN_BOX.appendChild(e));
        
        // APLICANDO INFORMAÇÕES NA TELA
        CITY.innerHTML = DATA.name;

        MIN_TEMP.appendChild(DOWN_ARROW);
        MIN_TEMP.innerHTML += DATA.main.temp_min;
        
        MAX_TEMP.appendChild(UP_ARROW);
        MAX_TEMP.innerHTML += DATA.main.temp_max

        FEELSLIKE.innerHTML = DATA.main.feels_like;

        HUMIDADE.appendChild(HUMIDITY_ICON);
        HUMIDADE.innerHTML += DATA.main.humidity + "%";
        
        WIND.appendChild(WIND_ICON);
        WIND.innerHTML += DATA.wind.speed + " m/s";

        ICON.setAttribute("src", `https://openweathermap.org/img/wn/${DATA.weather[0].icon}.png`);
        DESC.innerHTML = DESC_EN_UPPERCASE;
        [MIN_TEMP, MAX_TEMP, FEELSLIKE].forEach(
            e => e.innerHTML += "ºC"
        );

    },
    function error(err) {
        console.log(err)
        // TRATAMENTO DE ERRO
        // PARA DEPOIS
    }
)
