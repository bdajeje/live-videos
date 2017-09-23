'use strict'

module.exports = {

  renderDate: function(date) {
    if(!date)
      return null;

    var month = date.getMonth() + 1;
    var day   = date.getDate();
    let hh    = date.getHours();
    let mn    = date.getMinutes();

    if( month < 10 ) month = '0' + month;
    if( day < 10 )   day   = '0' + day;
    if( hh < 10 )   hh   = '0' + hh;
    if( mn < 10 )   mn   = '0' + mn;

    return day + '/' + month + '/' + date.getFullYear() + " " + hh + ':' + mn + " UTC";
  },

  generatePriceConvertions: function(Currencies) {
    let PriceConvertions = [];

    Currencies.forEach(function(currency_1) {
      Currencies.forEach(function(currency_2) {
        if(currency_1 !== currency_2)
          PriceConvertions.push(currency_1.toUpperCase() + currency_2.toUpperCase());
      });
    });

    return PriceConvertions;
  }

}
