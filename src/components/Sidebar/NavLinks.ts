// sidebar nav links
import Permission from "Enums/Permissions";
import {
   GROUP,
   PROFILE,
   USER_ACCOUNT_TYPE
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
      "menu_title": "Details du groupe",
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
            "menu_title": "Roles groupes",
            "new_item": false,
            "path": GROUP.ROLE.LIST,
            "permissions": [Permission.group.role.name],
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
      ],
      "profiles": ['GROUP'],
      "child_routes": [
         {
            "menu_title": "Utilisateurs",
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
            "menu_title": "Invitations/Demandes",
            "new_item": false,
            "path": GROUP.ADMINISTRATION.REQUEST.SELF,
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
         [Permission.group.space.name]
      ],
      "profiles": null,
      "child_routes": [
         {
            "menu_title": "Communautés",
            "new_item": false,
            "path": GROUP.COMMUNITY.SPACE.MINE,
            "permissions": [Permission.group.space.name],
            "profiles": null,
            "child_routes": null
         }
      ],
   },
];