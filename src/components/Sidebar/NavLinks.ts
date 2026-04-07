// sidebar nav links
import Permission from "Enums/Permissions";
import {
   MARKETPLACE
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
   hiddenProfiles: string[] | null; // null means no need profile to access
   permissions: string[] | null; // null for no permissions need to access
   permissions_and?: boolean   // if true, then the user must have all the listed permissions
}

export default [
   
   {
      "path": MARKETPLACE.SHOP.CLASSIC,
      "menu_title": "MicroCap Store",
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
      "permissions": [Permission.marketplace.shop.name],
   }
];