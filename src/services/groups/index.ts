import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class GroupService {

    static getGroupCategories(): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_CATEGORIES);
    }

    static createGroupCategory(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_GROUP_CATEGORY, data);
    }

    static updateGroupCategory(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_GROUP_CATEGORY(reference), data);
    }

    static findGroupCategory(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_CATEGORY(reference));
    }

    static getGroupTypes(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_TYPES, data);
    }

    static createGroupType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_GROUP_TYPE, data);
    }

    static updateGroupType(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_GROUP_TYPE(reference), data);
    }

    static findGroupType(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_GROUP_TYPE(reference));
    }

    static addMemberToRole(data: any): Promise<any> {
        return makeRequest('post', Routes.ADD_MEMBER_TO_GROUP, data);
    }

    static getGroupMembers(data: any = {}): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_MEMBERS, data);
    }

    static getGroupDetails(ref): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_DETAILS(ref));
    }

    static updateGroupDetails(data, config): Promise<any> {
        return makeRequest('put', Routes.UPDATE_GROUP_DETAILS, data, config);
    }

    static makeGroupRequest(data): Promise<any> {
        return makeRequest('post', Routes.SEND_GROUP_REQUEST, data);
    }

    static respondToGroupResquest(id, status): Promise<any> {
        return makeRequest('put', Routes.RESPOND_REQUEST_FROM_GROUP(id), { status });
    }

    static sendExternalGroupInvitation(data): Promise<any> {
        if(!data.reference)
            delete data.reference;
        if(!data.email)
            delete data.email;
        return makeRequest('get', Routes.SEND_EXTERNAL_GROUP_INVITATION, data);
    }

    static getCommunityDatas(data): Promise<any> {
        return makeRequest('get', Routes.GET_COMMUNITY_DATAS, data);
    }

    static setGroupTypeAsDefault(id: number, status: boolean): Promise<any> {
        return makeRequest('put', Routes.SET_GROUP_TYPE_AS_DEFAULT(id), {status});
    }

    static createUnconventionnatedGroup(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_UNCONVENTIONATED_GROUP, data);
    }

    static getGroupPosts(group_reference): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_POSTS, {group_reference});
    }

    static getGroupPostMotivations(id): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_POST_MOTIVATIONS, {group_post_id: id});
    }

    static createGroupPost(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_GROUP_POST, data);
    }

    static createGroupPostMotivation(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_GROUP_POST_MOTIVATION, data);
    }

    static addFileToGroupMember(id: number, data: any, config: any): Promise<any> {
        return makeRequest('put', Routes.ADD_FILE_TO_MEMBER(id), data, config);
    }

    static findGroupMember(id: number): Promise<any> {
        return makeRequest('get', Routes.FIND_GROUP_MEMBER(id));
    }

    static getBlogTopics(isParent = false): Promise<any> {
        return makeRequest('get', Routes.GET_BLOG_TOPICS, {parent: isParent});
    }

    static createBlogTopic(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_BLOG_TOPIC, data);
    }

    static updateBlogTopic(id, data): Promise<any> {
        return makeRequest('put', Routes.UPDATE_BLOG_TOPIC(id), data);
    }

    static findBlogTopic(id): Promise<any> {
        return makeRequest('get', Routes.FIND_BLOG_TOPIC(id));
    }

    static getAllArticles(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_ARTICLES);
    }

    static createArticle(data, config): Promise<any> {
        return makeRequest('post', Routes.CREATE_ARTICLE, data, config);
    }

    static getActiveArticles(data): Promise<any> {
        return makeRequest('get', Routes.GET_ACTIVE_ARTICLES, data);
    }

    static getArticleDetails(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_ARTICLE_DETAILS(id));
    }

    static getJuridicTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_JURIDIC_TYPES);
    }

    static updateArticleStatus(id: number): Promise<any> {
        return makeRequest('put', Routes.UPDATE_ARTICLE_STATUS(id));
    }

    static changeCategoryToJuridic(reference: string): Promise<any> {
        return makeRequest('put', Routes.CHANGE_CATEGORY_TO_JURIDIC(reference));
    }
}