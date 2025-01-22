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
        },
        assistance: {
            "name": "USER_ASSISTANCE_PRIVILEGE"
        },
        profile: {
            "name": "USER_PROFILE"
        },
        access: {
            "name": "USER_PROFILE_ACCESS"
        },
        contact: {
            "name": "USER_PROFILE_CONTACTS"
        },    
        fiche: {
            "name": "USER_PROFILE_FICHE"
        },
        blog: {
            "name": "USER_PROFILE_BLOG"
        },
        agency: {
            "name": "USER_PROFILE_AGENCY"
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
        structure: {
            "name": "GROUP_STRUCTURE"
        },
        fundingOption: {
            "name": "FUNDING_OPTIONS"
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
            project: {
                "name": "GROUP_ADMIN_PROJECT"
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
        blog: {
            "name": "SETTING_BLOG_PRIVILEGE"
        },
        event: {
            "name": "SETTING_EVENT_PRIVILEGE"
        },
        pionier: {
            "name": "SETTING_PIONIER_PRIVILEGE"
        },
        messageModel: {
            "name": "SETTING_MESSAGE_MODEL"
        },
        immatriculation: {
            "name": "SETTING_IMMATRICULATION"
        },
        userGoal: {
            "name": "SETTING_USER_GOAL"
        },
        userFolder: {
            "name": "SETTING_USER_FOLDER"
        },
        pageFlows: {
            "name": "PAGE_FLOW_MANAGEMENT"
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
            markets: {
                "name": "MARKETPLACE_MARKETS"
            },
        },
        store: {
            product: {
                "name": "MARKETPLACE_PRODUCT_PRIVILEGE"
            },
            distributions: {
                "name": "MARKETPLACE_DISTRIBUTION_PRIVILEGE"
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
        financialStructure: {
            "name": "FINANCIAL_STRUCTURE"
        },
        edit: {
            "name": "FINANCIAL_STRUCTURE"
        },
        setting: {
            "name": "FINANCIAL_STRUCTURE"
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
            },
            center: {
                "name": "COVERAGE_CENTER_PRIVILEGE"
            },
            user: {
                "name": "COVERAGE_USER_PRIVILEGE"
            }
        }
    };

    static broker = {
        agency: {
            "name": "BROKER_AGENCY_PRIVILEGE"
        },
        cashdesk: {
            "name": "BROKER_CASHDESK_PRIVILEGE"
        },
        account: {
            "name": "BROKER_ACCOUNT_PRIVILEGE"
        }
    };

    static bank = {
        agent: {
            agent: {
                "name": "CASHMANAGEMENT_AGENT_AGENTS"
            },
            charge: {
                "name": "CASHMANAGEMENT_AGENT_CHARGES"
            }
        },
        intermediary: {
            coverage: {
                "name": "CASHMANAGEMENT_INTER_COVERAGE"
            },
            prestation: {
                "name": "CASHMANAGEMENT_INTER_PRESTATIONS"
            },
            money: {
                "name": "CASHMANAGEMENT_INTER_MONEYS"
            }
        },
        bank: {
            account: {
                "name": "CASHMANAGEMENT_BANK_ACCOUNTS"
            },
            client: {
                "name": "CASHMANAGEMENT_BANK_CLIENTS"
            }
        },
        counter: {
            subscription: {
                "name": "CASHMANAGEMENT_COUNTER_SUBSCRIPTIONS"
            }
        }
    };

    static microcap360 = {
        network: {
            "name": "NETWORK_ACCESS"
        },
        wallets: {
            "name": "ACCOUNT_ACCESS"
        },
        mymicrocap: {
            "name": "MY_MICROCAP_ACCESS"
        },
        ideas: {
            "name": "PERSONNAL_CREATION_ACCESS"
        },
        broadcast: {
            "name": "BROADCAST"
        },   
        broadcastAccess: {
            "name": "BROADCAST_ACCESS"
        }
    };

    static bourse = {
        projects: {
            "name": "FUNDING_PROJECT"
        },
        request: {
            "name": "ENDORSMENT_REQUEST"
        },
        offer: {
            "name": "ENDORSMENT_OFFER"
        }
    };

    static funding = {
        placements: {
            "name": "FUNDING_PLACEMENT_PRIVILEGE"
        },
        bigdeals: {
            "name": "FUNDING_BIGDEAL_PRIVILEGE"
        },
        investments: {
            "name": "FUNDING_INVESTMENT_PRIVILEGE"
        }
    };

    static supervision = {
        user: {
            "name": "SUPERVISION_USER"
        },
        partner: {
            "name": "SUPERVISION_PARTNER"
        },
        member: {
            "name": "SUPERVISION_MEMBER"
        },
        project: {
            "name": "SUPERVISION_PROJECT"
        },
        operation: {
            "name": "SUPERVISION_OPERATION"
        },
    };

    static assets = {
        all: {
            "name": "GET_ASSETS"
        },
        mine: {
            "name": "GET_MY_ASSETS"
        },
        create: {
            "name": "CREATE_ASSETS"
        },
        createSub: {
            "name": "CREATE_SUB_ASSETS"
        },
        seriesType: {
            "name": "MANAGE_SERIES_TYPES"
        },
    };

    static general = {
        counter: {
            "name": "COUNTER_MANAGEMENT"
        },
        operation: {
            "name": "MANAGE_OPERATION"
        },
        charge: {
            "name": "CHARGE_MANAGEMENT"
        },
        confirmOperation: {
            "name": "CONFIRM_OPERATION_PRIVILEGE"
        },
        operationAgencyValidation: {
            "name": "OPERATION_AGENCY_VALIDATION_PRIVILEGE"
        },
        operationCounterValidation: {
            "name": "OPERATION_COUNTER_VALIDATION_PRIVILEGE"
        },
        account: {
            "name": "ACCOUNT_MANAGEMENT"
        },
        assist: {
            createAccount: {
                "name": "ASSIST_CREATE_USER_PRIVILEGE"
            }
        }
    }

}
