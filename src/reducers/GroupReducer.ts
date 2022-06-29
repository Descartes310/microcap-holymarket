
const INIT_STATE = {
	community: null
};

export default (state = INIT_STATE, action: any) => {

    switch (action.type) {
		case 'ON_SELECT_COMMUNITY':
            return { ...state, community: action.payload }
		default:
			return { ...state };
	}

}