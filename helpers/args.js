export const getArgs = (args) => {
    const [_, __, ...rest] = args

    const res = {}

    rest.forEach((value, index, array) => {
        if(value.charAt(0) === '-') {
            if(index === rest.length - 1 || array[index + 1].charAt(0) === '-') {
                return res[value.substring(1)] = true
            }

            res[value.substring(1)] = array[index + 1]
        }
    })

    return res
}