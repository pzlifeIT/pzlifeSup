import { Loading, Message } from 'element-ui';
import router from '../../router/index.js'

let apiconfig = process.env.SUP_URL || SUP_URL

function Ajax(params = {}) {
    if (!apiconfig) throw new Error('config 未引入')
        // 创建ajax对象
    let xhr = new XMLHttpRequest();

    let url = apiconfig + params.url;

    let type = reType(params.type)

    let data = params.data || '';

    if (type == 'GET') {
        data = getVal(data)
        if (data) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url, true);
        }
        xhr.send();
    } else if (type == 'POST') {
        xhr.open('POST', url, true);
        if (!(data instanceof FormData)) {
            data = JSON.stringify(data);
            xhr.setRequestHeader("Content-type", "text/plain", "charset=utf-8");
        }
        xhr.send(data);
    }

    // 处理返回数据
    xhr.onreadystatechange = function() {
        // console.log(xhr)
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                params.success(JSON.parse(xhr.responseText));
            } else {
                typeof params.failed == 'function' ? params.failed(xhr.status) : '';
            }
        }
    }
}

function getVal(data = '') {
    if (data === '') return '';
    let str = '';
    for (let key in data) {
        str += key + '=' + data[key] + '&';
    }
    data = str.replace(/&$/, '');
    return data
}

function reType(type = 'post') {
    type = type.toUpperCase();
    return type
}

function network(code) {
    let text = ""
    switch (parseInt(code)) {
        case 201:
        case 202:
        case 203:
        case 204:
        case 205:
        case 206:
            text = "服务器无响应"
            break;
        case 400:
            text = "错误请求"
            break;
        case 401:
            text = "身份验证错误"
            break;
        case 403:
            text = "服务器拒绝请求"
            break;
        case 404:
        case 410:
            text = "404错误"
            break;
        case 405:
            text = "方法禁用"
            break;
        case 406:
            text = "不接受请求"
            break;
        case 407:
            text = "需要代理授权"
            break;
        case 408:
            text = "请求超时"
            break;
        case 409:
        case 411:
        case 412:
        case 415:
        case 416:
        case 417:
            text = "请求格式出错"
            break;
        case 413:
            text = "请求实体过大"
            break;
        case 414:
            text = "请求的URI过长"
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
            text = "服务器错误"
            break;
        default:
            text = "网络错误"
    }
    message(text)
}

function addConId(data = {}) {
    if (!(data instanceof FormData)) {
        data.sup_con_id = localStorage.getItem("sup_con_id") || "";
    } else {
        data.append("sup_con_id", localStorage.getItem("sup_con_id") || "");
    }
    return data
}

function message(msg = '', type = 'error') {
    Message({
        message: msg || '',
        type: type
    })
}

function login() {
    router.push({ path: 'login' })
}
let request = function(params = {}) {
    if (!params.url) throw new Error('url 未传值')

    if (!localStorage.getItem("sup_con_id") & !params.login) {
        login()
        return
    }

    let data = '';
    if (!params.login) {
        data = addConId(params.data)
    } else {
        data = params.data
    }

    let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });

    Ajax({
        data: data,
        url: params.url,
        type: params.type,
        success: function(res) {
            loadingInstance.close()
            if (!params.login & res.code == "5000") {
                login();
                return
            }
            
            if (res.code == "200") {
                typeof params.success == 'function' ? params.success(res) : '';
            } else if (res.code == "3100") {
                message('没有权限');
            } else {
                typeof params.error == 'function' ? params.error(res.code) : message(res.msg);
            }

            typeof params.complete == 'function' ? params.complete(res) : '';
        },
        failed: function(code) {
            loadingInstance.close()
            typeof params.failed == 'function' ? params.failed(res) : '';
            network(code);
        }
    })
}
export {
    request
}
