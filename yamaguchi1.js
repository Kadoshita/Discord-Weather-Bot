var fs = require('fs');
var http = require('http');
var location = "yamaguchi-ken,jp";
var units = 'metric';
var APIKEY = "APIKEY_IS_HERE";
var URL = 'http://api.openweathermap.org/data/2.5/weather?q='+ location +'&units='+ units +'&appid='+ APIKEY;
const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'Discord_Token_here';
var yamaguchi = JSON.parse(fs.readFileSync('./yamaguchi_weather.json', 'utf8'));
var en = yamaguchi.weather[0].description;
var ja = translate(en);
function translate(en){
    switch(en.toLowerCase()){
        case 'thunderstorm with light rain':ja='雷と弱い雨';break;
        case 'thunderstorm with rain':ja='雷と雨';break;
        case 'thunderstorm with heavy rain':ja='雷と強い雨';break;
        case 'light thunderstorm':ja='弱い雷';break;
        case 'thunderstorm':ja='雷';break;
        case 'heavy thunderstorm':ja='強い雷';break;
        case 'ragged thunderstorm':ja='荒れ狂った雷';break;
        case 'thunderstorm with light drizzle':ja='雷と弱い霧雨';break;
        case 'thunderstorm with drizzle':ja='雷と霧雨';break;
        case 'thunderstorm with heavy drizzle':ja='雷と強い霧雨';break;
        case 'light intensity drizzle':ja='軽い霧雨';break;
        case 'drizzle':ja='霧雨';break;
        case 'heavy intensity drizzle':ja='強い霧雨';break;
        case 'light intensity drizzle rain':ja='弱い霧雨または雨'
        case 'drizzle rain':ja='霧雨';break;
        case 'heavy intensity drizzle rain':ja='強い霧雨';break;
        case 'shower rain and drizzle':ja='にわか雨または霧雨';break;
        case 'heavy shower rain and drizzle':ja='強いにわか雨または霧雨';break;
        case 'shower drizzle':ja='にわか雨(霧雨)';break;
        case 'light rain':ja='小雨';break;
        case 'moderate rain':ja='雨';break;
        case 'heavy intensity rain':ja='強い雨';break;
        case 'very heavy rain':ja='非常に激しい雨';break;
        case 'extreme rain':ja='猛烈な雨';break;
        case 'freezing rain':ja='凍雨';break;
        case 'light intensity shower rain':ja='弱いにわか雨';break;
        case 'shower rain':ja='にわか雨';break;
        case 'heavy intensity shower rain':ja='強いにわか雨';break;
        case 'ragged shower rain':ja='荒れ狂ったにわか雨';break;
        case 'light snow':ja='弱い雪';break;
        case 'snow':ja='雪';break;
        case 'heavy snow':ja='強い雪';break;
        case 'sleet':ja='みぞれ';break;
        case 'shower sleet':ja='にわかみぞれ';break;
        case 'light rain and snow':ja='弱い雨と雪';break;
        case 'rain and snow':ja='雨と雪';break;
        case 'light shower snow':ja='軽いにわか雪';break;
        case 'shower snow':ja='にわか雪';break;
        case 'heavy shower snow':ja='強いにわか雪';break;
        case 'mist':ja='もや';break;
        case 'smoke':ja='煙';break;
        case 'haze':ja='煙霧';break;
        case 'sand, dust whirls':ja='砂、粉塵旋回';break;
        case 'fog':ja='霧';break;
        case 'sand':ja='砂';break;
        case 'dust':ja='ごみ';break;
        case 'colcanic ash':ja='火山灰';break;
        case 'squalls':ja='スコール';break;
        case 'tornado':ja='トルネード';break;
        case 'clear sky':ja='快晴';break;
        case 'few clouds':ja='晴れ';break;
        case 'scattered clouds':ja='千切れ雲';break;
        case 'broken clouds':ja='雲がち';break;
        case 'overcast clouds':ja=曇り;break;
        case 'tornado':ja='トルネード';break;
        case 'tropical storm':ja='熱帯暴風雨';break;
        case 'hurricane':ja='ハリケーン';break;
        case 'cold':ja='激しい寒さ';break;
        case 'hot':ja='激しい暑さ';break;
        case 'windy':ja='激しい風';break;
        case 'hall':ja='大きな雹';break;
        case 'calm':ja='平穏/静穏';break;
        case 'light air':ja='至軽風';break;
        case 'light breeze':ja='軽風';break;
        case 'gentle breeze':ja='軟風';break;
        case 'moderate breeze':ja='和風';break;
        case 'fresh breeze':ja='疾風';break;
        case 'strong breeze':ja='雄風';break;
        case 'high wind, near gale':ja='強風';break;
        case 'gale':ja='疾強風';break;
        case 'severe gale':ja='大強風';break;
        case 'storm':ja='全強風';break;
        case 'violent storm':ja='防風/烈風';break;
        case 'hurricane':ja='颶風';break;
        default :ja=en.toLowerCase();break;
    }
    return ja;
}
client.on('ready', () => {
    console.log('OK!');
});

client.on('message', message => {
    if (message.content === '!天気情報更新') {
        http.get(URL, function(res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('data', function(chunk) {
                res = JSON.parse(body);
                fs.writeFile('yamaguchi_weather.json', JSON.stringify(res, null, '   '));
            });
        }).on('error', function(e) {
            console.log(e.message);
        });
    }
    if (message.content === '!山口県の天気') {
        message.channel.sendMessage('現在の山口県の天気は、'
        + '```'
        + '天気: ' + ja + '\n'
        + '気温: ' + yamaguchi.main.temp + '℃\n'
        + '風力: ' + yamaguchi.wind.speed + 'm\n'
        + '風向: ' + yamaguchi.wind.deg + '°\n'
        + '雲量: ' + yamaguchi.clouds.all + '%\n'
        + '```'
        + 'です。')
     }
})
client.login(token);
