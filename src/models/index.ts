
import UserModel from './User';

export type User = UserModel;

export interface Permission {
    id: number;
    access: string;
    description: string;
    label: string;
    name: string;
    type: string;
}

export interface Profile {
    id: number;
    label: string;
    name: string;
    description: string;
    permissions: Permission[]
    reference: string;
    type: string;
}
