/**
 * App Config File
 */
const AppConfig = {
   appLogo: require('Assets/identity/logomicrocap.png'),          // App Logo
   brandName: 'Microcap',                                    // Brand Name
   navCollapsed: false,                                      // Sidebar collapse
   darkMode: false,                                          // Dark Mode
   boxLayout: false,                                         // Box Layout
   rtlLayout: false,                                         // RTL Layout
   miniSidebar: false,                                       // Mini Sidebar
   enableSidebarBackgroundImage: false,                      // Enable Sidebar Background Image
   sidebarImage: require('Assets/img/profile.jpg'),     // Select sidebar image
   isDarkSidenav: true,                                   // Set true to dark sidebar
   enableThemeOptions: true,                              // Enable Theme Options
   locale: {
      languageId: 'french',
      locale: 'fr',
      name: 'French',
      icon: 'fr',
   },
   languages: [
      {
         languageId: 'english',
         locale: 'en',
         name: 'English',
         icon: 'en',
      },
      {
         languageId: 'chinese',
         locale: 'zh',
         name: 'Chinese',
         icon: 'zh',
      },
      {
         languageId: 'russian',
         locale: 'ru',
         name: 'Russian',
         icon: 'ru',
      },
      {
         languageId: 'hebrew',
         locale: 'he',
         name: 'Hebrew',
         icon: 'he',
      },
      {
         languageId: 'french',
         locale: 'fr',
         name: 'French',
         icon: 'fr',
      },
      {
         languageId: 'saudi-arabia',
         locale: 'ar',
         name: 'Arabic',
         icon: 'ar',
      },
      {
         languageId: 'german',
         locale: 'de',
         name: 'German',
         icon: 'de',
      },
      {
         languageId: 'spanish',
         locale: 'es',
         name: 'Spanish',
         icon: 'es',
      },
      {
         languageId: 'japanese',
         locale: 'ja',
         name: 'Japanese',
         icon: 'ja',
      },
      {
         languageId: 'korean',
         locale: 'ko',
         name: 'Korean',
         icon: 'ko',
      },
      {
         languageId: 'italian',
         locale: 'it',
         name: 'Italian',
         icon: 'it',
      },
      {
         languageId: 'hungarian',
         locale: 'hu',
         name: 'Hungarian',
         icon: 'hu',
      }
   ],
   enableUserTour: process.env.NODE_ENV === 'production' ? true : false,  // Enable / Disable User Tour
   copyRightText: 'Microcap © 2021 All Rights Reserved.',      // Copy Right Text
   // light theme colors
   themeColors: {
      'primary': '#FFB70F',
      'secondary': '#677080',
      'success': '#00D014',
      'danger': '#FF3739',
      'warning': '#FFB70F',
      'info': '#00D0BD',
      'dark': '#464D69',
      'default': '#FAFAFA',
      'greyLighten': '#A5A7B2',
      'grey': '#677080',
      'white': '#FFFFFF',
      'purple': '#896BD6',
      'yellow': '#D46B08'
   },
   // dark theme colors
   darkThemeColors: {
      darkBgColor: '#424242'
   },
   minPasswordLength: 3,
   minYearOld: 10,
   oauth: {
      clientId: 'microcap-app',
      clientSecret: 'geloka-secret',
      grantType: 'password',
   },

   api: {
      //  baseUrl: 'http://192.168.225.220:8080/',
      //  baseUrl: 'http://178.170.41.113:8080/',
      //  baseUrl: 'http://192.168.1.4:8080/',
      //  baseUrl: 'http://178.170.41.113:8080/',
      //  baseUrl: 'http://192.168.43.83:8080/',
      //  baseUrl: 'https://dev1.microcap.fr:8443/',
       baseUrl: 'https://api-preprod.microcap.fr/',
      //  baseUrl: 'https://api.microcap.fr/',
      // baseUrl: 'http://localhost:8080/',
      version: '1.0',
      // forbiddenCode: 401,
     },
   };

export default AppConfig;
