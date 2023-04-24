const fs = require('fs')
const path = require('path')

const languagesFolderPath = "../languages"
const languagesFolder = fs.readdirSync(path.resolve(__dirname, languagesFolderPath)).map(k => path.resolve(__dirname, languagesFolderPath, k)).filter(k => fs.statSync(k).isFile() && k.endsWith('.json'))

let languages = {}

for(const languageFile of languagesFolder) {
    try {
        const locale = require(languageFile)

        languages[path.parse(languageFile).name] = locale
    } catch(err) {
        console.error(`[localeLoader]: Unable to load: "${languageFile}": ${err.stack}`)
    }
}

function dstringf(str, strTemplates) {
    if(typeof str !== "string" || !Array.isArray(strTemplates) || strTemplates.some(k => typeof k !== "string")) return null

    return str.replace(/(?<!\\)%\d+/g, (k) => {
        const index = parseInt(k.slice(1))

        return ((index > strTemplates.length) ? "%null%" : strTemplates[index])
    }).replace(/\\%/g, '%')
}

function getLocale(language, string, varTemplating) {
    if ([language, string].some(k => typeof k !== "string") || ((typeof varTemplating !== "undefined") ? (!Array.isArray(varTemplating) || varTemplating.some(k => typeof k !== "string")) : false)) return null

    if(typeof languages[language] === "undefined") return null
    if(typeof languages[language][string] === "undefined") return null

    let localeStr = languages[language][string];

    if (typeof varTemplating !== "undefined") {
        localeStr = dstringf(localeStr, varTemplating)
    }

    return localeStr
}

module.exports = {
    getLocale
}
// console.log(getLocale("en", "errors.OnlyDM", ['10']))