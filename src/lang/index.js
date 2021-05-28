/**
 * App Language Provider
 * Add more locales here
 */
import {getDefaultLanguage} from "Helpers/helpers";
import { addLocaleData, IntlProvider } from 'react-intl';
import enLang from './entries/en-US';
import frLang from './entries/fr_FR';
import zhLang from './entries/zh-Hans-CN';
import arLang from './entries/ar_SA';
import heLang from './entries/he_HE';
import deLang from './entries/de_DE';
import ruLang from './entries/ru_RU';
import esLang from './entries/es_ES';
import jaLang from './entries/ja_JA';
import koLang from './entries/ko_KO';
import itLang from './entries/it_IT';
import huLang from './entries/hu_HU';
import {initMoment} from "../services/momentService";

const AppLocale = {
    en: enLang,
    fr: frLang,
    zh: zhLang,
    ar: arLang,
    he: heLang,
    de: deLang,
    ru: ruLang,
    es: esLang,
    ja: jaLang,
    ko: koLang,
    it: itLang,
    hu: huLang
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fr.data);
addLocaleData(AppLocale.zh.data);
addLocaleData(AppLocale.ar.data);
addLocaleData(AppLocale.he.data);
addLocaleData(AppLocale.de.data);
addLocaleData(AppLocale.ru.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.ja.data);
addLocaleData(AppLocale.ko.data);
addLocaleData(AppLocale.it.data);
addLocaleData(AppLocale.hu.data);

const currentAppLocale = AppLocale[getDefaultLanguage().locale];

/*if (currentAppLocale.locale === 'fr') {
    initMoment('fr');
}*/
initMoment('fr');

const intlProvider = new IntlProvider({
    key: currentAppLocale.locale,
    locale: currentAppLocale.locale,
    messages: currentAppLocale.messages,
});

const { intl } = intlProvider.getChildContext();

// export const formatMessage = (id, value = {}) => intl.formatMessage({ id, value, });
export const formatMessage = (id, value = {}) => id;

export default AppLocale;
