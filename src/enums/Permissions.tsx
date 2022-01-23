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
        }
    };

}
