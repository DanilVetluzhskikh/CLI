import axios from "axios"
import { printError } from "./log.service.js"
import { getKeyValue } from "./storage.service.js"

export const getWeather = async () => {
    const token = await getKeyValue('token')
    const city = await getKeyValue('city')

    if(!token) {
        return printError('Токен не установлен')
    }

    if(!city) {
        return printError('Город не установлен')
    }

    try {
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
            params: {
                appid: token,
                q: city,
                limit: 2
            }
        })

        if(!response.data.length) {
            return printError('Город не найден')
        }

        const lat = response.data[0].lat
        const lon = response.data[0].lon

        const responseWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat,
                lon,
                appid: token,
                lang: 'ru',
                units: 'metric'
            }
        })

        return responseWeather.data
    } catch(e) {
        printError('Не удалось данные, ' + e)
    }
}