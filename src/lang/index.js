/**
 * App Language Provider
 * Add more locales here
 */
import {getDefaultLanguage} from "Helpers/helpers";
import { addLocaleData, IntlProvider } from 'react-intl';
import enLang from './entries/en-US';
import frLang from './entries/fr_FR';
import {initMoment} from "../services/momentService";

const AppLocale = {
    en: enLang,
    fr: frLang
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fr.data);

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

export const formatMessage = (id, value = {}) => intl.formatMessage({ id, value, });
// export const formatMessage = (id, value = {}) => id;

export default AppLocale;
