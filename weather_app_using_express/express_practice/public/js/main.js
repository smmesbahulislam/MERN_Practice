const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById("cityName");
const city_name = document.getElementById('city_name');

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelectorAll(".middle_layer,.day_layer,.date_layer");

const day = document.getElementById('day');
const today_date = document.getElementById('today_data');

// get date and day name 
const currentDate = new Date();
// Get the date as a string in the format "MM/DD/YYYY"
const dateString = currentDate.toLocaleDateString('en-US');

const options = { weekday: 'long' };
const dayName = currentDate.toLocaleString('en-US', options);



function kelvinToFahrenheit(kelvin) {
    const fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
    return fahrenheit;
}

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    cityName.value = "";

    if (cityVal === "") {
        city_name.innerText = `Please write the name before search.`;

        datahide.forEach(element => {
            element.classList.add('data_hide');
        })
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=5430c4a822ccebc8211ea54c3f71133e`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            const kelvin = arrData[0].main.temp;
            const fahrenheit = kelvinToFahrenheit(kelvin);
            temp_real_val.innerText = parseInt(fahrenheit);

            const tempMood = arrData[0].weather[0].main;

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML = '<img src="../images/Sun.png" alt="Haze">';
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = '<img src="../images/Cloud.png" alt="Haze">';
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = '<img src="../images/Rain.png" alt="Haze">';
            } else if (tempMood == "Haze") {
                temp_status.innerHTML = '<img src="../images/Haze.png" alt="Haze">';
            }
            day.innerText = dayName;
            today_date.innerText = dateString;
            datahide.forEach(element => {
                element.classList.remove('data_hide');
            })
            // console.log(arrData);

        } catch (err) {
            console.log(err);
            datahide.forEach(element => {
                element.classList.add('data_hide');
            })
        }
    }
}


submitBtn.addEventListener('click', getInfo);