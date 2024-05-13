let preloader = document.querySelector('#preloader')
if (preloader) {
  window.addEventListener('load', () => {
    preloader.remove()
})
}
var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  slidesPerView: 3,
  centeredSlides: true,
  grabCursor: true,
  spaceBetween: 30,
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
  breakpoints: {
  300: {
      slidesPerView: 1,
  },
  568: {
      slidesPerView: 1,
  },
  768: {
      slidesPerView: 2,
  },
  992: {
      slidesPerView: 3,
  },
  }
  })
  swiper.slideTo(1)

  
document.addEventListener('DOMContentLoaded', function() {
  search ()
})

function search() {
  let q = document.querySelector('#search-input').value || 'Damascus';
  let current_weather = document.querySelector('#current-weather');
  let slider = document.querySelector('#slider');

  if (q.trim()!== '') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=3f42280c1ff382714a1940d026120909`)
     .then(res => res.json())
     .then(data1 => {
        current_weather.innerHTML = `
          <div class="card shadow border-0 ms-2 me-2">
            <div class="card-body text-center">
              <h1 class="card-title fw-bold">${data1.name}</h1>
              <img class="img-fluid" src="https://openweathermap.org/img/wn/${data1.weather[0].icon}.png">
              <p class="fw-bold mb-0 text-capitalize fs-4 mb-3">${data1.weather[0].description}</p>
              <p class="fw-bold mb-0 text-capitalize fs-4 mb-3">${(data1.main.temp - 273.15).toFixed(2)} °C</p>
              <p class="fw-bold mb-0 text-capitalize text-start fs-5">clouds : ${data1.clouds.all}%</p>
              <p class="fw-bold mb-0 text-capitalize text-start fs-5">Humidity : ${data1.main.humidity}%</p>
              <p class="fw-bold mb-0 text-capitalize text-start fs-5">wind : ${data1.wind.speed} m/s</p>
              <p class="fw-bold mb-0 text-capitalize text-start fs-5">pressure : ${data1.main.pressure}hPa</p>
            </div>
          </div>`;
      })
     .catch(error => console.error('Error fetching weather data:', error));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=3f42280c1ff382714a1940d026120909`)
     .then(res => res.json())
     .then(data2 => {
        slider.innerHTML = ''
        for(let index = 0; index < data2.list.length ; index++) {
          slider.innerHTML += `
            <div class="swiper-slide">
              <div class="card shadow border-0">
                  <div class="card-body text-center">
                  <h1 class="card-title fw-bold">${data2.city.name}</h1>
                    <img class="img-fluid" src="https://openweathermap.org/img/wn/${data2.list[index].weather[0].icon}.png">
                    <p class="fw-bold mb-0 text-capitalize fs-4 mb-3">${data2.list[index].weather[0].description}</p>
                    <p class="fw-bold mb-0 text-capitalize fs-4 mb-3">${data2.list[index].dt_txt}</p>
                    <p class="fw-bold mb-0 text-capitalize fs-4 mb-3">${(data2.list[index].main.temp - 273.15).toFixed(2)} °C</p>
                    <p class="fw-bold mb-0 text-capitalize text-start fs-5">clouds : ${data2.list[index].clouds.all}%</p>
                    <p class="fw-bold mb-0 text-capitalize text-start fs-5">Humidity : ${data2.list[index].main.humidity}%</p>
                    <p class="fw-bold mb-0 text-capitalize text-start fs-5">wind : ${data2.list[index].wind.speed} m/s</p>
                    <p class="fw-bold mb-0 text-capitalize text-start fs-5">pressure : ${data2.list[index].main.pressure}hPa</p>
                  </div>
              </div>
            </div>`
        }
      })
  } else {
    alert('ERROR, You Have To Write a Country');
  }
}