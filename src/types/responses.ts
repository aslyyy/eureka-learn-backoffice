import { User, Classroom } from './entities';

export type AuthResponse = {
    accessToken: string;
    user: User;
}

export type PaginatedResponse<T> = {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type UserResponse = User & {
    classroom?: Classroom;
}



export type ClassroomResponse = Classroom & {
    students: User[];
} 