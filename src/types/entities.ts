import {

    Code2,
    Terminal,
    Database,
    FileCode2,
    Binary,
    Blocks
} from "lucide-react";

export enum Role {
    PROFESSOR = "PROFESSOR",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
}




export const evaluationTypeConfig = {
    POO_JAVA: {
        label: "POO Java",
        shortLabel: "Java",
        icon: Code2,
        color: "text-red-500",
        description: "Programmation Orientée Objet en Java"
    },
    C_LANGUAGE: {
        label: "Langage C",
        shortLabel: "C",
        icon: Terminal,
        color: "text-blue-500",
        description: "Programmation en C"
    },
    SQL: {
        label: "SQL",
        shortLabel: "SQL",
        icon: Database,
        color: "text-green-500",
        description: "Bases de données SQL"
    },
    PYTHON: {
        label: "Python",
        shortLabel: "Python",
        icon: FileCode2,
        color: "text-yellow-500",
        description: "Programmation Python"
    },
    ALGORITHMS: {
        label: "Algorithmes",
        shortLabel: "Algo",
        icon: Binary,
        color: "text-purple-500",
        description: "Conception d'algorithmes"
    },
    DATA_STRUCTURES: {
        label: "Structures de données",
        shortLabel: "Struct",
        icon: Blocks,
        color: "text-orange-500",
        description: "Structures de données avancées"
    }
};






export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    subjects?: any[];
    submissions?: any[];
    classroom?: Classroom;
    classroomId?: number;
    teaching?: Classroom[];
}



export type Classroom = {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    students?: User[];
    teacher?: User | null;
    teacherId?: number | null;
}

