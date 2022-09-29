export const GET_NOTIFICATIONS = 'api/notifications';
export const COUNT_NOTIFICATIONS = 'api/notifications/counts';
export const MARK_AS_READ = (id) => `api/notifications/${id}`;
export const MARK_AS_TREATED = (id) => `api/notifications/${id}/treated`;