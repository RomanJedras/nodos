



 function time(v) {

      if ( v > 0 ) {
      let secunds = v % 60;
      let minuts = Math.floor((v % 3600) / 60);
      let houers = Math.floor(v / 3600);

      return houers + 'h' + ":" + ((minuts < 10) ? "0" + minuts + ' min' : minuts + ' min') + ":" + ((secunds < 10) ? "0" + secunds + ' sec.' : secunds + ' sec.');
  }
 }

 module.exports = time;

