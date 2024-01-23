import '../scss/style.scss'



export const api = '20ea2c25f540f9908dfb1d75424a6277';
export let exportData;
  let long;
  let lat;
  let elem;
  let export_number;
  const input = document.getElementById('input');
  const suggestions = document.querySelector('.suggestions');
  const tempBlock = document.querySelector('.mainCity__temp')
  const cityBlock = document.querySelector('.mainCity__name')
  const adder = document.querySelector('.mainCity__addBtn-btn');
  const storage = document.querySelector('.favorite__storage');
  const form = document.querySelector('.head__findBtn');
  const todayBtn = document.getElementById('btn-Today');
  let citites_obj = {};
  let cities_list = new Array();
  let cities_available = ['Moscow', 'Saint-Petersburg', 'London', 'Washington', 'Novosibirsk', 'Paris', 'New York', 'Simferopol', 'Sochi', 'Berlin', 'Ankara'];
  let cities_avalibal_info = {
    'Moscow':{
      'name': 'Moscow',
      'long': 55.7522,
      'lat':  37.6156,
    },
    'Saint-Petersburg':{
      'name': 'Saint-Petersburg',
      'long': 30.3141,
      'lat':  59.9386,
    },
    'London':{
      'name': 'London',
      'long':  -0.127765,
      'lat':  51.507446,
    },
    'Washington':{
      'name': 'Washington',
      'long':  -77.036543,
      'lat':  38.895037,
    },
    'Novosibirsk':{
      'name': 'Novosibirsk',
      'long': 82.922689,
      'lat': 55.028831,
    },
    'Paris':{
      'name': 'Paris',
      'long': 2.320041,
      'lat': 48.858890,
    },
  }

try{
  
  window.addEventListener('click', function(){
    suggestions.style.display = 'none';
    input.classList.remove('head__input-active')
  })


  function cityAdder(city, cityName){
    if(cities_list.indexOf(cityName) == -1){
      cities_list.push(cityName);
      console.log(cities_list)
      let key = Math.max(Object.keys(citites_obj)) + 1;
      console.log(key)
      citites_obj[key] = city;


      elem = document.createElement('section');
      elem.className = `city city-${key}`;

      elem.setAttribute('data-number', key);

      elem.innerHTML = `<div class="city__body">
                        <img src="/public/images/city__img.svg" alt="" class = 'city__icon'>
                        <div class="city__title">
                          ${cityName}
                        </div>
                      </div>
                      <button class="city__delBtn" data-del-num = ${key}>
                        Delete
                      </button>`;
        

      storage.append(elem);
      console.log('new city is added')
      return 1;

    } else{
      return 0;

    }
  }


    input.addEventListener('input', function() {
      let suggestion;
      const value = this.value.toLowerCase();
      if(value.length > 0){
        const filteredCities = cities_available.filter(city => city.toLowerCase().startsWith(value));
        if (filteredCities.length > 0) {
          suggestions.innerHTML = '';
          filteredCities.forEach(city => {
            suggestion = document.createElement('div');
            suggestion.textContent = city;
            suggestion.addEventListener('click', function() {
              input.value = this.textContent;
              suggestions.style.display = 'none';
            }, {once: true,});
            suggestions.appendChild(suggestion);
            input.classList.add('head__input-active')
            let width = input.getBoundingClientRect().width;
            suggestions.style.width = width + 'px';
            suggestions.style.display = 'block';
          });
        } else{
          suggestions.innerHTML = '';
          suggestion = document.createElement('div');
          suggestion.textContent = 'Not Found';
          suggestions.appendChild(suggestion);
          input.classList.add('head__input-active')
          let width = input.getBoundingClientRect().width;
          suggestions.style.width = width + 'px';
          suggestions.style.display = 'block';
        }
      } else{
        suggestions.style.display = 'none';
        input.classList.remove('head__input-active')
      }
    });




  form.addEventListener('click', function(event){
    event.preventDefault();
    const chose_city = input.value;
    if(cities_available.indexOf(chose_city ) != -1){
      if(cityAdder(cities_avalibal_info[chose_city], chose_city) == 0){
        input.value = '';
        storage.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      };
      input.value = '';

    }

  });



  adder.addEventListener('click', function(event){  // add new city in the storage
    let cityName = cityBlock.textContent;
    let city = {
      'name': cityName,
      'long': long,
      'lat': lat,
    };

    if(cityAdder(city, cityName) == 0){
      setTimeout(()=>{adder.classList.toggle('__active');}, 1500);
      adder.classList.toggle('__active');
    };

  });


  storage.addEventListener('click', function(event){
    let target = event.target;
    if(target.closest('button')){
      if(target.hasAttribute('data-del-num')){ // delete added city
        let num = target.dataset.delNum;
        delete citites_obj[num];
        cities_list.splice(cities_list.indexOf(num), 1);
        elem = document.querySelector(`.city-${num}`);
        elem.remove();

      }


    } else if(target.closest('section')){
      export_number = target.closest('section').dataset.number;
      exportData = citites_obj[export_number];
      
      console.log(exportData);
      window.location.replace('city-weather.html');
      
    }
  });







  window.addEventListener('load', () => {
    // Accesing Geolocation of User

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Storing Longitude and Latitude in variables
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`;

        // Using fetch to get data
        fetch(base)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const { temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;

            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const tempC = String((temp.toFixed(2) - 273.15).toFixed(1));

            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);

            // Interacting with DOM to show data
            cityBlock.textContent = `${place}`;
            tempBlock.textContent = `${tempC} °C`;
          });
      });
    }
  });

}
catch{

}