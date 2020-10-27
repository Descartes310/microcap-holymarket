import _ from 'lodash';
import store from '../store';
import { Ability, detectSubjectType } from '@casl/ability';
import defineAbilityFor from './defineAbilityFor';

function subjectName(subject) {
    /*if (!item || typeof item === "string") {
        return item;
    }
    return item.__type || item.__modelName;*/

    if (subject && typeof subject === 'object' && subject.__typename) {
        return subject.__typename;
    }

    return detectSubjectType(subject);
}

const ability = new Ability([], { subjectName });

let currentAuth;
store.subscribe(() => {
    const prevAuth = currentAuth;
    const state = store.getState();
    currentAuth = state.authUser.data;
    if (!_.isEqual(prevAuth, currentAuth)) {
        ability.update(defineAbilityFor(currentAuth));
    }
});

export default ability;
