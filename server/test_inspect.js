const util = require('util')
const myObject = {
   "a":"a",
   "b":{
      "c":"c",
      "d":{
         "e":"e",
         "f":{
            "g":"g",
            "h":{
               "i":"i"
            }
         }
      }
   }
};
console.log(util.inspect(myObject, {showHidden: false, depth: null}))