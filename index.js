navigator.geolocation.getCurrentPosition(
    async function success(position) {
        // OBTENDO A PREVISÃO DO TEMPO
        const LAT = position.coords.latitude;
        const LON = position.coords.longitude;
        const API_KEY = "2baa7ddf3cd92dc580ddb29560a1e03c";
        const API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
        
        const REQ = await fetch(API_WEATHER_URL);
        const DATA = await REQ.json();
        
        // APLICANDO INFORMAÇÕES NA TELA
        const CITY = document.getElementById("city-name");
        const TEMP = document.getElementById("temperatura");

        CITY.innerHTML = DATA.name;
        TEMP.innerHTML = DATA.main.temp;
    },
    function error(err) {
        // TRATAMENTO DE ERRO
        // PARA DEPOIS
    }
)
