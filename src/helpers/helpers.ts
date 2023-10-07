/**
 * Helpers Functions
 */
import _ from 'lodash';
import moment from 'moment';
import api from "Api/index";
import store from '../store';
import AppConfig from 'Constants/AppConfig';
import { NotificationManager } from 'react-notifications';
import NavLinks, { MenuItem } from "Components/Sidebar/NavLinks";

export const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB7L1NxyNX_Q6qbVd2JAEx3k_CXQ1R-9VAJyVYlEJ6&s';

const TABLE_OF_256_HEXADECIMAL = (function () {
    const arr = [];
    for (let i = 0; i < 256; i++) { arr[i] = (i < 16 ? '0' : '') + (i).toString(16); }
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
export function textTruncate(str, length, ending = null) {
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

function getAmount(currencies, amount, from, to = null, currency = null) {
    if (from)
        if (to) {
            let from_currency = currencies.filter(c => c.code == from)[0];
            if (!from_currency)
                from_currency = { code: 'EUR', value: 1 };
            let to_currency = currencies.filter(c => c.code == to)[0];
            let main_amount = amount * from_currency.value;
            return main_amount / to_currency.value;
        } else {
            let from_currency = currencies.filter(c => c.code == from)[0];
            if (!from_currency)
                from_currency = { code: 'EUR', value: 1 };
            let to_currency = null;
            if (currency)
                to_currency = currency;
            else
                to_currency = currencies.filter(c => c.main == true)[0];
            let main_amount = amount * from_currency.value;
            return main_amount / to_currency.value;
        }
    else {
        let from_currency = currencies.filter(c => c.main == true)[0];
        if (!from_currency)
            from_currency = { code: 'EUR', value: 1 };
        let to_currency = null;
        if (currency)
            to_currency = currency;
        else
            to_currency = currencies.filter(c => c.main == true)[0];
        let main_amount = amount * from_currency.value;
        return main_amount / to_currency.value;
    }
}

function getAmounts(currencies, amounts, to = null, currency = null) {
    if (to) {
        let amount = 0;
        let from_currency = null;
        let to_currency = currencies.filter(c => c.code == to)[0];
        amounts.forEach(a => {
            from_currency = currencies.filter(c => c.code == a.currency)[0];
            let main_amount = 0;
            if (!from_currency)
                from_currency = { code: 'EUR', value: 1 };
            if (a.quantity)
                main_amount = (a.amount * a.quantity) * from_currency.value;
            else
                main_amount = a.amount * from_currency.value;

            amount = amount + (main_amount / to_currency.value);
        });
        return amount;
    } else {
        let amount = 0;
        let from_currency = null;
        let to_currency = null;

        if (currency)
            to_currency = currency;
        else
            to_currency = currencies.filter(c => c.main == true)[0];

        amounts.forEach(a => {
            from_currency = currencies.filter(c => c.code == a.currency)[0];
            let main_amount = 0;
            if (!from_currency)
                from_currency = { code: 'EUR', value: 1 };
            if (a.quantity != null)
                main_amount = (a.amount * a.quantity) * from_currency.value;
            else
                main_amount = a.amount * from_currency.value;

            amount = amount + (main_amount / to_currency.value);
        });
        return amount;
    }
}

export function computeAmountFromCurrency(currencies, amount = null, amounts = null, currency = null, from = null, to = null) {
    if (amount != null) {
        return getAmount(currencies, amount, from, to, currency);
    } else {
        return getAmounts(currencies, amounts, to, currency);
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

export function convertDate(date, format) {
    let formatDate = format ? format : 'MM-DD-YYYY';
    return moment(date).format(formatDate);
}

/**
 * Convert Date To Timestamp
*/
export function convertDateToTimeStamp(date, format = 'YYYY-MM-DD') {
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
    const browserLanguage = (window.navigator as any).userLanguage || window.navigator.language;
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
                if (obj?.hasOwnProperty(key)) {
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
    return { headers, shouldSkipToken: true, withCredentials: true, skipError: true };
};

export const requestErrorProcessing = (data) => {
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

    const currentMenus = NavLinks;


    let permissions = [];
    for (let item of currentMenus) {
        if (item.path === path) {
            permissions = item.permissions;
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

        return permissions.reduce((a, b) => some
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
    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    return TABLE_OF_256_HEXADECIMAL[d0 & 0xff] + TABLE_OF_256_HEXADECIMAL[d0 >> 8 & 0xff] + TABLE_OF_256_HEXADECIMAL[d0 >> 16 & 0xff] + TABLE_OF_256_HEXADECIMAL[d0 >> 24 & 0xff] + '-' +
        TABLE_OF_256_HEXADECIMAL[d1 & 0xff] + TABLE_OF_256_HEXADECIMAL[d1 >> 8 & 0xff] + '-' + TABLE_OF_256_HEXADECIMAL[d1 >> 16 & 0x0f | 0x40] + TABLE_OF_256_HEXADECIMAL[d1 >> 24 & 0xff] + '-' +
        TABLE_OF_256_HEXADECIMAL[d2 & 0x3f | 0x80] + TABLE_OF_256_HEXADECIMAL[d2 >> 8 & 0xff] + '-' + TABLE_OF_256_HEXADECIMAL[d2 >> 16 & 0xff] + TABLE_OF_256_HEXADECIMAL[d2 >> 24 & 0xff] +
        TABLE_OF_256_HEXADECIMAL[d3 & 0xff] + TABLE_OF_256_HEXADECIMAL[d3 >> 8 & 0xff] + TABLE_OF_256_HEXADECIMAL[d3 >> 16 & 0xff] + TABLE_OF_256_HEXADECIMAL[d3 >> 24 & 0xff];
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

export const getPriceWithCurrency = (price = 0, currencyCode = null) => {

    currencyCode = currencyCode ? currencyCode : getDefaultCurrency();
    let storeCurrency = store.getState().settings.currency;
    let storeCurrencies = store.getState().settings.currencies;
    let currency = storeCurrencies.find(c => c.code === currencyCode);
    currency = currency ? currency : AppConfig.currency;

    price = (price*currency.rate) / storeCurrency.rate
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: storeCurrency.code
    });

    return `${formatter.format(price)}`;
};

export const getPrice = (price = 0, currencyCode = null) => {

    currencyCode = currencyCode ? currencyCode : getDefaultCurrency();
    let storeCurrency = store.getState().settings.currency;
    let storeCurrencies = store.getState().settings.currencies;
    let currency = storeCurrencies.find(c => c.code === currencyCode);
    currency = currency ? currency : AppConfig.currency;

    price = (price*currency.rate) / storeCurrency.rate

    return price;
};

export const addCurrency = (price: any = 0) => {
    let storeCurrency = store.getState().settings.currency;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: storeCurrency.code
    });

    return `${formatter.format(price)}`;
};

export const getDefaultCurrency = () => {
    const currency = localStorage.getItem('currency');
    if (currency) {
        return currency;
    } else {
        return `EUR`;
    }
};

export function getFilePath(file) {
    if (file)
        if (file.startsWith('http') && file.includes(':')) {
            return file;
        } else {
            return `${AppConfig.api.baseUrl}${file}`
        }
}

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
            resolve(text);
        } catch (e) {
            NotificationManager.error("Impossible de copier le lien");
            reject();
        }
    })
};

export const downloadContent = (url) => {
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    a.href = url;

    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);

};

/**
 * Convert a string to snake case
 * @param str
 * @returns {*}
 */
export function toStringSnakeCase(str) {
    // call a generic method
    return str.replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');
}

/**
 *
 * @param verb
 * @param url
 * @param data
 * @param config
 * @returns {Promise<any>}
 */
export const makeRequest = (verb, url, data = null, config = {}) => {
    return new Promise((resolve, reject) => {
        let _url = url;
        if ((verb === 'get' || verb === 'delete') && data) {
            Object.entries(data).map((item: any) => {
                const encoded = encodeURIComponent(item[1]);
                const character = _url.includes('?') ? '&' : '?';
                _url = `${_url}${character}${toStringSnakeCase(item[0])}=${encoded}`;
            });
        }
        const params = (verb === 'get' || verb === 'delete') ? [_url, config] : [_url, data, config];
        api[verb](...params)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

/**
 *
 * @param verb
 * @param url
 * @param typeBase
 * @param dispatch
 * @param data
 * @param config
 * @returns {Promise<any | never>}
 */
export const makeActionRequest = (verb, url, typeBase, dispatch, data = null, config = {}) => {
    dispatch({ type: typeBase });
    return makeRequest(verb, url, data, config)
        .then((response) => {
            dispatch({ type: `${typeBase}_SUCCESS`, payload: response });
            return Promise.resolve(response);
        })
        .catch((error) => {
            dispatch({ type: `${typeBase}_FAILURE` });
            return Promise.reject(error);
        });
};

export const oldCartItemChecked = (oldItems) => {
    return oldItems
        && typeof oldItems === "object"
        && !Array.isArray(oldItems)
}

export const normalizeCartItems = (data, authId, shouldSkipSaving = false) => {
    const obj = {
        data: {},
        authId,
        shouldSkipSaving
    };
    const oldItems = JSON.parse(localStorage.getItem('cartItems'));

    if (data) {
        obj.data = data
    } else {
        if (oldCartItemChecked(oldItems)) {
            obj.data = oldItems;
        }
    }

    obj.data[authId] = data;
    return obj;
};

export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const computeValueFromPercent = (value, amount) => {
    return (value * amount) / 100;
}

export const computePercentFromValue = (value, amount) => {
    return (value / amount) * 100;
}

export const parseDate = (str) => {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

export const datediff = (first, second, time = 1) => {
    let start = parseDate(first);
    let end = parseDate(second);
    let result = 0;
    switch (time) {
        case 7:
            end.setDate(end.getDate() - 1);
            break;
        case 30:
            end.setDate(end.getDate() - 1);
            break;
        default:
            break;
    }

    do {
        switch (time) {
            case 1:
                start.setDate(start.getDate() + 1);
                break;
            case 7:
                start.setDate(start.getDate() + 7);
                break;
            case 30:
                start.setMonth(start.getMonth() + 1);
                break;
            case 90:
                start.setMonth(start.getMonth() + 3);
                break;
            case 180:
                start.setMonth(start.getMonth() + 6);
                break;
            default:
                start.setDate(start.getDate() + 1);
                break;
        }
        result++;
    } while (end >= start);
    return result;
}


export const isMenuAllowed = (authUser: any, menu: MenuItem): boolean => {
    const profile = authUser?.userAccount;
    
    if(!authUser.active)
        return false;

    if (profile) {
        /**
         * permissions are ok if either menu item's permissions is null 
         * or all permissions in menu item are also in profile permissions
         */

        if (!menu.permissions && !menu.profiles)
            return true;

        if (menu.permissions) {
            const matched = menu.permissions.filter(mpName =>
                profile.permissions.findIndex(pp => mpName === pp.name) >= 0
            ).length;

            let can = menu.permissions_and
                ? matched === menu.permissions.length
                : matched > 0;

            return can && (!menu.profiles || (menu.profiles && (menu.profiles.filter(mpName => authUser.referralTypes.includes(mpName)).length > 0)));
        }

        return menu.profiles.filter(mpName => authUser.referralTypes.includes(mpName)).length > 0;
    } else {
        return !menu.profiles && !menu.permissions;
    }
}

export const filterCountryNameAndFlag = (candidate, input) => {
    if (input) {
        return candidate.data.label.toLowerCase().includes(input.toLowerCase());
    }
    return true;
};

export const referraTypes = () => {
    return [
        {
            label: 'Personne physique',
            value: 'PERSON'
        },
        {
            label: 'Personne morale',
            value: 'GROUP'
        },
        {
            label: 'Tous les utilisateurs',
            value: 'USER'
        }
    ]
}

export const groupTypes = () => {
    return [
        {
            label: 'Organisation',
            value: 'ORGANISATION'
        },
        {
            label: 'Communauté conventionnée',
            value: 'CONVENTIONATED_COMMUNITY'
        },
        {
            label: 'Communauté non conventionnée',
            value: 'UNCONVENTIONATED_COMMUNITY'
        }
    ]
}

export const getReferralTypeLabel = (value: any) => {
    let referralType = referraTypes().find(rt => rt.value === value);
    if (referralType)
        return referralType.label;
    else
        return value;
}

export const getGroupTypeLabel = (value: any) => {
    let groupType = groupTypes().find(rt => rt.value === value);
    if (groupType)
        return groupType.label;
    else
        return value;
}

export const getNodeFromPermissions = (permissions: any) => {
    if (permissions) {
        let result = [];
        let level = { result };
        permissions.forEach(permission => {
            permission.folders.split('/').reduce((r, name, i, a) => {
                if (!r[name]) {
                    r[name] = { result: [] };
                    r.result.push({ value: permission.id + '' + name, children: r[name].result, label: translatePermissionFolder(name) })
                }
                if (i === (a.length - 1))
                    r[name].result.push({ value: permission.id, label: permission.label });
                return r[name];
            }, level);
        })
        return result;
    }
    return [];
}

export const translatePermissionFolder = (path) => {
    switch (path) {
        case 'USER_ACCOUNT':
            return 'Comptes utilisateurs'
        case 'USERS':
            return 'Gestion des utilisateurs'
        case 'CATEGORY':
            return 'Catégories';
        case 'TYPE':
            return "Types"
        case 'ACCOUNT':
            return 'Comptes';
        case 'ROLE':
            return 'Rôles';
        case 'GROUPS':
            return 'Gestion des groupes';
        case 'ADMIN':
            return 'Administration';
        case 'MEMBER':
            return 'Membres';
        case 'MANAGEMENT':
            return 'Configuration';
        case 'DETAILS':
            return 'Détails';
        case 'MARKETPLACES':
            return 'MicroCap Store';
        case 'SETTINGS':
            return 'Paramètrage';
        case 'STORE':
            return 'Ma boutique';
        case 'ACCESS':
            return 'Accès';
        case 'PROJECTS':
            return 'Projet';
        case 'COVERAGE':
            return 'Couverture';
        case 'TERRITORY':
            return 'Térritoire';
        case 'CONTRACT':
            return 'Contrat';
        case 'PARTNER':
            return 'Partenaire';
        case 'FUNDING':
            return 'Financement';
        case 'BROKER':
            return 'Broker';
        case 'BANK_SERVICE':
            return 'Service bancaire';
        case 'CASHMANAGEMENT':
            return 'Cash management';
        case 'AGENT':
            return 'Agent';
        case 'INTERMEDIARY':
            return 'Intermédiaire bancaire';
        case 'BANK':
            return 'Banque';
        case 'COUNTER':
            return 'Guichet';
        case 'BOURSE':
            return 'Bourse de financement';
        case 'MARKETS':
            return 'Marchés';
        case 'NETWORKS':
            return 'Gestion du réseaux';
        case 'MICROCAP360':
            return 'MicroCap 360';
        case 'BROKERS':
            return 'Brokers';
        case 'PSGAV':
            return 'PSGAV';
        case 'COMMUNITY':
            return 'Gestion des communautés';
        case 'ASSETS':
            return 'Gestion des actifs';
        case 'SUPERVISION':
            return 'Supervision';
        case 'PROJECT':
            return 'Projets';
        default:
            return path;
    }
}

export const getTerritoryTypes = () => {
    return [
        {
            label: 'Continent',
            value: 'MAINLAND'
        },
        {
            label: 'Région de continent',
            value: 'MAINLAND_REGION'
        },
        {
            label: 'Pays',
            value: 'COUNTRY'
        },
        {
            label: 'Région',
            value: 'COUNTRY_REGION'
        },
        {
            label: 'Ville',
            value: 'CITY'
        },
        {
            label: 'Rue',
            value: 'STREET'
        }
    ];
}

export const getTerritoryChildrenValue = (value) => {
    let index = getTerritoryTypes().findIndex(t => t.value === value);
    if (value === 'STREET')
        return 'STREET';
    else
        return getTerritoryTypes()[index+1].value;
}

export const translateTerritoryType = (value) => {
    let type = getTerritoryTypes().find(rt => rt.value === value);
    if (type)
        return type;
    else
        return null;
}

export const getProductNatures = () => {
    return [
        {
            label: 'Produit physique',
            value: 'PHYSICAL'
        },
        {
            label: 'Service',
            value: 'SERVICE'
        }
    ]
}

export const getProductNatureLabel = (value) => {
    let nature = getProductNatures().find(rt => rt.value === value);
    if (nature)
        return nature.label;
    else
        return "";
}

export const getProductRanges = () => {
    return [
        {
            label: 'Réseau',
            value: 'NETWORK'
        },
        {
            label: 'Opérateur',
            value: 'OPERATOR'
        },
        {
            label: 'Pays',
            value: 'COUNTRY'
        },
        {
            label: 'Communauté',
            value: 'COMMUNITY'
        }
    ]
}

export const getSellWay = () => {
    return [
        {
            label: 'Vente classique',
            value: 'CLASSIC'
        },
        {
            label: 'Vente privée',
            value: 'PRIVATE'
        },
        {
            label: 'Distribution bancaire',
            value: 'FINANCIAL'
        }
    ]
}

export const getProductRangeLabel = (value) => {
    let range = getProductRanges().find(rt => rt.value === value);
    if (range)
        return range.label;
    else
        return "";
}

export const getCodevCodes = () => {
    return ["CODEV", "CODEV_DEAL_PLAN"];
}

export const getOrderStatus = () => {
    return [
        {
            color: '#eaa658',
            label: 'En attente',
            value: 'PENDING'
        },
        {
            color: '#59eb76',
            label: 'Confirmée',
            value: 'CONFIRMED'
        },
        {
            color: '#59c6eb',
            label: 'Payement...',
            value: 'PAYING'
        },
        {
            color: '#6671d4',
            label: 'Payée',
            value: 'PAID'
        },
        {
            color: '#cc66d4',
            label: 'Livrée',
            value: 'DELIVERED'
        },
        {
            color: '#FF6464',
            label: 'Rejetée',
            value: 'REJECTED'
        }
    ]
};

export const getOrderStatusItem = (value) => {
    let status = getOrderStatus().find(rt => rt.value === value);
    if (status)
        return status;
    else
        return null;
}

export const getInputTypes = () => {
    return [
        {
            label: 'Texte simple',
            value: 'TEXT'
        }, {
            label: 'Texte formaté',
            value: 'TEXTAREA'
        }, {
            label: 'Date',
            value: 'DATE'
        }, {
            label: 'Nombre',
            value: 'NUMBER'
        }, {
            label: 'Adresse email',
            value: 'EMAIL'
        }, {
            label: 'Numéro de téléphone',
            value: 'TEL'
        }
        // , {
        //     label: 'Fichier',
        //     value: 'File'
        // }
    ]
}

export const getInputTypeLabel = (value) => {
    let type = getInputTypes().find(rt => rt.value === value);
    if (type)
        return type.label;
    else
        return "";
}

export const getInitializationTypes = () => {
    return [
        {
            label: 'ideas',
            value: 'IDEA',
            text: 'Idée'
        }, {
            label: 'calls',
            value: 'PROJECT_CALL',
            text: 'Appel à projet'
        }, {
            label: 'programs',
            value: 'PROGRAM',
            text: 'Progamme'
        }
    ]
}

export const getInitializationTypeLabel = (label) => {
    let type = getInitializationTypes().find(rt => rt.label === label);
    if (type)
        return type.value;
    else
        return "";
}

export const getInitializationType = (value) => {
    let type = getInitializationTypes().find(rt => rt.value === value);
    if (type)
        return type;
    else
        return "";
}

export const getActivitypes = () => {
    return [
        {
            label: 'Argument',
            value: 'ARGUMENT',
        }, {
            label: 'Objection',
            value: 'OBJECTION',
        }, {
            label: 'Illustration',
            value: 'ILLUSTRATION',
        }
    ]
}

export const assetSeriesTypes = () => {
    return [
        {
            label: 'Bon de garantie',
            value: 'BG'
        },
        {
            label: 'Actif primaire',
            value: 'PRIMARY'
        },
        {
            label: 'Actif composé',
            value: 'COMPOSITION'
        }
    ]
}

export const getAssetSeriesTypeLabel = (value: any) => {
    let assetSeriesType = assetSeriesTypes().find(rt => rt.value === value);
    if (assetSeriesType)
        return assetSeriesType.label;
    else
        return value;
}

export const assetActionTypes = () => {
    return [
        {
            label: "Ventre",
            value: 'SELL'
        },
        {
            label: 'Louer',
            value: 'LEASE'
        },
        {
            label: 'Nantir',
            value: 'PLEDGE'
        },
        {
            label: 'Hypothéquer',
            value: 'MORTGAGE'
        }
    ]
}

export const getAssetActionTypeLabel = (value: any) => {
    let assetActionType = assetActionTypes().find(rt => rt.value === value);
    if (assetActionType)
        return assetActionType.label;
    else
        return value;
}

export const userActionTypes = () => {
    return [
        {
            label: "Contacter",
            value: 'CONTACT'
        },
        {
            label: 'Authentifier',
            value: 'AUTHENTICATE'
        }
    ]
}

export const getUserActionTypeLabel = (value: any) => {
    let userActionType = userActionTypes().find(rt => rt.value === value);
    if (userActionType)
        return userActionType.label;
    else
        return value;
}

export const contractTypes = () => {
    return [
        {
            label: "Partenaire",
            value: 'PARTNER'
        },
        {
            label: 'Actif',
            value: 'ASSET'
        }
    ]
}

export const getContractTypeLabel = (value: any) => {
    let contractType = contractTypes().find(rt => rt.value === value);
    if (contractType)
        return contractType.label;
    else
        return value;
}

export const projectObjectNatures = () => {
    return [
        {
            label: "Projet",
            value: 'PROJECT'
        }
    ]
}

export const getProjectObjectNatureLabel = (value: any) => {
    let projectNature = projectObjectNatures().find(rt => rt.value === value);
    if (projectNature)
        return projectNature.label;
    else
        return value;
}

export const propertyTypes = () => {
    return [
        {
            label: "Montant souscription au capital",
            value: 'CAPITAL_AMOUNT_SUBSCRIPTION'
        },
        {
            label: "Libellé d'un emprunt",
            value: 'LOAN_LABEL'
        },
        {
            label: "Devise",
            value: 'CURRENCY'
        },
        {
            label: "Libellé poste de capital",
            value: 'CAPITAL_POST_LABEL'
        },
        {
            label: "Libellé poste de compte courant",
            value: 'CHECKING_ACCOUNT_POST_LABEL'
        }
    ]
}

export const getPropertyTypeLabel = (value: any) => {
    let propertyType = propertyTypes().find(rt => rt.value === value);
    if (propertyType)
        return propertyType.label;
    else
        return value;
}