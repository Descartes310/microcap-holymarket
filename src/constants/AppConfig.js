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
   currency: {
		label: 'Euro',
		code: 'EUR',
		rate: 1
	},
   languages: [
      {
         languageId: 'english',
         locale: 'en',
         name: 'English',
         icon: 'en',
      },
      {
         languageId: 'french',
         locale: 'fr',
         name: 'French',
         icon: 'fr',
      }
   ],
   enableUserTour: false,  // Enable / Disable User Tour
   copyRightText: `Microcap © ${new Date().getFullYear()} All Rights Reserved.`,      // Copy Right Text
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
   minPasswordLength: 8,
   minYearOld: 10,
   oauth: {
      clientId: 'microcap-app',
      clientSecret: 'geloka-secret',
      grantType: 'password',
   },
   payments: {
      stripe: process.env.STRIPE_KEY,
      version: '1.0'
   },

   api: {
      baseUrl: process.env.API_URL,
      version: '1.0',
      territory: process.env.TERRITORY_URL
      // forbiddenCode: 401,
   },
};

export default AppConfig;
