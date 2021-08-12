const cheerio = require('cheerio')
const request = require('request')
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary"

request(url, cb)

function cb(err , res, html) {
    if(err) 
    console.log(err)
    else{
        extractHTML(html)
    }
}

function extractHTML(html) {
    const $ = cheerio.load(html)
    let arr = $(".match-comment .match-comment-wrapper .match-comment-long-text")
    console.log($(arr[0]).text())
}