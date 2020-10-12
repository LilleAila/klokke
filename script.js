$('document').ready(function () {
    weather();
    $('.klokke').css('width', `${eval($('.klokke').css('width').slice(0, -2)) - 50}px`);
    $('.klokke').css('height', `${eval($('.klokke').css('height').slice(0, -2)) - 50}px`);
});
var dager = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']

function setNewDate() {
    let yr = new Date().getFullYear() + '';
    d = {
        // date: new Date(),
        seconds: new Date().getSeconds(),
        milliseconds: new Date().getMilliseconds(),
        minutes: new Date().getMinutes(),
        hours: new Date().getHours(),
        dayOfWeek: new Date().getDay(),
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: yr,
        digitalMinutes: new Date().getMinutes(),
        digitalHours: new Date().getHours(),
        digitalSeconds: new Date().getSeconds()
    }
    if (d.hours >= 12) {
        d['hours'] -= 12;
    }
    if (d.digitalHours >= 0 && d.digitalHours <= 9) {
        d['digitalHours'] = '' + 0 + new Date().getHours();
    }
    if (d.digitalMinutes >= 0 && d.digitalMinutes <= 9) {
        d['digitalMinutes'] = '' + 0 + new Date().getMinutes();
    }
    if (d.digitalSeconds >= 0 && d.digitalSeconds <= 9) {
        d['digitalSeconds'] = '' + 0 + new Date().getMinutes();
    }
    d['seconds']++;
    // console.log(d.hours);
    // console.log(d.seconds);
    setTime(d);
}

function setTime(time) {
    $('.hours').css('transform', `translate(-50%, 50%) rotate(${time.hours * 30 + time.minutes / 60 * 30}deg)`);
    $('.minutes').css('transform', `translate(-50%, 50%) rotate(${time.minutes * 6}deg)`);
    // $('.minutes').css('transform', `translate(-50%, 50%) rotate(${11 * 30}deg)`);
    $('.seconds').css('transform', `translate(-50%, 50%) rotate(${time.seconds * 6 + time.milliseconds * 0.006}deg)`);
    $('.day').text(time.day);
    $('.month').text(time.month);
    $('.year').text(time.year);
    $('.hoursDigital').text(time.digitalHours);
    $('.minutesDigital').text(time.digitalMinutes);
    $('.secondsDigital').text(time.digitalSeconds);
    $('.dayOfWeek').text(dager[time.dayOfWeek]);
}

function weather(position) {
    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        $.ajax({
            url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
            type: 'get',
            dataType: 'json',
            success: (data) => getWeather(data),
            error: (err) => weatherError(err)
        });
    })
}

function getWeather(data) {
    // console.log(data);
    $('.grader').text(`${Math.round(data.properties.timeseries[0].data.instant.details.air_temperature)}°`);
    $('.wind').text(`${Math.round(data.properties.timeseries[0].data.instant.details.wind_speed)}m/s`)
    $('.centerDot').css('background-image', `url('https://api.met.no/images/weathericons/svg/${data.properties.timeseries[0].data.next_1_hours.summary.symbol_code}.svg')`);
    $('.weatherImg').css('background-image', `url('https://api.met.no/images/weathericons/svg/${data.properties.timeseries[0].data.next_1_hours.summary.symbol_code}.svg')`)
}

function weatherError(err) {
    console.log('Error', err);
}

setInterval(() => setNewDate(), 50);
setInterval(() => weather(), 60 * 60 * 1000);