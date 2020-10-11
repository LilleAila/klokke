var d = {
    date: new Date(),
    seconds: new Date().getSeconds(),
    minutes: new Date().getMinutes(),
    hours: new Date().getHours()
}
// console.log(d.seconds);
if (d.hours >= 12) {
    d['hours'] -= 12;
}
d['seconds']++;
d['minutes']++;
d['hours']++;

function setNewDate() {
    d = {
        date: new Date(),
        seconds: new Date().getSeconds(),
        milliseconds: new Date().getMilliseconds(),
        minutes: new Date().getMinutes(),
        hours: new Date().getHours()
    }
    if (d.hours >= 12) {
        d['hours'] -= 12;
    }
    d['seconds']++;
    d['minutes']++;
    // d['hours']++;
    // console.log(d.hours);
    // console.log(d.seconds);
    setTime(d);
}

function setTime(time) {
    $('.hours').css('transform', `translate(-50%, 50%) rotate(${time.hours * 30 + time.minutes / 60 * 30}deg)`);
    $('.minutes').css('transform', `translate(-50%, 50%) rotate(${time.minutes * 6}deg)`);
    // $('.minutes').css('transform', `translate(-50%, 50%) rotate(${11 * 30}deg)`);
    $('.seconds').css('transform', `translate(-50%, 50%) rotate(${time.seconds * 6 + time.milliseconds * 0.006}deg)`);
}

setInterval(() => setNewDate(), 1);
