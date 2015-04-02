var requestFilter = {
    urls: ["<all_urls>"]
},

extraInfoSpec = ['requestHeaders', 'blocking'],
handler = function(details) {

var isUserAgentSet = false;
var IOS_USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25";

var headers = details.requestHeaders,
    blockingResponse = {};

for (var i = 0, l = headers.length; i < l; ++i) {
    if (headers[i].name == 'User-Agent') {
        headers[i].value = IOS_USER_AGENT;
        isUserAgentSet = true;
	break;
    }
}

if (!isUserAgentSet) {
    headers.push({
        name: "User-Agent",
        value: IOS_USER_AGENT
    });
}

blockingResponse.requestHeaders = headers;
return blockingResponse;
};

chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);
