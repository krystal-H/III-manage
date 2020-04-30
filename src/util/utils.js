import CryptoJS from 'crypto-js';
import { isempty as _isEmpty, isplainobject as _isPlainObject } from 'lodash';
import moment from 'moment';
import {notification} from 'antd';

export const fileHost = (function () {
    const fileTourl = "/v4/web/tencentcloud/upload";
    let hostname = window.location.hostname;
    let upfiledomain = {
        "localhost": "https://dp.clife.net",//"http://localhost:8085",
        "200.200.200.50": "https://200.200.200.50",
        "dp.clife.net": "https://dp.clife.net",
        "pre.cms.clife.cn": "https://pre.cms.clife.cn",
        "open.clife.cn": "https://cms.clife.cn",
        "cms.clife.cn": "https://cms.clife.cn"
    }[hostname];
    let upfileurl = upfiledomain + fileTourl;
    return upfileurl;
})();



export const JSTool = {
    filterParam(obj) {  // 对对象直接量进行过滤（不含空值）
        var parameter = {};
        if (_isPlainObject(obj)) {
            for (let key in obj) {
                if (!this._isEmpty(obj[key]) && !this._isNaN(obj[key])) {
                    parameter[key] = obj[key];
                }
            }
        }
        return parameter;
    },
	getHrefParams(href) {  // 从页面search中获取传参
        let parameter = {}, lists = href.replace(/^\?/,"").split("&");
		if(lists.length===0 || lists[0] === "") return parameter;
        lists.forEach(d=>{
			let now = d.split("=");
			if(now.length > 1){
				parameter[now[0]] = decodeURI(now[1]);
			}
		})
        return parameter;
    },
    isObject(value) {  // 包含函数类型
        var type = typeof value;
        return !!value && (type === 'object' || type === 'function');
    },
    isObjectLike(value) {  // 不包含函数类型
        return !!value && typeof value === 'object';
    },
    isBoolean(value) {
        var boolTag = '[object Boolean]';
        var objectToString = Object.prototype.toString;
        return value === true || value === false ||
            (this.isObjectLike(value) && objectToString.call(value) === boolTag);
    },
    isString(value) {
        var stringTag = '[object String]';
        var objectToString = Object.prototype.toString;

        return typeof value === 'string' ||
            (!this.isArray(value) && this.isObjectLike(value) && objectToString.call(value) === stringTag);
    },
    isNumber(value) {
        var numberTag = '[object Number]';
        var objectToString = Object.prototype.toString;

        return typeof value === 'number' ||
            (this.isObjectLike(value) && objectToString.call(value) === numberTag);
    },
    isArray(value) {  // 判断一个对象是不是数组类型
        var arrTag = '[object Array]';
        var objectToString = Object.prototype.toString;
        return (Array.isArray && Array.isArray(value)) || (objectToString.call(value) === arrTag);
    },
    isFunction(value) {  // 判断一个对象是不是数组类型
        var objectToString = Object.prototype.toString;
        let funcTag = '[object Function]',
            genTag = '[object GeneratorFunction]';

        let tag = this.isObject(value) ? objectToString.call(value) : '';
        return tag === funcTag || tag === genTag;
    },
    isRegExp(value) {  // 判断一个对象是不是数组类型
        var objectToString = Object.prototype.toString;
        let regexpTag = '[object RegExp]';

        return this.isObject(value) && objectToString.call(value) === regexpTag;
    },
    isDate(value) {  // 判断一个对象是不是数组类型
        var dateTag = '[object Date]';
        var objectToString = Object.prototype.toString;
        return this.isObjectLike(value) && (objectToString.call(value) === dateTag);
    },
    isNull(value) {
        return value === null;
    },
    isUndefined(value) {
        return value === undefined;
    },
    _isNaN(value) {
        return this.isNumber(value) && value != +value;
    },
    _isEmpty(value) {  //判断值是否为空
        return (this.isString(value) && _isEmpty(value)) || this.isNull(value) || this.isUndefined(value);
    },
    /**
     * 将对象转换为Formdata
     * @param {object} obj 待转换对象
     */
    objToFormdata(obj = {}) {
        let keys = Object.keys(obj),
            temp = new FormData();

        keys.forEach(key => {
            temp.append(key, obj[key])
        })

        return temp;
    }
}

