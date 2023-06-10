import { getWeather } from "../services/api.service.js";
import { printError, printHelp, printSuccess } from "../services/log.service.js";
import { saveKeyValue } from "../services/storage.service.js";
import { getIcon } from "./getIcon.js";
import dedent from 'dedent-js';

export const globalArgs = async (key, value) => {
    if(key === 'h') {
        printHelp()
    } 

    if(key === 't') {
        if(!value.length) {
            return printError('Не передан токен')
        }
        
        try {
            await saveKeyValue('token', value)
            printSuccess('Токен сохранен')
        } catch (e) {
            printError('Не удалось сохранить токен')
        }
    }

    if(key === 'c') {
        if(!value.length) {
            return printError('Не передан город')
        }
        
        try {
            await saveKeyValue('city', value)
            printSuccess('Город сохранен')
        } catch (e) {
            printError('Не удалось сохранить город')
        }
    }

    if(key === 'w') {
        const data = await getWeather()

        if(data) {
            const {name, weather, main, wind} = data

            printSuccess(dedent`
                Погода в городе ${name} - ${weather[0].description} ${getIcon(weather[0].icon)}
                Текущас температура - ${main.temp}
                Чувствуется как - ${main.feels_like}
                Максимальная температура на сегодня - ${main.temp_max}
                Минимальная температура на сегодня - ${main.temp_min}
                Скорость ветра - ${wind.speed}
            `)
        }
    }
}