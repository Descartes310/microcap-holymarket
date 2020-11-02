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
                "types": [UserType.MANAGER, UserType.EXPLOITANT]
            },
        },
        network: {
            viewMenu: {
                "name": "nav-links/network/view-menu",
                "types": [UserType.MANAGER, UserType.EXPLOITANT]
            },
            childLinks: {
                configuration: {
                    viewMenu: {
                        "name": "nav-links/network/configuration/view-menu",
                        "types": [UserType.EXPLOITANT]
                    }
                },
                coverage: {
                    viewMenu: {
                        "name": "nav-links/network/coverage/view-menu",
                        "types": [UserType.EXPLOITANT]
                    }
                },
            }
        },
        users: {
            viewMenu: {
                "name": "nav-links/users/view-menu",
                "types": [UserType.MANAGER, UserType.EXPLOITANT]
            },
            childLinks: {
                users: {
                    viewMenu: {
                        "name": "nav-links/users/users/view-menu",
                        "types": [UserType.MANAGER, UserType.EXPLOITANT]
                    }
                },
                userProfile: {
                    viewMenu: {
                        "name": "nav-links/users/user-profile/view-menu",
                        "types": [UserType.MANAGER, UserType.EXPLOITANT]
                    }
                },
            }
        },
        products: {
            viewMenu: {
                "name": "nav-links/products/view-menu",
                "types": [UserType.EXPLOITANT]
            },
            childLinks: {
                catalogProducts: {
                    viewMenu: {
                        "name": "nav-links/users/catalog-products/view-menu",
                        "types": [UserType.EXPLOITANT]
                    }
                },
                catalogSales: {
                    viewMenu: {
                        "name": "nav-links/users/catalog-sales/view-menu",
                        "types": [UserType.EXPLOITANT]
                    }
                },
                catalogDistribution: {
                    viewMenu: {
                        "name": "nav-links/users/catalog-distribution/view-menu",
                        "types": [UserType.EXPLOITANT]
                    }
                },
            }
        },
    };

    static branch = {
        viewList: {
            "name": "branch/view-list",
            "types": [UserType.MANAGER]
        },
        viewOne: {
            "name": "branch/view-one",
            "types": [UserType.MANAGER]
        },
        createOne: {
            "name": "branch/create-one",
            "types": [UserType.MANAGER]
        },
        createMany: {
            "name": "branch/create-many",
            "types": [UserType.MANAGER]
        },
        editOne: {
            "name": "branch/edit-one",
            "types": [UserType.EXPLOITANT]
        },
        editMany: {
            "name": "branch/edit-many",
            "types": [UserType.EXPLOITANT]
        },
        deleteOne: {
            "name": "branch/delete-one",
            "types": [UserType.EXPLOITANT]
        },
        deleteMany: {
            "name": "branch/delete-many",
            "types": [UserType.EXPLOITANT]
        },
    };

    static users = {
        viewList: {
            "name": "users/view-list",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        viewOne: {
            "name": "users/create-one",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        search: {
            "name": "users/search",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        createOne: {
            "name": "users/create-one",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        createMany: {
            "name": "users/create-one",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        editOne: {
            "name": "users/edit-one",
            "types": [UserType.EXPLOITANT]
        },
        editMany: {
            "name": "users/edit-many",
            "types": [UserType.EXPLOITANT]
        },
        deleteOne: {
            "name": "users/delete-one",
            "types": [UserType.EXPLOITANT]
        },
        deleteMany: {
            "name": "users/delete-many",
            "types": [UserType.EXPLOITANT]
        },
    };

    static userProfile = {
        viewList: {
            "name": "user-profile/view-list",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        viewOne: {
            "name": "user-profile/create-one",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        search: {
            "name": "user-profile/search",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        createOne: {
            "name": "user-profile/create-one",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        createMany: {
            "name": "user-profile/create-one",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        editOne: {
            "name": "user-profile/edit-one",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        editMany: {
            "name": "user-profile/edit-many",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        deleteOne: {
            "name": "user-profile/delete-one",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
        deleteMany: {
            "name": "user-profile/delete-many",
            "types": [UserType.MANAGER, UserType.EXPLOITANT]
        },
    };

    static Network = {
        configuration: {
            start: {
                "name": "network/configuration/start",
                "types": [UserType.EXPLOITANT]
            },
            close: {
                "name": "network/configuration/close",
                "types": [UserType.EXPLOITANT]
            },
            networkProfileType: {
                viewList: {
                    "name": "network/configuration/network-profile-type/view-list",
                    "types": [UserType.EXPLOITANT]
                },
                viewOne: {
                    "name": "network/configuration/network-profile-type/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                search: {
                    "name": "network/configuration/network-profile-type/search",
                    "types": [UserType.EXPLOITANT]
                },
                createOne: {
                    "name": "network/configuration/network-profile-type/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                createMany: {
                    "name": "network/configuration/network-profile-type/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                editOne: {
                    "name": "network/configuration/network-profile-type/edit-one",
                    "types": [UserType.EXPLOITANT]
                },
                editMany: {
                    "name": "network/configuration/network-profile-type/edit-many",
                    "types": [UserType.EXPLOITANT]
                },
                deleteOne: {
                    "name": "network/configuration/network-profile-type/delete-one",
                    "types": [UserType.EXPLOITANT]
                },
                deleteMany: {
                    "name": "network/configuration/network-profile-type/delete-many",
                    "types": [UserType.EXPLOITANT]
                },
            },
            networkProfile: {
                viewList: {
                    "name": "network/configuration/network-profile/view-list",
                    "types": [UserType.EXPLOITANT]
                },
                viewOne: {
                    "name": "network/configuration/network-profile/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                search: {
                    "name": "network/configuration/network-profile/search",
                    "types": [UserType.EXPLOITANT]
                },
                createOne: {
                    "name": "network/configuration/network-profile/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                createMany: {
                    "name": "network/configuration/network-profile/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                editOne: {
                    "name": "network/configuration/network-profile/edit-one",
                    "types": [UserType.EXPLOITANT]
                },
                editMany: {
                    "name": "network/configuration/network-profile/edit-many",
                    "types": [UserType.EXPLOITANT]
                },
                deleteOne: {
                    "name": "network/configuration/network-profile/delete-one",
                    "types": [UserType.EXPLOITANT]
                },
                deleteMany: {
                    "name": "network/configuration/network-profile/delete-many",
                    "types": [UserType.EXPLOITANT]
                },
            },
            networkPrimary: {
                partnershipType: {
                    viewList: {
                        "name": "network/configuration/network-primary/partnership/view-list",
                        "types": [UserType.EXPLOITANT]
                    },
                    viewOne: {
                        "name": "network/configuration/network-primary/partnership/create-one",
                        "types": [UserType.EXPLOITANT]
                    },
                    search: {
                        "name": "network/configuration/network-primary/partnership/search",
                        "types": [UserType.EXPLOITANT]
                    },
                    createOne: {
                        "name": "network/configuration/network-primary/partnership/create-one",
                        "types": [UserType.EXPLOITANT]
                    },
                    createMany: {
                        "name": "network/configuration/network-primary/partnership/create-one",
                        "types": [UserType.EXPLOITANT]
                    },
                    editOne: {
                        "name": "network/configuration/network-primary/partnership/edit-one",
                        "types": [UserType.EXPLOITANT]
                    },
                    editMany: {
                        "name": "network/configuration/network-primary/partnership/edit-many",
                        "types": [UserType.EXPLOITANT]
                    },
                    deleteOne: {
                        "name": "network/configuration/network-primary/partnership/delete-one",
                        "types": [UserType.EXPLOITANT]
                    },
                    deleteMany: {
                        "name": "network/configuration/network-primary/partnership/delete-many",
                        "types": [UserType.EXPLOITANT]
                    },
                },
                viewList: {
                    "name": "network/configuration/network-primary/view-list",
                    "types": [UserType.EXPLOITANT]
                },
                viewOne: {
                    "name": "network/configuration/network-primary/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                search: {
                    "name": "network/configuration/network-primary/search",
                    "types": [UserType.EXPLOITANT]
                },
                createOne: {
                    "name": "network/configuration/network-primary/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                createMany: {
                    "name": "network/configuration/network-primary/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                editOne: {
                    "name": "network/configuration/network-primary/edit-one",
                    "types": [UserType.EXPLOITANT]
                },
                editMany: {
                    "name": "network/configuration/network-primary/edit-many",
                    "types": [UserType.EXPLOITANT]
                },
                deleteOne: {
                    "name": "network/configuration/network-primary/delete-one",
                    "types": [UserType.EXPLOITANT]
                },
                deleteMany: {
                    "name": "network/configuration/network-primary/delete-many",
                    "types": [UserType.EXPLOITANT]
                },
            },
            assistantConfiguration: {
                viewList: {
                    "name": "network/configuration/assistant-configuration/view-list",
                    "types": [UserType.EXPLOITANT]
                },
                viewOne: {
                    "name": "network/configuration/assistant-configuration/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                search: {
                    "name": "network/configuration/assistant-configuration/search",
                    "types": [UserType.EXPLOITANT]
                },
                createOne: {
                    "name": "network/configuration/assistant-configuration/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                createMany: {
                    "name": "network/configuration/assistant-configuration/create-one",
                    "types": [UserType.EXPLOITANT]
                },
                editOne: {
                    "name": "network/configuration/assistant-configuration/edit-one",
                    "types": [UserType.EXPLOITANT]
                },
                editMany: {
                    "name": "network/configuration/assistant-configuration/edit-many",
                    "types": [UserType.EXPLOITANT]
                },
                deleteOne: {
                    "name": "network/configuration/assistant-configuration/delete-one",
                    "types": [UserType.EXPLOITANT]
                },
                deleteMany: {
                    "name": "network/configuration/assistant-configuration/delete-many",
                    "types": [UserType.EXPLOITANT]
                },
            },
        }
    };
}
