// sidebar nav links
import Permission from "Enums/Permissions";
import {
   BANK,
   GROUP,
   BROKER,
   PROJECT,
   PROFILE,
   SETTING,
   FUNDING,
   NETWORK,
   MARKETPLACE,
   USER_ACCOUNT_TYPE,
   joinUrlWithParams,
   joinUrlWithParamsId,
   MIPRO
} from 'Url/frontendUrl';

export type MenuItem = {
   key?: string;
   path?: string;
   subject?: string;
   new_item: boolean;
   menu_title: string;
   menu_icon?: string;
   type_multi?: boolean;
   child_routes?: MenuItem[];
   profiles: string[] | null; // null means no need profile to access
   permissions: string[] | null; // null for no permissions need to access
   permissions_and?: boolean   // if true, then the user must have all the listed permissions
}

export default [
   {
      "new_item": false,
      "permissions": null,
      "child_routes": null,
      "menu_title": "Mon profile",
      "menu_icon": "zmdi zmdi-flag",
      "path": PROFILE.USER.SELF
   },
   {
      "menu_title": "Réseau",
      "menu_icon": "zmdi zmdi-globe-alt",
      "new_item": false,
      "permissions": [
         Permission.network.coverage.territory.name,
         Permission.network.coverage.contract.name,
         Permission.network.coverage.partner.name,
      ],
      "profiles": ['GROUP'],
      "type_multi": true,
      "child_routes": [
         {
            "menu_title": "Térritoires",
            "new_item": false,
            "path": NETWORK.COVERAGE.TERRITORY.LIST,
            "permissions": [
               Permission.network.coverage.territory.name,
            ],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Contrats",
            "new_item": false,
            "path": NETWORK.COVERAGE.CONTRACT.LIST,
            "permissions": [
               Permission.network.coverage.contract.name,
            ],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Partenaires",
            "new_item": false,
            "path": NETWORK.COVERAGE.PARTNERSHIP.COMMUNITY,
            "permissions": [
               Permission.network.coverage.partner.name,
            ],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Utilisateurs",
            "new_item": false,
            "path": NETWORK.COVERAGE.USERS.LIST,
            "permissions": [
               Permission.network.coverage.partner.name,
            ],
            "profiles": ['GROUP'],
         },
      ]
   },
   {
      "menu_title": "Broker",
      "menu_icon": "zmdi zmdi-money",
      "new_item": false,
      "permissions": [
         Permission.broker.agency.name,
         Permission.broker.counter.name,
         Permission.broker.cashdesk.name,
         Permission.broker.account.name,
      ],
      "profiles": ['BROKER'],
      "type_multi": true,
      "child_routes": [
         {
            "menu_title": "Compte opération",
            "new_item": false,
            "path": joinUrlWithParamsId(FUNDING.ACCOUNT.DETAILS, 'operation'),
            "permissions": [
               Permission.broker.counter.name,
            ],
            "profiles": ['BROKER'],
         },
         {
            "menu_title": "Mes agences",
            "new_item": false,
            "path": BROKER.AGENCY.LIST,
            "permissions": [
               Permission.broker.agency.name,
            ],
            "profiles": ['BROKER'],
         },
         {
            "menu_title": "Mes guichets",
            "new_item": false,
            "path": BROKER.COUNTER.LIST,
            "permissions": [
               Permission.broker.counter.name,
            ],
            "profiles": ['BROKER'],
         },
         {
            "menu_title": "Mes caisses",
            "new_item": false,
            "path": BROKER.CASHDESK.LIST,
            "permissions": [
               Permission.broker.cashdesk.name,
            ],
            "profiles": ['BROKER'],
         },
      ]
   },
   {
      "menu_title": "Comptes utilisateurs",
      "menu_icon": "zmdi zmdi-folder-outline",
      "new_item": false,
      "permissions": [
         Permission.accountType.category.name,
         Permission.accountType.role.name,
         Permission.accountType.type.name
      ],
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Types comptes",
            "new_item": false,
            "path": USER_ACCOUNT_TYPE.TYPE.LIST,
            "permissions": [Permission.accountType.type.name],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Roles comptes",
            "new_item": false,
            "path": USER_ACCOUNT_TYPE.ROLE.LIST,
            "permissions": [Permission.accountType.role.name],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Catégories de comptes",
            "new_item": false,
            "path": USER_ACCOUNT_TYPE.CATEGORY.LIST,
            "permissions": [Permission.accountType.category.name],
            "profiles": ['GROUP'],
         },
      ],
   },
   {
      "path": GROUP.DETAILS.VIEW_SELF,
      "menu_title": "Vitrine membre",
      "menu_icon": "zmdi zmdi-info-outline",
      "new_item": false,
      "child_routes": null,
      "profiles": ['GROUP'],
      "permissions": [Permission.group.details.name],
   },
   {
      "path": GROUP.DETAILS.MEMBERS,
      "menu_title": "Membres du groupe",
      "menu_icon": "zmdi zmdi-accounts",
      "new_item": false,
      "child_routes": null,
      "profiles": ['GROUP'],
      "permissions": [Permission.group.member.name],
   },
   {
      "menu_title": "Gestion groupes",
      "menu_icon": "zmdi zmdi-view-dashboard",
      "new_item": false,
      "permissions": [
         Permission.group.category.name,
         Permission.group.type.name,
         Permission.group.role.name,
      ],
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Types de groupes",
            "new_item": false,
            "path": GROUP.TYPE.LIST,
            "permissions": [Permission.group.type.name],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Catégories de groupes",
            "new_item": false,
            "path": GROUP.CATEGORY.LIST,
            "permissions": [Permission.group.category.name],
            "profiles": ['GROUP'],
         },
      ],
   }, {
      "menu_title": "Administration",
      "menu_icon": "zmdi zmdi-settings",
      "new_item": false,
      "permissions": [
         Permission.group.admin.member.name,
         Permission.group.admin.request.name,
         Permission.group.admin.role.name,
         Permission.group.admin.setting.name,
         Permission.group.admin.post.name,
      ],
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Membres",
            "new_item": false,
            "path": GROUP.ADMINISTRATION.MEMBER.LIST,
            "permissions": [Permission.group.admin.member.name],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Roles membres",
            "new_item": false,
            "path": GROUP.ADMINISTRATION.ROLE.LIST,
            "permissions": [Permission.group.admin.role.name],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Postes",
            "new_item": false,
            "path": GROUP.ADMINISTRATION.POST.LIST,
            "permissions": [Permission.group.admin.post.name,],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Invitations/Demandes",
            "new_item": false,
            "path": GROUP.ADMINISTRATION.REQUEST.SELF,
            "permissions": [Permission.group.admin.request.name],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Fil d'actualité",
            "new_item": false,
            "path": GROUP.ADMINISTRATION.ARTICLE.ITEM.LIST,
            "permissions": [Permission.group.admin.request.name],
            "profiles": ['GROUP'],
         },
         {
            "menu_title": "Paramètres",
            "new_item": false,
            "path": GROUP.ADMINISTRATION.PARAMETER.CREATE,
            "permissions": [Permission.group.admin.setting.name],
            "profiles": ['GROUP'],
         }
      ],
   },

   {
      "menu_title": "MicroCap 360",
      "menu_icon": "zmdi zmdi-home",
      "new_item": false,
      "permissions": [
         Permission.group.space.name,
         Permission.project.project.name,
         Permission.project.item.name,
         Permission.funding.account.name
      ],
      "profiles": null,
      "child_routes": [
         {
            "menu_title": "Réseau",
            "new_item": false,
            "path": GROUP.COMMUNITY.SPACE.MINE,
            "permissions": [Permission.group.space.name],
            "profiles": null,
            "child_routes": null
         },
         {
            "menu_title": "Mes comptes",
            "new_item": false,
            "path": FUNDING.ACCOUNT.LIST,
            "permissions": null,
            // "permissions": [Permission.funding.account.name],
            "profiles": null,
            "child_routes": null
         },
         {
            "menu_title": "Mes projets",
            "new_item": false,
            "path": PROJECT.MINE.FOLDER.LIST,
            "permissions": [Permission.project.project.name],
            "profiles": null,
            "child_routes": null
         },
         {
            "menu_title": "Mon Microcap",
            "new_item": false,
            "path": MIPRO.HOME.SELF,
            "permissions": null,
            "profiles": null,
            "child_routes": null
         },
         {
            "menu_title": "Créations personnelles",
            "new_item": false,
            "path": PROJECT.MINE.ITEM.LIST,
            "permissions": [Permission.project.item.name],
            "profiles": null,
            "child_routes": null
         },
      ],
   },

   {
      "menu_title": "Produits & Services",
      "menu_icon": "zmdi zmdi-labels",
      "new_item": false,
      "permissions": [
         Permission.marketplace.admin.model.name,
         Permission.marketplace.admin.catalog.name,
         Permission.marketplace.admin.category.name,
         Permission.marketplace.admin.offer.name,
      ],
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Modèles produits",
            "new_item": false,
            "path": MARKETPLACE.MODEL.PRODUCT.LIST,
            "permissions": [Permission.marketplace.admin.model.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }, {
            "menu_title": "Catégories produits",
            "new_item": false,
            "path": MARKETPLACE.CATEGORY.LIST,
            "permissions": [Permission.marketplace.admin.category.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }, {
            "menu_title": "Catalogues",
            "new_item": false,
            "path": MARKETPLACE.CATAlOG.SALE.LIST,
            "permissions": [Permission.marketplace.admin.catalog.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }, {
            "menu_title": "Gestion commerciale",
            "new_item": false,
            "path": MARKETPLACE.COMMERCIAL.OFFER.LIST,
            "permissions": [Permission.marketplace.admin.offer.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }
      ],
   },
   {
      "menu_title": "Projets",
      "menu_icon": "zmdi zmdi-laptop",
      "new_item": false,
      "permissions": [
         Permission.project.admin.item.name,
         Permission.project.admin.initialization.name,
         Permission.project.admin.post.name,
      ],
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Ouvrages",
            "new_item": false,
            "path": PROJECT.ITEM.SIMPLE.LIST,
            "permissions": [Permission.project.admin.item.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }, {
            "menu_title": "Option initialisations",
            "new_item": false,
            "path": joinUrlWithParams(PROJECT.INITIALIZATION.LIST, [{param: 'type', value: 'ideas'}]),
            "permissions": [Permission.project.admin.initialization.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }, {
            "menu_title": "Postes projet",
            "new_item": false,
            "path": PROJECT.POST.LIST,
            "permissions": [Permission.project.admin.post.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }
      ],
   },
   {
      "menu_title": "Ma boutique",
      "menu_icon": "zmdi zmdi-store",
      "new_item": false,
      "permissions": [
         Permission.marketplace.store.product.name,
         Permission.marketplace.store.purchase.name,
         Permission.marketplace.store.order.name,
      ],
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Produits",
            "new_item": false,
            "path": MARKETPLACE.STORE.PRODUCT.LIST,
            "permissions": [Permission.marketplace.store.product.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Options produit",
            "new_item": false,
            "path": MARKETPLACE.STORE.OPTION.ITEM.LIST,
            "permissions": [Permission.marketplace.store.product.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Demandes d'achats ",
            "new_item": false,
            "path": MARKETPLACE.STORE.PURCHASE.LIST,
            "permissions": [Permission.marketplace.store.purchase.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Commandes reçus",
            "new_item": false,
            "path": MARKETPLACE.STORE.ORDER.LIST,
            "permissions": [Permission.marketplace.store.order.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }
      ],
   },
   {
      "path": MARKETPLACE.SHOP,
      "menu_title": "MicroCap Shop",
      "menu_icon": "zmdi zmdi-shopping-cart",
      "new_item": false,
      "child_routes": null,
      "profiles": null,
      "permissions": [Permission.marketplace.shop.name],
   },
   {
      "path": MARKETPLACE.ORDERS,
      "menu_title": "Mes commandes",
      "menu_icon": "zmdi zmdi-assignment-o",
      "new_item": false,
      "child_routes": null,
      "profiles": null,
      "permissions": [Permission.marketplace.order.name],
   },
   {
      "menu_title": "Services bancaires",
      "menu_icon": "zmdi zmdi-balance",
      "new_item": false,
      "permissions": null,
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Intermediaire bancaire",
            "new_item": false,
            "path": BANK.PARTY.SELF,
            "permissions": null,
            "profiles": ['PROVIDER_INTERMEDIARY', 'PROVIDER_AGENT'],
            "child_routes": null
         },
         {
            "menu_title": "MMS",
            "new_item": false,
            "path": BANK.MMS.SELF,
            "permissions": null,
            "profiles": ['PROVIDER_INTERMEDIARY'],
            "child_routes": null
         },
         {
            "menu_title": "Administration bancaire",
            "new_item": false,
            "path": BANK.ADMIN.SELF,
            "permissions": null,
            "profiles": ['OPERATOR'],
            "child_routes": null
         },
         {
            "menu_title": "Souscription",
            "new_item": false,
            "path": BANK.SUBSCRIPTION.SELF,
            "permissions": [Permission.bank.counter.subscription.name],
            "profiles": ['PROVIDER_COUNTER'],
            "child_routes": null
         },
         {
            "menu_title": "Assistance",
            "new_item": false,
            "path": BANK.OPERATION.ASSISTANCE,
            "permissions": [Permission.bank.counter.operation.name],
            "profiles": ['PROVIDER_COUNTER'],
            "child_routes": null
         },
         {
            "menu_title": "Opération",
            "new_item": false,
            "path": BANK.OPERATION.CREATE,
            "permissions": [Permission.bank.counter.operation.name],
            "profiles": ['PROVIDER_COUNTER'],
            "child_routes": null
         },
         {
            "menu_title": "Opérations",
            "new_item": false,
            "path": BANK.OPERATION.BANK.SELF,
            "permissions": [Permission.bank.bank.operation.name],
            "profiles": ['OPERATOR'],
            "child_routes": null
         },
         {
            "menu_title": "Objet chèque",
            "new_item": false,
            "path": BANK.CHEQUE_TOPIC.LIST,
            "permissions": [Permission.bank.bank.operation.name],
            "profiles": ['OPERATOR'],
            "child_routes": null
         },
         {
            "menu_title": "Opérations",
            "new_item": false,
            "path": BANK.OPERATION.LIST,
            "permissions": [Permission.bank.agent.operation.name, Permission.bank.intermediary.operation.name],
            "profiles": ['PROVIDER_AGENT', 'PROVIDER_INTERMEDIARY'],
            "child_routes": null
         },
         {
            "menu_title": "Recharges",
            "new_item": false,
            "path": BANK.CHARGE.AGENT.SELF,
            "permissions": [Permission.bank.agent.charge.name],
            "profiles": ['PROVIDER_AGENT'],
            "child_routes": null
         },
         {
            "menu_title": "Recharges",
            "new_item": false,
            "path": BANK.CHARGE.INTERMEDIARY.REQUEST.SELF,
            "permissions": [Permission.bank.intermediary.charge.name],
            "profiles": ['PROVIDER_INTERMEDIARY'],
            "child_routes": null
         },
         {
            "menu_title": "Monnaie de service",
            "new_item": false,
            "path": BANK.MONEY.SELF,
            "permissions": [Permission.bank.intermediary.money.name],
            "profiles": ['PROVIDER_INTERMEDIARY'],
            "child_routes": null
         },
         {
            "menu_title": "Comptes",
            "new_item": false,
            "path": FUNDING.ACCOUNT.LIST,
            "permissions": [Permission.bank.intermediary.account.name],
            "profiles": ['PROVIDER_INTERMEDIARY'],
            "child_routes": null
         },
         {
            "menu_title": "Mes clients",
            "new_item": false,
            "path": BANK.CLIENT.LIST,
            "permissions": [Permission.bank.bank.client.name],
            "profiles": ['OPERATOR'],
            "child_routes": null
         }
      ],
   },
   {
      "menu_title": "Configurations",
      "menu_icon": "zmdi zmdi-wrench",
      "new_item": false,
      "permissions": [
         Permission.setting.unit.name,
         Permission.setting.unit.name,
      ],
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Unités",
            "new_item": false,
            "path": SETTING.UNIT.LIST,
            "permissions": [Permission.setting.unit.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Objectifs",
            "new_item": false,
            "path": MIPRO.ADMINISTRATION.GOAL.SELF,
            "permissions": [Permission.setting.unit.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Dossiers utilisateurs",
            "new_item": false,
            "path": SETTING.USER_FILE.LIST,
            "permissions": [Permission.setting.unit.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Blog",
            "new_item": false,
            "path": SETTING.ARTICLE.LIST,
            "permissions": [Permission.setting.blog.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Thème Blog",
            "new_item": false,
            "path": SETTING.ARTICLE.TOPIC.LIST,
            "permissions": [Permission.setting.blog.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Evènements",
            "new_item": false,
            "path": SETTING.EVENT.LIST,
            "permissions": [Permission.setting.event.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Nos pionniers",
            "new_item": false,
            "path": SETTING.PIONIER.LIST,
            "permissions": [Permission.setting.pionier.name],
            "profiles": ['GROUP'],
            "child_routes": null
         },
         {
            "menu_title": "Nos agents",
            "new_item": false,
            "path": SETTING.AGENT.LIST,
            "permissions": [Permission.setting.pionier.name],
            "profiles": ['GROUP'],
            "child_routes": null
         }
      ],
   },
];