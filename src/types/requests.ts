import { Role } from './entities';

export type CreateUserDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: Role;
    classroomId?: number;
}

export type UpdateUserDto = Partial<CreateUserDto>;



export type CreateClassroomDto = {
    name: string;
    description?: string;
}

export type UpdateClassroomDto = Partial<CreateClassroomDto>; 