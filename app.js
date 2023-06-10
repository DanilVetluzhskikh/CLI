#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { globalArgs } from "./helpers/printArg.js"

const initCLI = () => {
    const res = getArgs(process.argv)
    
    Object.keys(res).forEach((key) => {
        globalArgs(key, res[key])
    })
}

initCLI()