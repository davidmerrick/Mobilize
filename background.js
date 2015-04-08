var requestFilter = {
    urls: ["<all_urls>"]
},

extraInfoSpec = ['requestHeaders', 'blocking'],
handler = function(details) {

var USER_AGENT_HEADER = 'User-Agent';
var IOS_USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25";


var headers = details.requestHeaders,
    blockingResponse = {};

function isHeaderSet(headerName){
    for (var i = 0, l = headers.length; i < l; ++i) {
        if (headers[i].name == headerName) {
            return true;
        }
    }
    return false;
}
    
function setHeader(headerName, value){
    for (var i = 0, l = headers.length; i < l; ++i) {
        if (headers[i].name == headerName) {
            headers[i].value = value;
            return;
        }
    }   
}
    
if (!isHeaderSet(USER_AGENT_HEADER)) {
    headers.push({
        name: USER_AGENT_HEADER,
        value: IOS_USER_AGENT
    });
} else {
    setHeader(USER_AGENT_HEADER, IOS_USER_AGENT);
}

blockingResponse.requestHeaders = headers;
return blockingResponse;
};

chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);
