const axios = require('axios');

//  创建实例
const axiosInstant=axios({
  method: 'get',
  url: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    lat: 44.34,
    lon: 10.99,
    appid: 'db3ea3878f41eeb964fc84b5860354bd' // 
  },
  responseType: 'json' 
});

console.log('看看是不是异步完成的？');
//
axiosInstant.then(function(response){
    console.log('成功响应:', response.data);
});
axiosInstant.catch(function (error) {
  console.error('请求失败:', error.message);
  if (error.response) {
    console.error('状态码:', error.response.status);
    console.error('响应数据:', error.response.data);
  }
});

// 看看是不是异步完成的？
// 成功响应: {
//   coord: { lon: 10.99, lat: 44.34 },
//   weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' } ],
//   base: 'stations',
//   main: {
//     temp: 293.38,
//     feels_like: 293.44,
//     temp_min: 293.38,
//     temp_max: 293.38,
//     pressure: 1017,
//     humidity: 76,
//     sea_level: 1017,
//     grnd_level: 951
//   },
//   visibility: 10000,
//   wind: { speed: 1.48, deg: 237, gust: 0.54 },
//   clouds: { all: 0 },
//   dt: 1754967950,
//   sys: { country: 'IT', sunrise: 1754972146, sunset: 1755023193 },
//   timezone: 7200,
//   id: 3163858,
//   name: 'Zocca',
//   cod: 200
// }
console.log('====================');
//直接使用实例
axios.get('https://api.openweathermap.org/data/2.5/weather', {
  params: {
    lat: 44.34,
    lon: 10.99,
    appid: 'db3ea3878f41eeb964fc84b5860354bd' // 
  },
  responseType: 'json' 
}).then(function(response){
    console.log('成功响应1:', response.data);
}).catch(function (error) {
  console.error('请求失败:', error.message);
  if (error.response) {
    console.error('状态码:', error.response.status);
    console.error('响应数据:', error.response.data);
  }
});

// 看看是不是异步完成的？  
// ====================
// 成功响应: {
//   coord: { lon: 10.99, lat: 44.34 },
//   weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' } ],
//   base: 'stations',
//   main: {
//     temp: 293.23,
//     feels_like: 293.2,
//     temp_min: 293.23,
//     temp_max: 293.23,
//     pressure: 1016,
//     humidity: 73,
//     sea_level: 1016,
//     grnd_level: 951
//   },
//   visibility: 10000,
//   wind: { speed: 1.48, deg: 237, gust: 0.54 },
//   clouds: { all: 0 },
//   dt: 1754968822,
//   sys: { country: 'IT', sunrise: 1754972146, sunset: 1755023193 },
//   timezone: 7200,
//   id: 3163858,
//   name: 'Zocca',
//   cod: 200
// }
// 成功响应1: {
//   coord: { lon: 10.99, lat: 44.34 },
//   weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' } ],
//   base: 'stations',
//   main: {
//     temp: 293.23,
//     feels_like: 293.2,
//     temp_min: 293.23,
//     temp_max: 293.23,
//     pressure: 1016,
//     humidity: 73,
//     sea_level: 1016,
//     grnd_level: 951
//   },
//   visibility: 10000,
//   wind: { speed: 1.48, deg: 237, gust: 0.54 },
//   clouds: { all: 0 },
//   dt: 1754968822,
//   sys: { country: 'IT', sunrise: 1754972146, sunset: 1755023193 },
//   timezone: 7200,
//   id: 3163858,
//   name: 'Zocca',
//   cod: 200
// }

