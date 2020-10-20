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
   enableSidebarBackgroundImage: true,                      // Enable Sidebar Background Image
   sidebarImage: require('Assets/img/sidebar-4.jpg'),     // Select sidebar image
   isDarkSidenav: true,                                   // Set true to dark sidebar
   enableThemeOptions: true,                              // Enable Theme Options
   locale: {
      languageId: 'english',
      locale: 'en',
      name: 'English',
      icon: 'en',
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
   copyRightText: 'Reactify © 2019 All Rights Reserved.',      // Copy Right Text
   // light theme colors
   themeColors: {
      'primary': '#5D92F4',
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
   oauth: {
      clientId: 'microcap-app',
      clientSecret: 'geloka-secret',
      grantType: 'password',
   },
   api: {
      baseUrl: 'http://prp.microcap.fr/',
      version: ''
   }
};

export default AppConfig;