export const DateTool = {

    utc2beijing(utc_timestamp, fmt) {
        return this.formateDate(utc_timestamp, fmt, 8)
    },
    // utc时间串转本地时间串
    utcToDev(utcString) {
        let t = moment(utcString);
        t.add(t.utcOffset() / 60, 'h');
        return t.format('YYYY-MM-DD HH:mm:ss');
    },
    /**
     * time:        时间戳
     * fmt:         字符串时间格式
     * timezone:    默认时区为0时区
     */
    formateDate(time, fmt, timezone = 0) {
        if (!time) return '';
        let timestamp = parseInt(time) + timezone * 60 * 60 * 1000
        let date = new Date(timestamp);
        let o = {
            "M+": (date.getMonth() + 1),                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": (Math.floor((date.getMonth() + 3) / 3)), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
}

export const Pager = {
    pagination(pager, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: pager.pageIndex,
            pageSize: pager.pageRows,
            total: pager.totalRows,
            showTotal: () => {
                return `共${pager.totalRows}条`
            },
            showQuickJumper: true
        }
    },
}

export const CryptoTool = {
    encryption(val) {  // 加密(后台模式)
        var md5 = CryptoJS.MD5(val);
        var utf8 = CryptoJS.enc.Utf8.parse(md5);
        var base64 = CryptoJS.enc.Base64.stringify(utf8) || utf8.toString(CryptoJS.enc.Base64);
        return base64;
    },
    encryptionApp(val) {  // 加密(app模式)
        var md5 = CryptoJS.MD5(val);
        var base64 = CryptoJS.enc.Base64.stringify(md5) || md5.toString(CryptoJS.enc.Base64);
        return base64;
    },
    encryption_base64(val) {  // 加密（仅base64）
        var utf8 = CryptoJS.enc.Utf8.parse(val);
        var base64 = CryptoJS.enc.Base64.stringify(utf8) || utf8.toString(CryptoJS.enc.Base64);
        return base64;
    },
    decryption(val) {  // 解密（仅base64）
        var base64 = CryptoJS.enc.Base64.parse(val);
        var utf8 = CryptoJS.enc.Utf8.stringify(base64);
        return utf8;
    },
}

/***
 *
[
    {
        title:"a",
        key:"c-1",
        value:"c-1",
        children:[
            {
                title:"a",
                key:"sc-1",
                value:"sc-1",
                children:[
                    {
                        title:"a",
                        key:"1",
                        value:"1",
                        deviceSubTypeId:"1001"
                    }
                ]
            }
        ]
    }
]

deviceCategoryList
[
      {
        "categoryId":"1",
        "categoryName":"智慧生活",
        "subCategoryList":[
          {
            "subCategoryId":"1",
            "subCategoryName":"大家电",
            "deviceTypeList":[
              {
                "deviceTypeId":"1",
                "deviceTypeName":"冰箱",
                "defaultDeviceSubtype":{
                    "deviceSubTypeId":"1001"
                }
              },
            ]
        }]
    }]

 *
 */

export const DeviceCategoryUtils = {
    //通过TreeSelect type，然后选择设备大类
    getDeviceTypeFromSelectList(typeList, deviceCategoryList) {

        let deviceTypeList = []
        if (typeList instanceof Array) {
            typeList.map((item, index) => {
                item = item + ""
                if (item.startsWith('c-')) {
                    let list = this.mapDeviceTypeFromCategory(item, deviceCategoryList)
                    deviceTypeList = deviceTypeList.concat(list)
                } else if (item.startsWith('sc-')) {
                    let list = this.mapDeviceTypeFromSubCategory(item, deviceCategoryList)
                    deviceTypeList = deviceTypeList.concat(list)
                } else {
                    deviceTypeList.push(item)
                }
            })
        }

        return deviceTypeList
    },

    //通过一级分类Id，获取下面的全部设备大类
    mapDeviceTypeFromCategory(typeList, deviceCategoryList) {
        let deviceTypeList = []
        let deviceCategoryId = typeList.split('-')[1]
        if (deviceCategoryId) {
            // 遍历category
            deviceCategoryList.map((item, index) => {
                if (item.categoryId == deviceCategoryId) {
                    let deviceSubCategoryList = item.subCategoryList
                    //遍历subCategory
                    deviceSubCategoryList.map((item, index) => {

                        //遍历设备大类
                        let deviceTypeListArray = item.deviceTypeList
                        deviceTypeListArray.map((item, index) => {

                            let deviceTypeId = item.deviceTypeId
                            deviceTypeList.push(deviceTypeId)
                        })
                    })
                    //遍历数据完成后，返回list
                    return deviceTypeList
                }
            })
            return deviceTypeList
        }
        return deviceTypeList
    },

    //通过二级分类Id，获取下面的全部设备大类
    mapDeviceTypeFromSubCategory(typeList, deviceCategoryList) {
        let deviceTypeList = []
        let deviceSubCategoryId = typeList.split('-')[1]
        if (deviceSubCategoryId) {
            // 遍历category
            deviceCategoryList.map((item, index) => {

                let deviceSubCategoryList = item.subCategoryList
                //遍历subCategory
                deviceSubCategoryList.map((item, index) => {

                    //找到了对应的设备subCategoryId
                    if (item.subCategoryId == deviceSubCategoryId) {

                        //遍历设备大类
                        let deviceTypeListArray = item.deviceTypeList
                        deviceTypeListArray.map((item, index) => {

                            let deviceTypeId = item.deviceTypeId
                            deviceTypeList.push(deviceTypeId)
                        })
                        return deviceTypeList
                    }

                })
                //没有找到了对应的设备subCategoryId,就在这里返回了
                return deviceTypeList
            })
        }
        //没有找到了deviceSubCategoryId 直接返回
        return deviceTypeList
    },



    // category treeselect 必须所有的key都不一样，而categoryid和subcategoryId deviceTypeId 会重合，所以转一下，搞得麻烦了
    transformDataToTreeSelectData(data) {
        let treeSelectDataList = []
        data.map((item, index) => {
            let treeSelectCategoryData = {}
            treeSelectCategoryData["title"] = item.categoryName
            treeSelectCategoryData["key"] = "c-" + item.categoryId
            treeSelectCategoryData["value"] = "c-" + item.categoryId
            if (item.subCategoryList) {
                treeSelectCategoryData["children"] = this.transformDataToSubCategoryData(item.subCategoryList)
            }
            treeSelectDataList.push(treeSelectCategoryData)
        })
        return treeSelectDataList
    },

    // subcategory
    transformDataToSubCategoryData(data) {
        let treeSelectDataList = []
        data.map((item, index) => {
            let treeSelectSubCategoryData = {}
            treeSelectSubCategoryData["title"] = item.subCategoryName
            treeSelectSubCategoryData["key"] = "sc-" + item.subCategoryId
            treeSelectSubCategoryData["value"] = "sc-" + item.subCategoryId
            if (item.deviceTypeList) {
                treeSelectSubCategoryData["children"] = this.transformDataToDeviceList(item.deviceTypeList)
            }
            treeSelectDataList.push(treeSelectSubCategoryData)
        })
        return treeSelectDataList
    },

    // device List
    transformDataToDeviceList(data) {
        let deviceTypeList = []
        data.map((item, index) => {
            let deviceTypeData = {}
            deviceTypeData["title"] = item.deviceTypeName
            deviceTypeData["key"] = item.deviceTypeId
            deviceTypeData["value"] = item.deviceTypeId  // 大类
            if (item.defaultDeviceSubtype && item.defaultDeviceSubtype.deviceSubtypeId) {
                deviceTypeData["deviceSubTypeId"] = item.defaultDeviceSubtype.deviceSubtypeId   // 小类
            }

            deviceTypeList.push(deviceTypeData)
        })
        return deviceTypeList
    },

    transformDataToCascaderData(data) {
        let CascaderData = []
        if (data instanceof Array) {
            data.map((item) => {
                // 一级分类
                let categoryData = {}

                categoryData.value = item.categoryId
                categoryData.label = item.categoryName

                //遍历设备二级分类
                let subCategoryList = item.subCategoryList
                let subCategoryChildren = []
                subCategoryList.map(item => {
                    let subCategoryData = {}

                    subCategoryData.value = item.subCategoryId
                    subCategoryData.label = item.subCategoryName

                    //遍历设备大类
                    let deviceTypeList = item.deviceTypeList
                    let deviceTypeChildren = []
                    deviceTypeList.map(item => {
                        let deviceTypeData = {}
                        deviceTypeData.value = item.deviceTypeId
                        deviceTypeData.label = item.deviceTypeName
                        deviceTypeChildren.push(deviceTypeData)
                    })
                    subCategoryData.children = deviceTypeChildren

                    subCategoryChildren.push(subCategoryData)
                })
                categoryData.children = subCategoryChildren

                CascaderData.push(categoryData)
            })
        }
        return CascaderData
    },

}

export const deepCopy = (obj) => {
    var result = Array.isArray(obj) ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key]!==null) {
            result[key] = deepCopy(obj[key]);   //递归复制
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
};


