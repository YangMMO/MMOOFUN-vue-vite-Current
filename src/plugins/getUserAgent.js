export default () => {
    let userAgentStr = navigator.userAgent
    // const userAgentObj = {
    //     browserName: '',    // 浏览器名称
    //     browserVersion: '', // 浏览器版本
    //     osName: '',         // 操作系统名称
    //     osVersion: '',      // 操作系统版本
    //     deviceName: '',     // 设备名称
    // }

    // for (let key in userAgentStr.browserReg) {
    //     if (userAgentStr.browserReg[key].test(userAgentStr)) {
    //         userAgentObj.browserName = key
    //         if (key === 'Chrome') {
    //             userAgentObj.browserVersion = userAgentStr.split('Chrome/')[1].split(' ')[0]
    //         } else if (key === 'IE') {
    //             userAgentObj.browserVersion = userAgentStr.split('MSIE ')[1].split(' ')[1]
    //         } else if (key === 'Firefox') {
    //             userAgentObj.browserVersion = userAgentStr.split('Firefox/')[1]
    //         } else if (key === 'Opera') {
    //             userAgentObj.browserVersion = userAgentStr.split('Version/')[1]
    //         } else if (key === 'Safari') {
    //             userAgentObj.browserVersion = userAgentStr.split('Version/')[1].split(' ')[0]
    //         } else if (key === '360') {
    //             userAgentObj.browserVersion = ''
    //         } else if (key === 'QQBrowswe') {
    //             userAgentObj.browserVersion = userAgentStr.split('Version/')[1].split(' ')[0]
    //         }
    //     }
    // }

    // for (let key in deviceReg) {
    //     if (deviceReg[key].test(userAgentStr)) {
    //         userAgentObj.osName = key
    //         if (key === 'Windows') {
    //             userAgentObj.osVersion = userAgentStr.split('Windows NT ')[1].split(';')[0]
    //         } else if (key === 'Mac') {
    //             userAgentObj.osVersion = userAgentStr.split('Mac OS X ')[1].split(')')[0]
    //         } else if (key === 'iPhone') {
    //             userAgentObj.osVersion = userAgentStr.split('iPhone OS ')[1].split(' ')[0]
    //         } else if (key === 'iPad') {
    //             userAgentObj.osVersion = userAgentStr.split('iPad; CPU OS ')[1].split(' ')[0]
    //         } else if (key === 'Android') {
    //             userAgentObj.osVersion = userAgentStr.split('Android ')[1].split(';')[0]
    //             userAgentObj.deviceName = userAgentStr.split('(Linux; Android ')[1].split('; ')[1].split(' Build')[0]
    //         }
    //     }
    // }

    // return userAgentObj
    return userAgentStr
}