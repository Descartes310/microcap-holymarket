// sidebar nav links
import {
   USERS,
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
      "menu_title": "Profile",
      "menu_icon": "zmdi zmdi-flag",
      "path": USERS.USERS_PROFILE.DISPLAY_PROFILE
   },
   {
      "menu_title": "Comptes utilisateurs",
      "menu_icon": "zmdi zmdi-accounts",
      "new_item": false,
      "permissions": null,
      "profiles": null,
      "child_routes": [
         {
            "menu_title": "Comptes",
            "new_item": false,
            "path": USER_ACCOUNT_TYPE.ACCOUNT.LIST,
            "permissions": null,
            "profiles": null,
         },
         {
            "menu_title": "Roles comptes",
            "new_item": false,
            "path": USER_ACCOUNT_TYPE.ROLE.LIST,
            "permissions": null,
            "profiles": null,
         },
         {
            "menu_title": "Types de comptes",
            "new_item": false,
            "path": USER_ACCOUNT_TYPE.TYPE.LIST,
            "permissions": null,
            "profiles": null,
         },
         {
            "menu_title": "Catégories de comptes",
            "new_item": false,
            "path": USER_ACCOUNT_TYPE.CATEGORY.LIST,
            "permissions": null,
            "profiles": null,
         },
      ],
   },
];