/**
 * 粘贴内容到粘贴板
 * @param {string} str 内容
 */
export function copyTextToClipBoard (str = '') {

    if (document.execCommand) {

        let tempInput = document.createElement('input');

        tempInput.setAttribute('style','height:0,width:0,visibility: hidden;');
        tempInput.setAttribute('value', str);

        document.body.appendChild(tempInput);

        tempInput.select();

        // 复制
        document.execCommand('copy');

        notification.success({
            description:'复制成功'
        })

        // 销毁无用元素
        document.body.removeChild(tempInput);
    } else {
        notification.warn({
            description:'该浏览器不支持复制'
        })
    }
}

/**
 * 获取url问号之后的param参数的value
 * @param {string} paramName 参数名称
 */
export function getUrlParam (paramName){
    if (paramName && typeof paramName == 'string') {
        var sValue = '';
        var re = new RegExp(paramName + '=([^&=]+)');
        var st = null;
        st = window.location.search.match(re) || window.location.hash.match(re);
        if (st && st.length == 2) {
            st[1] = st[1].replace(/^\s*|\s*$/g, '');
            sValue = st[1];
            if (sValue == '') {
                return null;
            } else {
                return sValue;
            }
        } else {
            return st;
        }
    }
}

/**
 * 为table控件的数据源加上key字段
 * @param {array} arr 待处理的数据数组
 */
export function addKeyToTableData(arr = []) {
  return arr.map((item,index) => {
    if (item.key === undefined) {
      item.key = index;
    }
    return item
  })
}

/**
 *  防抖
 */
export function debounce (fn, delay) {
    let timer = null;
    return function(){
        let context = this;
        let args = arguments;
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay)
    }
}
