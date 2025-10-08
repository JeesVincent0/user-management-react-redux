export interface InitialState {
    loading: boolean;
    error: null | string;
    user: User | null;
    isEditing: boolean;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    address: Address;
    isAdmin: boolean;
    image?: string;

}

interface Address {
    houseName?: string;
    area?: string;
    city?: string;
    pin?: string;
    phone?: string;
}

export interface FormDataOne {
    name?: string;
    email: string;
    newPassword?: string;
    confirmPassword?: string;
    password?: string;
}

export interface ApiResponse {
    status: string;
    data?: any;
    error?: string;
    user?: User;
}