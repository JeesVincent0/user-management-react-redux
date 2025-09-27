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
    name?: string;
    email: string;
    newPassword?: string;
    confirmPassword?: string;
    password?: string;
}

export interface ApiResponse {
    status: string;
    data? : any;
    error?: string;
    user?: User;
}