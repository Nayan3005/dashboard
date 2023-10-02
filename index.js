const cryptoTop = document.getElementById('crypto-top')
const cryptoBottom = document.getElementById('crypto-bottom')
const time = document.getElementById('time')

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res=>res.json())
    .then(data=>{
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById('author').textContent = `By: ${data.user.name}`
    })
    .catch(err=>{
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
    })

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(res=>{
        if(!res.ok){
            throw Error("something went wrong!")
        }else{
            return res.json()
        }
    })
    .then(data=>{
        cryptoTop.innerHTML = `
            <img src=${data.image.small}>
            <span>${data.name}</span>
        `
        cryptoBottom.innerHTML = `
        <p>🎯: ₹${data.market_data.current_price.inr}</p>
        <p>👆: ₹${data.market_data.high_24h.inr}</p>
        <p>👇: ₹${data.market_data.low_24h.inr}</p>
        `
    })
    .catch(err => console.error(err))

function getCurrentTime(){
    const date = new Date()
    time.textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res=>{
            if(!res.ok){
                throw Error("weather data now available")
            }else{
                return res.json()
            }
        })
        .then(data=>{
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById('weather').innerHTML = `
                <img src="${iconUrl}">
                <p class="weather-temp">${Math.round(data.main.temp)}°C</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
})

fetch('https://api.breakingbadquotes.xyz/v1/quotes')
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('quote').innerHTML=
        `
            <p>${data[0].quote}</p>
            <p>- ${data[0].author}</p>
        `
    })



