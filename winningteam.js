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

    // let htmlstr = ""
    // for(let i=0; i<scorecardarr.length; i++){
    //     htmlstr += $(scorecardarr[i]).html()
    // }
    // console.log(htmlstr)

    let hwtbowler = "", hwt = 0

    for(let i=0; i<inningsarr.length; i++){
        let team = $(inningsarr[i]).find(".header-title.label").text()
        if(team.split("INNINGS")[0].trim()==wteam){
            // console.log(team.split("INNINGS")[0].trim())

            let bowlerarr = $(inningsarr[i]).find(".table.bowler").find("tr")
            for(let j=1; j<bowlerarr.length; j++){
                let bowlerdata = $(bowlerarr[j]).find("td")
                if(hwt<$(bowlerdata[4]).text()){
                    hwt = $(bowlerdata[4]).text()
                    hwtbowler = $(bowlerdata[0]).text()
                }
            }

            console.log("Winning team: "+wteam+", Highest wicket taker bowler Name: "+hwtbowler+", Wicket: "+hwt)

            // let batsmanarr = $(inningsarr[i]).find(".table.batsman").find("tr")
            // for(let j=1; j<batsmanarr.length; j++){
            //     let batsmandata = $(batsmanarr[j]).find("td")
            //     console.log("Batsman Name: "+$(batsmandata[0]).text()+", "+"Run: "+$(batsmandata[2]).text())
            // }

        }
    }

}