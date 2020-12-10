// sidebar nav links
import {CATALOG, COMMERCIAL_MANAGEMENT, COMMUNITY, NETWORK, PRODUCT, USERS, ACCESS, SETTINGS, PROJECTS} from 'Url/frontendUrl';
import Branch from 'Models/Branch';
import Permission from "Enums/Permissions";

export default {
   a: [
      {
         "menu_title": "Réseau",
         "menu_icon": "zmdi zmdi-accounts-list",
         "new_item": false,
         "path": NETWORK.LIST,
         "permissions": [Permission.navLinks.network.viewMenu],
         "child_routes": [
            {
               "menu_title": "Liste",
               "new_item": false,
               "path": NETWORK.LIST,
               "permissions": [Permission.branch.viewList],
            },
            /*{
               "menu_title": "Creation",
               "new_item": false,
               "path": NETWORK.CREATE,
               "type_multi": true,
               "permissions": [Permission.branch.createOne, Permission.branch.createMany],
               "child_routes": [
                  {
                     "path": NETWORK.CREATE,
                     "menu_title": "En cours",
                  },
                  {
                     "path": NETWORK.CREATE,
                     "menu_title": "Nouveau",
                  },
               ]
            },*/
            {
               "menu_title": "Configuration",
               "new_item": false,
               "path": NETWORK.CONFIGURATION.SELF,
               "permissions": [Permission.navLinks.network.childLinks.configuration.viewMenu],
            },
            {
               "menu_title": "Couverture",
               "path": NETWORK.COVERAGE,
               "new_item": false,
               "permissions": [Permission.navLinks.network.childLinks.coverage.viewMenu],
            },
         ]
      },
   ],
   menus: [
      {
         "menu_title": "Utilisateurs",
         "menu_icon": "zmdi zmdi-accounts",
         "new_item": false,
         "permissions": [Permission.navLinks.users.viewMenu],
         "child_routes": [
            {
               "menu_title": "Utilisateurs",
               "new_item": false,
               "path": USERS.USERS.SELF,
               "permissions": [Permission.navLinks.users.childLinks.users.viewMenu],
            },
            {
               "menu_title": "Roles",
               "new_item": false,
               "path": USERS.USERS_PROFILE.SELF,
               "permissions": [Permission.navLinks.users.childLinks.userProfile.viewMenu],
            },
            {
               "menu_title": "Compte utilisateurs",
               "new_item": false,
               "path": USERS.ACCOUNTS.SELF,
               "permissions": [Permission.navLinks.users.childLinks.accounts.viewMenu],
            },
         ],
      },
      {
         "menu_title": "Réseau",
         "menu_icon": "zmdi zmdi-accounts-list",
         "new_item": false,
         "path": NETWORK.LIST,
         "type_multi": true,
         "permissions": [Permission.navLinks.network.viewMenu],
         "child_routes": [
            {
               "menu_title": "Liste",
               "new_item": false,
               "path": NETWORK.LIST,
               // "permissions": [Permission.branch.viewList],
               "permissions": [Permission.navLinks.network.viewMenu],
            },
            {
               "menu_title": "Creation",
               "new_item": false,
               "path": NETWORK.CREATE,
               // "permissions": [Permission.branch.createOne, Permission.branch.createMany],
               "permissions": [Permission.navLinks.network.viewMenu],
               "child_routes": [
                  {
                     "path": NETWORK.ONGOING_CREATE,
                     "menu_title": "En cours",
                     "permissions": [Permission.navLinks.network.viewMenu],
                  },
                  {
                     "path": NETWORK.CREATE,
                     "menu_title": "Nouveau",
                     "permissions": [Permission.navLinks.network.viewMenu],
                  },
               ]
            },
            {
               "menu_title": "Configuration",
               "new_item": false,
               "path": NETWORK.CONFIGURATION.SELF,
               "permissions": [Permission.navLinks.network.childLinks.configuration.viewMenu],
            },
            {
               "menu_title": "Couverture",
               "path": NETWORK.COVERAGE,
               "new_item": false,
               "permissions": [Permission.navLinks.network.childLinks.coverage.viewMenu],
            },
         ]
      },
      {
         "menu_title": "Produits",
         "menu_icon": "zmdi zmdi-widgets",
         "new_item": false,
         "permissions": [Permission.navLinks.products.viewMenu],
         "child_routes": [
            {
               "menu_title": "Catalogue produits",
               "new_item": false,
               "path": CATALOG.PRODUCT.SELF,
               "permissions": [Permission.navLinks.products.childLinks.catalogProducts.viewMenu],
            },
            {
               "path": CATALOG.SALE.SELF,
               "new_item": false,
               "menu_title": "Catalogue ventes",
               "permissions": [Permission.navLinks.products.childLinks.catalogProducts.viewMenu],
            },
            {
               "path": NETWORK.COVERAGE,
               "new_item": false,
               "menu_title": "Catalogue distributions",
               "permissions": [Permission.navLinks.products.childLinks.catalogDistribution.viewMenu],
            },
         ]
      },
      {
         "menu_title": "Projets",
         "menu_icon": "zmdi zmdi-widgets",
         "new_item": false,
         "permissions": [],
         "type_multi": true,
         "child_routes": [
            {
               "menu_title": "Configuration",
               "menu_icon": "zmdi zmdi-case",
               "new_item": false,
               "permissions": [],
               "child_routes": [
                  {
                     "menu_title": "Ouvrages",
                     "new_item": false,
                     "permissions": [],
                     "path": PROJECTS.CONFIGURATION.WORKS.SELF,
                  },
                  {
                     "menu_title": "Initialisation",
                     "new_item": false,
                     "permissions": [],
                     "path": PROJECTS.CONFIGURATION.WORKS.SELF,
                  },
                  {
                     "menu_title": "Standard de présentation",
                     "new_item": false,
                     "permissions": [],
                     "path": PROJECTS.CONFIGURATION.STANDARD.SELF,
                  },
               ],
            },
            {
               "path": COMMERCIAL_MANAGEMENT.COMMERCIAL_OPERATION.SELF,
               "new_item": false,
               "menu_title": "Opération commerciale",
               "permissions": [],
            },
            {
               "path": COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.SELF,
               "new_item": false,
               "menu_title": "Offre commerciale",
               "permissions": [],
            },
         ]
      },
      {
         "menu_title": "Gestion commercial",
         "menu_icon": "zmdi zmdi-case",
         "new_item": false,
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Type d'opération commerciale",
               "new_item": false,
               "path": COMMERCIAL_MANAGEMENT.COMMERCIAL_OPERATION_TYPE.SELF,
               "permissions": [],
            },
            {
               "path": COMMERCIAL_MANAGEMENT.COMMERCIAL_OPERATION.SELF,
               "new_item": false,
               "menu_title": "Opération commerciale",
               "permissions": [],
            },
            {
               "path": COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.SELF,
               "new_item": false,
               "menu_title": "Offre commerciale",
               "permissions": [],
            },
         ]
      },
      {
         "menu_title": "Produits & Services",
         "menu_icon": "zmdi zmdi-shopping-cart",
         "new_item": false,
         "path": PRODUCT.LIST,
         // "permissions": [Permission.navLinks.community.viewMenu],
         "permissions": [],
         "child_routes": null
      },
       {
           "menu_title": "Communauté",
           "menu_icon": "zmdi zmdi-comments",
           "new_item": false,
           "path": COMMUNITY.SELF,
           // "permissions": [Permission.navLinks.community.viewMenu],
           "permissions": [],
           "child_routes": null
       },
      {
         "menu_title": "Accès",
         "menu_icon": "zmdi zmdi-key",
         "new_item": false,
         "path": ACCESS.SELF,
         // "permissions": [Permission.navLinks.community.viewMenu],
         "permissions": [],
         "child_routes": null
      },
      {
         "menu_title": "Paramètres",
         "menu_icon": "zmdi zmdi-settings",
         "new_item": false,
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Notification",
               "new_item": false,
               "path": SETTINGS.NOTIFICATION.SELF,
               "permissions": [],
            },
         ]
      },
   ],
   manager: [
      {
         "menu_title": "sidebar.branch",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },
   ],
   exploitant: [
      {
         "menu_title": "sidebar.branch",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch,
         "child_routes": [
            {
               "menu_title": "sidebar.configuration",
               "new_item": false,
               "path": NETWORK.CONFIGURATION.SELF
            },
            {
               "path": NETWORK.COVERAGE,
               "new_item": false,
               "menu_title": "sidebar.coverage"
            },
         ]
      },
      {
         "menu_title": "sidebar.products",
         "menu_icon": "zmdi zmdi-widgets",
         "new_item": false,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch,
         "child_routes": [
            {
               "menu_title": "sidebar.catalogProducts",
               "new_item": false,
               "path": CATALOG.PRODUCT.SELF
            },
            {
               "path": NETWORK.COVERAGE,
               "new_item": false,
               "menu_title": "sidebar.catalogSales"
            },
            {
               "path": NETWORK.COVERAGE,
               "new_item": false,
               "menu_title": "sidebar.catalogDistribution"
            },
         ]
      },
   ],
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "type_multi": null,
         "new_item": true,
         "child_routes": [
            {
               "menu_title": "sidebar.ecommerce",
               "new_item": false,
               "path": "/app/dashboard/ecommerce"
            },
            {
               "path": "/dashboard/crm/dashboard",
               "new_item": true,
               "menu_title": "sidebar.crm"
            },
            {
               "path": "/horizontal/dashboard/saas",
               "new_item": false,
               "menu_title": "sidebar.saas"
            },
            {
               "path": "/agency/dashboard/agency",
               "new_item": false,
               "menu_title": "sidebar.agency"
            },
            {
               "path": "/boxed/dashboard/news",
               "new_item": false,
               "menu_title": "sidebar.news"
            },
         ]
      },
      {
         "menu_title": "sidebar.crm",
         "menu_icon": "zmdi zmdi-book",
         "type_multi": null,
         "new_item": true,
         "child_routes": [
            {
               "path": "/dashboard/crm/projects",
               "new_item": true,
               "menu_title": "sidebar.projects"
            },
            {
               "path": "/dashboard/crm/clients",
               "new_item": true,
               "menu_title": "sidebar.clients"
            },
            {
               "path": "/dashboard/crm/reports",
               "new_item": true,
               "menu_title": "sidebar.reports"
            }
         ]
      },
      {
         "menu_title": "sidebar.ecommerce",
         "menu_icon": "zmdi zmdi-shopping-cart",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/ecommerce/shop",
               "new_item": false,
               "menu_title": "sidebar.shop"
            },
            {
               "path": "/app/ecommerce/cart",
               "new_item": false,
               "menu_title": "sidebar.cart"
            },
            {
               "path": "/app/ecommerce/checkout",
               "new_item": false,
               "menu_title": "sidebar.checkout"
            },
            {
               "path": "/app/ecommerce/shop-list",
               "new_item": false,
               "menu_title": "sidebar.shopList"
            },
            {
               "path": "/app/ecommerce/shop-grid",
               "new_item": false,
               "menu_title": "sidebar.shopGrid"
            },
            {
               "path": "/app/ecommerce/invoice",
               "new_item": false,
               "menu_title": "sidebar.invoice"
            }
         ]
      },
      {
         "menu_title": "sidebar.widgets",
         "menu_icon": "zmdi zmdi-widgets",
         "path": "/app/widgets",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/widgets/charts",
               "new_item": false,
               "menu_title": "sidebar.charts"
            },
            {
               "path": "/app/widgets/promo",
               "new_item": false,
               "menu_title": "sidebar.promo"
            },
            {
               "path": "/app/widgets/general",
               "new_item": false,
               "menu_title": "sidebar.general"
            },
            {
               "path": "/app/widgets/user",
               "new_item": false,
               "menu_title": "sidebar.user"
            },


         ]
      },
      {
         "menu_title": "sidebar.pages",
         "menu_icon": "zmdi zmdi-file-plus",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/pages/gallery",
               "new_item": false,
               "menu_title": "sidebar.gallery"
            },
            {
               "path": "/app/pages/pricing",
               "new_item": false,
               "menu_title": "sidebar.pricing"
            },
            {
               "path": "/app/pages/blank",
               "menu_title": "sidebar.blank"
            },
            {
               "path": "/terms-condition",
               "menu_title": "sidebar.terms&Conditions"
            },
            {
               "path": "/app/pages/feedback",
               "menu_title": "sidebar.feedback"
            },
            {
               "path": "/app/pages/report",
               "menu_title": "sidebar.report"
            },
            {
               "path": "/app/pages/faq",
               "menu_title": "sidebar.faq(s)"
            }
         ]
      },
      {
         "menu_title": "sidebar.session",
         "menu_icon": "zmdi zmdi-time-interval",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/session/login",
               "new_item": false,
               "menu_title": "sidebar.login"
            },
            {
               "path": "/session/register",
               "new_item": false,
               "menu_title": "sidebar.register"
            },
            {
               "path": "/session/lock-screen",
               "new_item": false,
               "menu_title": "sidebar.lockScreen"
            },
            {
               "path": "/session/forgot-password",
               "new_item": false,
               "menu_title": "sidebar.forgotPassword"
            },
            {
               "path": "/session/404",
               "new_item": false,
               "menu_title": "sidebar.404"
            },
            {
               "path": "/session/500",
               "new_item": false,
               "menu_title": "sidebar.500"
            }
         ]
      }
   ],
}
