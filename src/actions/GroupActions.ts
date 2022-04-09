import { ON_SELECT_COMMUNITY} from './types';

export const onSelectCommunity = (community) => ({
    type: ON_SELECT_COMMUNITY,
    payload: community
}) as const;