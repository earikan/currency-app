let request = require('request')
var $ = jQuery = require('jquery')

setInterval(function () {
    request("https://www.doviz.com/api/v1/currencies/all/latest", function (err, response, body) {

        let data = JSON.parse(body);

        let dolar = data.filter(function(x){ return x.code == "USD"; });
        let euro = data.filter(function(x){ return x.code == "EUR"; });

        //for usd
        let usd_buying = dolar[0]["buying"]
        let usd_selling = dolar[0]["selling"]
        let usd_change_rate = dolar[0]["change_rate"]

        //for euro
        let euro_buying = euro[0]["buying"]
        let euro_selling = euro[0]["selling"]
        let euro_change_rate = euro[0]["change_rate"]

        //change values
        setElements(usd_buying, usd_selling, usd_change_rate, euro_buying, euro_selling, euro_change_rate);

        //add arrows
        addSymbol(usd_change_rate, euro_change_rate);

    });
}, 1000);




function setElements(usd_buying, usd_selling, usd_change_rate, euro_buying, euro_selling, euro_change_rate) {
    $("#usd_buying").text(usd_buying.toString().substring(0, 6));
    $("#usd_selling").text(usd_selling.toString().substring(0, 6));
    $("#usd_change_rate").text(usd_change_rate.toString().substring(0, 5));
    $("#euro_buying").text(euro_buying.toString().substring(0, 6));
    $("#euro_selling").text(euro_selling.toString().substring(0, 6));
    $("#euro_change_rate").text(euro_change_rate.toString().substring(0, 5));
}



function addSymbol(usd_change_rate, euro_change_rate) {
    if (Number(usd_change_rate) > 0)
        $("#usd_rate_symbol").replaceWith('<i class="fas fa-sort-up fa-2x arrow up-arrow" aria-hidden="true" style=" color: green;  border-width: 0;"></i>')
    else
        $("#usd_rate_symbol").replaceWith('<i class="fas fa-sort-down fa-2x arrow down-arrow" aria-hidden="true" style=" color: red;  border-width: 0;"></i>')

    if (Number(euro_change_rate) > 0)
        $("#euro_rate_symbol").replaceWith('<i class="fas fa-sort-up fa-2x arrow up-arrow" aria-hidden="true" style=" color: green;  border-width: 0;"></i>')
    else
        $("#euro_rate_symbol").replaceWith('<i class="fas fa-sort-down fa-2x arrow down-arrow" aria-hidden="true" style=" color: red;  border-width: 0;"></i>')
}

