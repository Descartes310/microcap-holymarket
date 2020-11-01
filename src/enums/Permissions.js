/**
 * This file list all permissions handled by the app
 *
 */
import BaseEnum from "Enums/BaseEnum";
import UserType from "Enums/UserType";

export default class Permission extends BaseEnum {
    static navLinks = {
        branch: {
            viewMenu: {
                "name": "nav-links/branch/view-menu",
                "type": [UserType.MANAGER, UserType.EXPLOITANT]
            },
        },
        network: {
            viewMenu: {
                "name": "nav-links/network/view-menu",
                "type": [UserType.MANAGER, UserType.EXPLOITANT]
            },
            childLinks: {
                configuration: {
                    viewMenu: {
                        "name": "nav-links/network/configuration/view-menu",
                        "type": [UserType.EXPLOITANT]
                    }
                },
                coverage: {
                    viewMenu: {
                        "name": "nav-links/network/coverage/view-menu",
                        "type": [UserType.EXPLOITANT]
                    }
                },
            }
        },
        users: {
            viewMenu: {
                "name": "nav-links/users/view-menu",
                "type": [UserType.MANAGER, UserType.EXPLOITANT]
            },
            childLinks: {
                users: {
                    viewMenu: {
                        "name": "nav-links/users/users/view-menu",
                        "type": [UserType.MANAGER, UserType.EXPLOITANT]
                    }
                },
                userProfile: {
                    viewMenu: {
                        "name": "nav-links/users/user-profile/view-menu",
                        "type": [UserType.MANAGER, UserType.EXPLOITANT]
                    }
                },
            }
        },
        products: {
            viewMenu: {
                "name": "nav-links/products/view-menu",
                "type": [UserType.EXPLOITANT]
            },
            childLinks: {
                catalogProducts: {
                    viewMenu: {
                        "name": "nav-links/users/catalog-products/view-menu",
                        "type": [UserType.EXPLOITANT]
                    }
                },
                catalogSales: {
                    viewMenu: {
                        "name": "nav-links/users/catalog-sales/view-menu",
                        "type": [UserType.EXPLOITANT]
                    }
                },
                catalogDistribution: {
                    viewMenu: {
                        "name": "nav-links/users/catalog-distribution/view-menu",
                        "type": [UserType.EXPLOITANT]
                    }
                },
            }
        },
    };

    static branch = {
        list: {
            "name": "branch/list",
            "type": [UserType.MANAGER]
        },
        viewOne: {
            "name": "branch/view-one",
            "type": [UserType.MANAGER]
        },
        editOne: {
            "name": "branch/edit-one",
            "type": [UserType.MANAGER]
        },
        deleteOne: {
            "name": "branch/delete-one",
            "type": [UserType.MANAGER]
        },
        createOne: {
            "name": "branch/create-one",
            "type": [UserType.MANAGER]
        },
    };

    static users = {
        viewList: {
            "name": "users/view-list",
            "type": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        viewOne: {
            "name": "users/create-one",
            "type": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        search: {
            "name": "users/search",
            "type": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        createOne: {
            "name": "users/create-one",
            "type": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        createMany: {
            "name": "users/create-one",
            "type": [UserType.MANAGER, UserType.EXPLOITANT]
        },
    };

    static userProfile = {
    };
}
