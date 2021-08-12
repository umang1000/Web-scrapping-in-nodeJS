const cheerio = require('cheerio')
const request = require('request')

request(process.argv.slice(2)[0], cb)

function cb(err , res, html) {
    if(err) 
    console.log(err)
    else{
        extractHTML(html)
    }
}

function extractHTML(html) {
    const $ = cheerio.load(html)
    let teamarr = $(".match-info.match-info-MATCH .team"), wteam = $(teamarr[0]).find(".name").text()
    for(let i=0; i<teamarr.length; i++){
        let hasclass = $(teamarr[i]).hasClass("team-gray")
        if(hasclass==false){
            wteam = $(teamarr[i]).find(".name").text()
        }

    }
    console.log(wteam)
    let inningsarr = $(".card.content-block.match-scorecard-table>.Collapsible")

    let hwtbowler = "", hwt = 0

    for(let i=0; i<inningsarr.length; i++){
        let team = $(inningsarr[i]).find(".header-title.label").text()
        if(team.split("INNINGS")[0].trim()==wteam){
            // console.log(team.split("INNINGS")[0].trim())

            let bowlerarr = $(inningsarr[i]).find(".table.bowler").find("tr")
            for(let j=1; j<bowlerarr.length; j++){
                let bowlerdata = $(bowlerarr[j]).find("td")
                // if(hwt<$(bowlerdata[4]).text()){
                //     hwt = $(bowlerdata[4]).text()
                //     hwtbowler = $(bowlerdata[0]).text()
                // }
                let link = "https://www.espncricinfo.com"+$(bowlerdata[0]).find("a").attr("href")
                request(link, callb)
                function callb(err, res, html) {
                    if(err){
                        console.log(err)
                    } else{
                        extractBirthday(html)
                    }
                }
            }
        }
    }
}

function extractBirthday(html) {
    const $ = cheerio.load(html)
    let arr = $(".player_overview-grid").find("div")
    arr = $(arr[1]).find("h5")
    console.log(arr.text())
}