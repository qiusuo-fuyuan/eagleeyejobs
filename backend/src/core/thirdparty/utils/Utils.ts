import { WeChatURLParams } from "../wechat/DataTypes.js";


 export function urlParamsToURI(dict: WeChatURLParams) {
    var str = [];
    for (const [key, value] of Object.entries(dict)) {
        if(typeof value !==  'undefined')  {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
    }
    return '?'+ str.join("&")
}