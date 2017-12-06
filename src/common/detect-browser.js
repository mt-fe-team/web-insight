var ua = win.navigator.userAgent;
var os,
  osVersion;
var browser,
  browserVersion,
  matched;

// OS - detect
var ipod = ua.match(/(ipod).*\s([\d_]+)/i),
  ipad = ua.match(/(ipad).*\s([\d_]+)/i),
  iphone = ua.match(/(iphone)\sos\s([\d_]+)/i),
  android = ua.match(/(android)\s([\d\.]+)/i);

if (android) {
  os = 'Android ';
  osVersion = android[2];
} else if (iphone) {
  os = 'iPhone';
  osVersion = iphone[2].replace(/_/g, '.');
} else if (ipad) {
  os = 'iPad';
  osVersion = ipad[2].replace(/_/g, '.');
} else if (ipod) {
  os = 'iPod';
  osVersion = ipod[2].replace(/_/g, '.');
}

// Browser - detect
if ((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
  browser = 'UC';
  browserVersion = matched[1];
} else if ((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
  browser = 'QQ';
  browserVersion = matched[1];
} else if ((matched = ua.match(/(?:Firefox|FxiOS)\/([\d\.]+)/))) {
  browser = 'Firefox';
  browserVersion = matched[1];
} else if ((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
  browser = 'Chrome';
  browserVersion = matched[1];
  if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
    browser = 'Chrome Webview';
  }
} else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
  browser = 'Android';
  browserVersion = matched[1];
} else if (ua.match(/iPhone|iPad|iPod/)) {
  if (ua.match(/Safari/) && (matched = ua.match(/Version\/([\d\.]+)/))) {
    browser = 'Safari';
    browserVersion = matched[1];
  } else if ((matched = ua.match(/OS ([\d_\.]+) like Mac OS X/))) {
    browser = 'iOS Webview';
    browserVersion = matched[1].replace(/\_/g, '.');
  }
} else if ((matched = ua.match(/MicroMessenger\/([\d\.]+)/i))) {
  browser = 'WeChat';
  browserVersion = matched[1];
} else if ((matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i))) {
  browser = 'AliApp';
  browserVersion = matched[2];
}

var browserDetect = {
  os: {
    name: os || '',
    version: osVersion || ''
  },
  browser: {
    name: browser || '',
    version: browserVersion || ''
  }
}
