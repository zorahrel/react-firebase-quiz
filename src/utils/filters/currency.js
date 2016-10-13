export default function(value, currency = '$', decimalPosition = 2) {
  if(!!value) {
    return currency + ' ' + Number(value).toFixed(decimalPosition).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  } else {
    return '';
  }
}
