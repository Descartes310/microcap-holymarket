/**
 * Helpers Functions
 */
import moment from 'moment';
import AppConfig from 'Constants/AppConfig';
import NavLinks from "Components/Sidebar/NavLinks";
import {NotificationManager} from 'react-notifications';

const TABLE_OF_256_HEXADECIMAL = (function () {
    const arr = [];
    for (let i = 0; i < 256; i++) { arr[i] = (i < 16 ? '0': '') + (i).toString(16); }
    return arr;
})();

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (!str) {
        return "";
    }
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000;
    let formatDate = format ? format : 'MM-DD-YYYY';
    return moment(time).format(formatDate);
}

/**
 * Convert Date To Timestamp
*/
export function convertDateToTimeStamp(date, format) {
    let formatDate = format ? format : 'YYYY-MM-DD';
    return moment(date, formatDate).unix();
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
    let location = url.pathname;
    let path = location.split('/');
    return path[1];
}

export const getLocaleFromBrowser = () => {
    const browserLanguage = window.navigator.userLanguage || window.navigator.language;
    return browserLanguage.split('-')[0];
};

export function getDefaultLanguage() {
    /*const browserLocale = getLocaleFromBrowser();
    let defaultLanguage = AppConfig.languages.find(l => l.locale === browserLocale);

    if (!defaultLanguage) {
        defaultLanguage = AppConfig.languages[0];
    }*/

    return AppConfig.locale;
}



/**
 * Deep mapping an object
 * @param obj
 * @param callback function to apply to the key
 */
export function deepMapObject(obj, callback) {
    let rtn = obj;
    if (typeof (obj) === 'object') {
        if (obj instanceof Array) {
            rtn = obj.map(item => deepMapObject(item, callback));
        } else {
            rtn = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // apply the change on the string
                    const newKey = callback(key);

                    // Falsy or primitive value
                    if (!obj[key] || typeof obj[key] !== 'object')
                        rtn[newKey] = obj[key];
                    // nested object
                    else rtn[newKey] = deepMapObject(obj[key], callback);
                }
            }
        }
    }
    return rtn;
}

/**
 * Convert an object to camelCase
 * @param obj
 */
export function toCamelCase(obj) {
    // function to execute on each key
    const callback = key => key.replace(/(_\w)/g, k => k[1].toUpperCase());

    // call a generic method
    return deepMapObject(obj, callback);
}

/**
 * Convert an object to snake case
 * @param obj
 */
export function toSnakeCase(obj) {
    // function to execute on each key
    const callback = key => key.replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');

    // call a generic method
    return deepMapObject(obj, callback);
}

export const objectToFormData = (obj) => {
    let formData = new FormData();
    if (obj instanceof FormData) {
        formData = obj;
    } else {
        Object.keys(obj).forEach(key => formData.append(key, obj[key]));
    }
    return formData;
};

/**
 * Check if the user's value into store is valid
 *
 * @param authUser
 * @param tokens
 */
export const isUserIntoStoreValid = (
    authUser,
    tokens,
) => {
    return ((authUser !== null &&
            authUser !== undefined)
        // ||
        // (tokens.token !== null &&
        //     tokens.token !== undefined)
    );
};

/**
 * Get query of url
 * @param useLocation
 * @returns {URLSearchParams}
 */
export const useQuery = (useLocation) => new URLSearchParams(useLocation().search);

export const getFullAuthorisationRequestConfig = () => {
    const headers = {
        'Content-type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa(AppConfig.oauth.clientId + ":" + AppConfig.oauth.clientSecret)
    };
    return { headers, shouldSkipToken: true, withCredentials: true };
};
/*"KEY_1": {
    "ERROR_1": ERROR_1_MESSAGE,
    "ERROR_2": ERROR_1_MESSAGE,
},
"KEY_2": {
    "ERROR_1": ERROR_1_MESSAGE
}*/
export const requestErrorProcessing = (data) => {
      /*const result = {};
      Object.entries(data.errors).map(error => {
          // error[0] = KEY_1
          result[error[0]] = typeof error[1] === 'object' ? Object.values(error[1]) : error[1];
      });*/
      const result = [];
      Object.entries(data.errors).map(error => {
          result.push(typeof error[1] === 'object' ? Object.values(error[1]) : error[1]);
      });
      return result;
};

