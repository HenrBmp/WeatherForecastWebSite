let FORECAST;
navigator.geolocation.getCurrentPosition(
    async function success(position) {
        const LAT = position.coords.latitude;
        const LON = position.coords.longitude;
        const API_KEY = "2baa7ddf3cd92dc580ddb29560a1e03c";
        const API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

        const REQUISICAO = await fetch(API_WEATHER_URL);
        FORECAST = await REQUISICAO.json();
    },
    function error(err) {
        // TRATAMENTO DE ERRO
        // PARA DEPOIS
    }
)
export { FORECAST };