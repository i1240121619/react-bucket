let openHeadTimestamp = Date.parse(new Date())/1000;
//let channel=tool.urlData().channel;
let channel='XINGREN';
export default {
    openHead:{
        "X-YiFeng-Source":channel,
        "X-YiFeng-TS":openHeadTimestamp,
        "X-YiFeng-Sign":"ASDSDFSDFSDFSDSDF"
    }
}