export const globalSearch = (data, searched) => {
    if (!searched) {
        return data;
    }

    const _searched = typeof searched === 'string' ? searched.toLowerCase() : searched;
    return _.filter(data, o => {
        return Object.values(o)
            .filter(f => typeof f === 'string' || typeof f === 'number')
            .join(' ')
            .toLowerCase()
            .includes(_searched)
    });
};

/**
 * Return array of permissions of a path
 * @param path
 * @returns {Array}
 */
export const getPermissionOfPath = (path) => {
    const currentMenus = NavLinks.menus;

    let permissions = [];
    for (let item of currentMenus) {
        if (item.path === path) {
            permissions = p.permissions;
            break;
        } else if (item.child_routes) {
            for (let subItem of item.child_routes) {
                if (subItem.path === path) {
                    permissions = subItem.permissions;
                    break;
                }
            }
        }
    }

    return permissions;
};

export const getAvailableItems = (totalItems, occupiedItems) => {
    if (totalItems && occupiedItems) {
        const occupiedItemsId = occupiedItems.map(p => p.id);
        return totalItems.filter(p => !occupiedItemsId.includes(p.id));
    }
    else return [];
};

/**
 * Extension of can action to handle array
 * @param permissions {Array}
 * @param some {boolean}
 * @returns {boolean|*}
 */
export const canArray = (permissions, some = true) => {
    if (permissions && Array.isArray(permissions)) {
        // If the array is empty then the user have permissions since there is no restrictions to that
        if (permissions.length === 0) return true;

        return permissions.reduce((a,b) => some
            ? a || b
            : a && b
        );
    }

    return false;
};


/**
 * Generate an unique id
 *
 * From StackOverFlow https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 *
 * @returns {string}
 */
const getUniqueId = () => {
    const d0 = Math.random()*0xffffffff|0;
    const d1 = Math.random()*0xffffffff|0;
    const d2 = Math.random()*0xffffffff|0;
    const d3 = Math.random()*0xffffffff|0;
    return TABLE_OF_256_HEXADECIMAL[d0&0xff]+TABLE_OF_256_HEXADECIMAL[d0>>8&0xff]+TABLE_OF_256_HEXADECIMAL[d0>>16&0xff]+TABLE_OF_256_HEXADECIMAL[d0>>24&0xff]+'-'+
        TABLE_OF_256_HEXADECIMAL[d1&0xff]+TABLE_OF_256_HEXADECIMAL[d1>>8&0xff]+'-'+TABLE_OF_256_HEXADECIMAL[d1>>16&0x0f|0x40]+TABLE_OF_256_HEXADECIMAL[d1>>24&0xff]+'-'+
        TABLE_OF_256_HEXADECIMAL[d2&0x3f|0x80]+TABLE_OF_256_HEXADECIMAL[d2>>8&0xff]+'-'+TABLE_OF_256_HEXADECIMAL[d2>>16&0xff]+TABLE_OF_256_HEXADECIMAL[d2>>24&0xff]+
        TABLE_OF_256_HEXADECIMAL[d3&0xff]+TABLE_OF_256_HEXADECIMAL[d3>>8&0xff]+TABLE_OF_256_HEXADECIMAL[d3>>16&0xff]+TABLE_OF_256_HEXADECIMAL[d3>>24&0xff];
};

/**
 * Get or create session id
 * @returns {string}
 */
export const getSessonId = () => {
    const sessionId = localStorage.getItem('ssid');
    if (sessionId) {
        return sessionId;
    } else {
        const newSessionId = getUniqueId();
        localStorage.setItem('ssid', newSessionId);
        return newSessionId;
    }
};

export const copyToClipboard = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
            } else {
                const textField = document.createElement('textarea');
                textField.innerText = text;
                document.body.appendChild(textField);
                textField.select();
                document.execCommand('copy');
                textField.remove();
            }

            NotificationManager.success("Lien copié");
            resolve();
        } catch (e) {
            NotificationManager.error("Impossible de copier le lien");
            reject();
        }
    })
};
