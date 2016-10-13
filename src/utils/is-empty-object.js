export default function(obj) {
  return Object.keys(obj).length !== 0 && obj.constructor === Object
}
