module.export = function uuid(count, prefix){
  prefix = prefix || ''

  if( !count || (32 < count || count < 6)){
    count = 6
  }
  return prefix + Math.random().toString(16).substr(2).slice(-(count-2))+(new Date()).getTime().toString(16).slice(9);
}
