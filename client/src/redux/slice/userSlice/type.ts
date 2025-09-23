export interface InitialState {
    loading: boolean;
    error: null | Success;
    success: null | Success;
    user: User | null
}

interface Success {
    color: string;
    status: string;
}

export interface User {
    id: string;
    name: string;
    emial: string;
    isAdmin: boolean;
}

export interface FormDataOne {
    email: string;
    newPassword: string;
    confirmPassword?: string;
}