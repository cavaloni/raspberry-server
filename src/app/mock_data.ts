const mock = {
    dates: [],
            hoursMins: [],
            humidity: [],
            temperature: [],
};

let date = 17120;
let hours = 12;
let mins = 10;
let temperature = 18;
let humidity = 50;

for (let i=0; i < 20; i+=1) {
    const hoursMins = `${hours}:${mins}`
    mock.dates.push(date)
    mock.hoursMins.push(hoursMins)
    mock.humidity.push(humidity)
    mock.temperature.push(temperature)
    date+=1
    mins+=1
    temperature+=1
    humidity+=1
}

export default mock