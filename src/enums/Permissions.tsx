/**
 * This file list all permissions handled by the app
 *
 */
import BaseEnum from "Enums/BaseEnum";

export default class Permission extends BaseEnum {
    static accountType = {
        type: {
            "name": "USER_ACCOUNT_TYPE_PRIVILEGE"
        },
        category: {
            "name": "USER_ACCOUNT_CATEGORY_PRIVILEGE"
        },
        role: {
            "name": "USER_ACCOUNT_ROLE_PRIVILEGE"
        }
    };

    static group = {
        details: {
            "name": "GROUP_DETAILS_PRIVILEGE"
        },
        member: {
            "name": "GROUP_MEMBERS_PRIVILEGE"
        },
        type: {
            "name": "GROUP_TYPE_PRIVILEGE"
        },
        role: {
            "name": "GROUP_ROLE_PRIVILEGE"
        },
        category: {
            "name": "GROUP_CATEGORY_PRIVILEGE"
        },
        space: {
            "name": "COMMUNITY_SPACE_PRIVILEGE"
        },
        unconventionated: {
            "name": "GROUP_CREATE_UNVONVENTIONATED_PRIVILEGE"
        },
        admin: {
            member: {
                "name": "GROUP_ADMIN_MEMBER_PRIVILEGE"
            },
            role: {
                "name": "GROUP_ADMIN_MEMBER_ROLE_PRIVILEGE"
            },
            request: {
                "name": "GROUP_ADMIN_REQUEST_PRIVILEGE"
            },
            setting: {
                "name": "GROUP_ADMIN_SETTING_PRIVILEGE"
            },
            post: {
                "name": "GROUP_ADMIN_POST_PRIVELEGE"
            },
        }
    };

    static setting = {
        unit: {
            "name": "SETTING_UNIT_PRIVILEGE"
        },
        userFileType: {
            "name": "SETTING_USER_FILE_TYPE_PRIVILEGE"
        },
    };

    static marketplace = {
        admin: {
            model: {
                "name": "MARKETPLACE_PRODUCT_MODELE_PRIVILEGE"
            },
            category: {
                "name": "MARKETPLACE_PRODUCT_CATEGORY_PRIVILEGE"
            },
            catalog: {
                "name": "MARKETPLACE_PRODUCT_CATALOG_PRIVILEGE"
            },
            offer: {
                "name": "MARKETPLACE_COMMERCIAL_OFFER_PRIVILEGE"
            },
        },
        store: {
            product: {
                "name": "MARKETPLACE_PRODUCT_PRIVILEGE"
            },
            order: {
                "name": "MARKETPLACE_PRODUCT_ORDER_PRIVILEGE"
            },
            purchase: {
                "name": "MARKETPLACE_PURCHASE_PRIVILEGE"
            }
        },
        shop: {
            "name": "MARKETPLACE_ACCESS_PRILEGE"
        },
        order: {
            "name": "MARKETPLACE_MY_ORDER_PRIVILEGE"
        }
    };

    static project = {
        admin: {
            item: {
                "name": "PROJECT_ITEMS_PRIVILEGE"
            },
            initialization: {
                "name": "PROJECT_INITIALIZATION_PRIVILEGE"
            },
            post: {
                "name": "PROJECT_POST_PRIVILEGE"
            }
        },
        project: {
            "name": "PROJECT_MINE_PRIVILEGE"
        },
        item: {
            "name": "PROJECT_PERSONNAL_ITEM_PRIVILEGE"
        },
    };

    static funding = {
        account: {
            "name": "FUNDING_ACCOUNT_PRIVILEGE"
        },
    };

    static network = {
        coverage: {
            territory: {
                "name": "COVERAGE_TERRITORY_PRIVILEGE"
            },
            contract: {
                "name": "COVERAGE_CONTRACT_PRIVILEGE"
            },
            partner: {
                "name": "COVERAGE_PARTNER_PRIVILEGE"
            }
        }
    };

    static broker = {
        agency: {
            "name": "BROKER_AGENCY_PRIVILEGE"
        },
        counter: {
            "name": "BROKER_COUNTER_PRIVILEGE"
        },
        cashdesk: {
            "name": "BROKER_CASHDESK_PRIVILEGE"
        }
    };

}
