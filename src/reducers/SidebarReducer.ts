/**
 * Sidebar Reducers
 */
import update from 'react-addons-update';

// nav links
import allMenus from 'Components/Sidebar/NavLinks';
import { SidebarActions } from 'Actions/AppSettingsActions';

type SidebarState = {
	sidebarMenus: any[],
	agencySidebarMenu: any[]
}

const INIT_STATE = {
	sidebarMenus: allMenus.map(e => ({...e, open: false})),
	agencySidebarMenu: [],
};

export default (state: SidebarState = INIT_STATE, action: SidebarActions): SidebarState => {
	switch (action.type) {
		case 'TOGGLE_MENU':
			const index = state.sidebarMenus.findIndex(e => (
				e.menu_title === action.payload.menu.menu_title &&
				e.menu_icon === action.payload.menu.menu_icon &&
				e.path === action.payload.menu.path
			));
			var obj = state.sidebarMenus;
			for (let i = 0; i < obj.length; i++) {
				const element = obj[i];
				if (element.open) {
					return {
						...state,
						sidebarMenus: state.sidebarMenus.map((e,j) => {
							if (j === i) return {...e, open: false};
							if (j === index) return {...e, open: !action.payload.menu.open};
							return e;
						})
					};
				}
			}
			return {
				...state,
				sidebarMenus: state.sidebarMenus.map((e,i) => i === index ? {...e, open: !action.payload.menu.open} : e)
			};
		case 'AGENCY_TOGGLE_MENU':
			let agencyMenuIndex = state.agencySidebarMenu[action.payload.stateCategory].indexOf(action.payload.menu);
			for (var id in state.agencySidebarMenu) {
				var object = state.agencySidebarMenu[id];
				for (let i = 0; i < object.length; i++) {
					const element = object[i];
					if (element.open) {
						if (id === action.payload.stateCategory) {
							return update(state, {
								agencySidebarMenu: {
									[id]: {
										[i]: {
											open: { $set: false }
										},
										[agencyMenuIndex]: {
											open: { $set: !action.payload.menu.open }
										}
									}
								}
							});
						} else {
							return update(state, {
								agencySidebarMenu: {
									[id]: {
										[i]: {
											open: { $set: false }
										}
									},
									[action.payload.stateCategory]: {
										[agencyMenuIndex]: {
											open: { $set: !action.payload.menu.open }
										}
									}
								}
							});
						}
					}
				}
			}
			return update(state, {
				agencySidebarMenu: {
					[action.payload.stateCategory]: {
						[agencyMenuIndex]: {
							open: { $set: !action.payload.menu.open }
						}
					}
				}
			});
		default:
			return { ...state };
	}
}
