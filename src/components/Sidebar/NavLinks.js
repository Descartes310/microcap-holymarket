// sidebar nav links
import {CATALOG, COMMERCIAL_MANAGEMENT, COMMUNITY_ADMIN, COMMUNITY_MEMBER, COMMUNITY, NETWORK, PRODUCT, USERS, ACCESS, SETTINGS, PROJECTS, MICROCAP360} from 'Url/frontendUrl';
import Branch from 'Models/Branch';
import Permission from "Enums/Permissions";

export default {
   a: [
      
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
               "menu_title": "Permissions",
               "new_item": false,
               "path": USERS.USERS_PROFILE.USERS_PERMISSION.LIST,
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
               "permissions": [
               ],
               "child_routes": [
                  {
                     "menu_title": "Ouvrages",
                     "new_item": false,
                     "permissions": [Permission.projects.configuration.handiwork.viewOne],
                     "path": PROJECTS.CONFIGURATION.WORKS.SELF,
                  },
                  {
                     "menu_title": "Options d'initialisation",
                     "new_item": false,
                     "permissions": [Permission.projects.configuration.initialisationOption.viewOne],
                     "path": PROJECTS.CONFIGURATION.INITIALISATION.SELF,
                  },
                  {
                     "menu_title": "Standard de présentation",
                     "new_item": false,
                     "permissions": [Permission.projects.configuration.standardPresentation.viewOne],
                     "path": PROJECTS.CONFIGURATION.STANDARD.SELF,
                  },
               ],
            },
            {
               "path": PROJECTS.PROJECTS.LIST,
               "new_item": false,
               "menu_title": "Projets",
               "permissions": [Permission.projects.project.viewList],
            },
            {
               "path": PROJECTS.POST_PROJETS.LIST,
               "new_item": false,
               "menu_title": "Poste projets",
              "permissions": [Permission.projects.projectPost.viewOne],
            },
            {
               "path": PROJECTS.PROJECTS.EDITION.SELF,
               "new_item": false,
               "menu_title": "Edition",
               "permissions": [Permission.projects.edition.viewOne],
            },
            {
               "path": PROJECTS.PROJECTS.CONSULTATION,
               "new_item": false,
               "menu_title": "Consultation",
               "permissions": [],
            },
            {
               "path": PROJECTS.FOLDERS.SELF,
               "new_item": false,
               "menu_title": "Gestion des projets",
               "permissions": [Permission.navLinks.projects.folders.viewMenu],
            },
            /*{
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
            },*/
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
         // "permissions": [Permission.navLinks.COMMUNITY_MEMBER.viewMenu],
         "permissions": [],
         "child_routes": null
      },
      {
         "menu_title": "Communauté membre",
         "menu_icon": "zmdi zmdi-comments",
         "new_item": false,
         "path": COMMUNITY_MEMBER.SELF,
         // "permissions": [Permission.navLinks.COMMUNITY_MEMBER.viewMenu],
         "permissions": [],
         "child_routes": null
      },
      {
         "menu_title": "Communauté",
         "menu_icon": "zmdi zmdi-comments",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Poste projet",
               "new_item": false,
               "path": COMMUNITY.POST_PROJECT.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Membres",
               "new_item": false,
               "path": COMMUNITY.MEMBERS.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Activités",
               "new_item": false,
               "path": COMMUNITY.ACTIVITY.SELF,
               "permissions": [],
            },
         ],
      },
      {
         "menu_title": "Microcap360",
         "menu_icon": "icon-people",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Comptes",
               "new_item": false,
               "path": MICROCAP360.COMPTES.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Projets",
               "new_item": false,
               "path": PROJECTS.FOLDERS.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Reseau",
               "new_item": false,
               "path": MICROCAP360.RESEAU.SELF,
               "permissions": [],
            },
         ],
      },
      {
         "menu_title": "Accès",
         "menu_icon": "zmdi zmdi-key",
         "new_item": false,
         "path": ACCESS.SELF,
         // "permissions": [Permission.navLinks.COMMUNITY_MEMBER.viewMenu],
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
   platform_manager: [
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
               "menu_title": "Permissions",
               "new_item": false,
               "path": USERS.USERS_PROFILE.USERS_PERMISSION.LIST,
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
               "menu_title": "Consulter",
               "new_item": false,
               "path": NETWORK.LIST,
               // "permissions": [Permission.branch.viewList],
               "permissions": [Permission.navLinks.network.viewMenu],
            },
            {
               "menu_title": "Editer",
               "new_item": false,
               "path": NETWORK.ONGOING_CREATE,
               "permissions": [Permission.navLinks.network.viewMenu],
               "child_routes": null
                  // {
                  //    "path": NETWORK.ONGOING_CREATE,
                  //    "menu_title": "Editer",
                  //    "permissions": [Permission.navLinks.network.viewMenu],
                  // },
               //    {
               //       "path": NETWORK.CREATE,
               //       "menu_title": "Nouveau",
               //       "permissions": [Permission.navLinks.network.viewMenu],
               //    },
               // ]
            },
            // {
            //    "menu_title": "Configuration",
            //    "new_item": false,
            //    "path": NETWORK.CONFIGURATION.SELF,
            //    "permissions": [Permission.navLinks.network.childLinks.configuration.viewMenu],
            // },
            // {
            //    "menu_title": "Couverture",
            //    "path": NETWORK.COVERAGE,
            //    "new_item": false,
            //    "permissions": [Permission.navLinks.network.childLinks.coverage.viewMenu],
            // },
         ]
      },
      {
         "menu_title": "Accès",
         "menu_icon": "zmdi zmdi-key",
         "new_item": false,
         "path": ACCESS.SELF,
         // "permissions": [Permission.navLinks.COMMUNITY_MEMBER.viewMenu],
         "permissions": [],
         "child_routes": null
      }
   ],
   exploitant_reseau: [
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
               "menu_title": "Permissions",
               "new_item": false,
               "path": USERS.USERS_PROFILE.USERS_PERMISSION.LIST,
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
               "menu_title": "Configuration",
               "new_item": false,
               "path": NETWORK.CONFIGURATION.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Couverture",
               "path": NETWORK.COVERAGE,
               "new_item": false,
               "permissions": [],
            },
         ]
      },{
         "menu_title": "Microcap360",
         "menu_icon": "icon-people",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Reseau",
               "new_item": false,
               "path": MICROCAP360.RESEAU.SELF,
               "permissions": [],
            },
         ],
      },{
         "menu_title": "Produits & services",
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
               "permissions": [
               ],
               "child_routes": [
                  {
                     "menu_title": "Ouvrages",
                     "new_item": false,
                     "permissions": [Permission.projects.configuration.handiwork.viewOne],
                     "path": PROJECTS.CONFIGURATION.WORKS.SELF,
                  },
                  {
                     "menu_title": "Options d'initialisation",
                     "new_item": false,
                     "permissions": [Permission.projects.configuration.initialisationOption.viewOne],
                     "path": PROJECTS.CONFIGURATION.INITIALISATION.SELF,
                  },
                  {
                     "menu_title": "Standard de présentation",
                     "new_item": false,
                     "permissions": [Permission.projects.configuration.standardPresentation.viewOne],
                     "path": PROJECTS.CONFIGURATION.STANDARD.SELF,
                  },
               ],
            },
            {
               "path": PROJECTS.PROJECTS.LIST,
               "new_item": false,
               "menu_title": "Projets",
               "permissions": [Permission.projects.project.viewList],
            },
            {
               "path": PROJECTS.POST_PROJETS.LIST,
               "new_item": false,
               "menu_title": "Poste projets",
              "permissions": [Permission.projects.projectPost.viewOne],
            },
            {
               "path": PROJECTS.PROJECTS.EDITION.SELF,
               "new_item": false,
               "menu_title": "Edition",
               "permissions": [Permission.projects.edition.viewOne],
            },
            {
               "path": PROJECTS.PROJECTS.CONSULTATION,
               "new_item": false,
               "menu_title": "Consultation",
               "permissions": [],
            },
            {
               "path": PROJECTS.FOLDERS.SELF,
               "new_item": false,
               "menu_title": "Gestion des projets",
               "permissions": [Permission.navLinks.projects.folders.viewMenu],
            }
         ]
      },
      {
         "menu_title": "Accès",
         "menu_icon": "zmdi zmdi-key",
         "new_item": false,
         "path": ACCESS.SELF,
         // "permissions": [Permission.navLinks.COMMUNITY_MEMBER.viewMenu],
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
            {
               "menu_title": "Dossier utilisateur",
               "new_item": false,
               "path": SETTINGS.USERPIECE.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Configuration",
               "new_item": false,
               "path": SETTINGS.CONFIGS.SELF,
               "permissions": [],
            },
         ]
      },
   ],
   pfm: [
      {
         "menu_title": "Profile",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },{
         "menu_title": "Microcap360",
         "menu_icon": "icon-people",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Comptes",
               "new_item": false,
               "path": PRODUCT.SHOW_ACCOUNT,
               "permissions": [],
            },
            {
               "menu_title": "Projets",
               "new_item": false,
               "path": PROJECTS.FOLDERS.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Reseau",
               "new_item": false,
               "path": MICROCAP360.RESEAU.SELF,
               "permissions": [],
            },
         ],
      },{
         "menu_title": "Bourse de Financement",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },{
         "menu_title": "Bourse des opportunités",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },
      {
         "menu_title": "Produits & Services",
         "menu_icon": "zmdi zmdi-shopping-cart",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY_MEMBER.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Market place",
               "new_item": false,
               "path": PRODUCT.LIST,
               "permissions": [],
            },
            {
               "menu_title": "Mes commandes",
               "new_item": false,
               "path": PRODUCT.ORDERS,
               "permissions": [],
            }
         ],
      },{
         "menu_title": "Ressources",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },

   ],
   member: [
      {
         "menu_title": "Profile",
         "menu_icon": "zmdi zmdi-accounts",
         "path": USERS.USERS.PERSONNAL_SPACE,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },{
         "menu_title": "Microcap360",
         "menu_icon": "icon-people",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Comptes",
               "new_item": false,
               "path": PRODUCT.SHOW_ACCOUNT,
               "permissions": [],
            },
            {
               "menu_title": "Projets",
               "new_item": false,
               "path": PROJECTS.FOLDERS.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Reseau",
               "new_item": false,
               "path": MICROCAP360.RESEAU.SELF,
               "permissions": [],
            },
         ],
      },{
         "menu_title": "Bourse de Financement",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },{
         "menu_title": "Bourse des opportunités",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },
      {
         "menu_title": "Produits & Services",
         "menu_icon": "zmdi zmdi-shopping-cart",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY_MEMBER.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Market place",
               "new_item": false,
               "path": PRODUCT.LIST,
               "permissions": [],
            },
            {
               "menu_title": "Mes commandes",
               "new_item": false,
               "path": PRODUCT.ORDERS,
               "permissions": [],
            }
         ],
      },{
         "menu_title": "Ressources",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [Branch.permissionsRelated.READ],
         'subject': Branch
      },

   ],
   community: [
      {
         "menu_title": "Espace personnel",
         "menu_icon": "zmdi zmdi-accounts",
         "path": NETWORK.LIST,
         "new_item": false,
         "child_routes": null,
         "permissions": [],
         'key': 'personnal_space'
      },{
         "menu_title": "Communauté",
         "menu_icon": "icon-people",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Membres",
               "new_item": false,
               "path": COMMUNITY.MEMBERS.LIST,
               "permissions": [],
            },
            {
               "menu_title": "Activités",
               "new_item": false,
               "path": PROJECTS.FOLDERS.REACTIONS.LIST,
               "permissions": [],
            }
         ],
      },{
         "menu_title": "Projets",
         "menu_icon": "icon-people",
         "new_item": false,
         // "permissions": [Permission.navLinks.COMMUNITY.viewMenu],
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Edition",
               "new_item": false,
               "path": MICROCAP360.COMPTES.SELF,
               "permissions": [],
            },
            {
               "menu_title": "Consultation",
               "new_item": false,
               "path": PROJECTS.FOLDERS.SELF,
               "permissions": [],
            }
         ],
      }, {
         "menu_title": "Administration",
         "menu_icon": "zmdi zmdi-widgets",
         "new_item": false,
         'key': 'commnity_admin',
         "type_multi": true,
         "permissions": [],
         "child_routes": [
            {
               "menu_title": "Membres",
               "new_item": false,
               'key': 'commnity_admin',
               "path": COMMUNITY_ADMIN.MEMBERS.LIST,
               "permissions": [],
            },{
               "menu_title": "Postes",
               "new_item": false,
               'key': 'commnity_admin',
               "path": PROJECTS.POST_PROJETS.LIST,
               "permissions": [],
            },
            {
               "menu_title": "Codes",
               "new_item": false,
               'key': 'commnity_admin',
               "permissions": [],
               "child_routes": [
                  {
                     "menu_title": "Paiement",
                     "new_item": false,
                     'key': 'commnity_admin',
                     "path": COMMUNITY_ADMIN.SELF,
                     "permissions": [],
                  },{
                     "menu_title": "Recharge",
                     "new_item": false,
                     'key': 'commnity_admin',
                     "path": COMMUNITY_ADMIN.VOUCHER.CHARCHING,
                     "permissions": [],
                  },
                  {
                     "menu_title": "Confirmation",
                     "new_item": false,
                     'key': 'commnity_admin',
                     "path": COMMUNITY.MEMBERS.LIST,
                     "permissions": [],
                  }
               ],
            }
         ]
      }
   ]
}
