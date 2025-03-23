

export type AdminStats = {
    userStats: {
        distribution: {
            role: string;
            _count: {
                _all: number;
            };
        }[];
        totalUsers: number;
    };
    submissionMetrics: {
        total: number;
        corrected: number;
        pending: number;
    };
    classroomMetrics: {
        total: number;
        totalStudents: number;
        totalSubjects: number;
        averageStudentsPerClass: number;
        averageSubjectsPerClass: number;
    };
    subjectDistribution: {
        evaluationType: string;
        _count: {
            _all: number;
        };
    }[];
    recentActivities: {
        type: 'submission' | 'correction';
        id: number;
        timestamp: Date;
        firstName: string;
        lastName: string;
        title: string;
        status: string;
    }[];
    systemHealth: {
        activeClassrooms: number;
        submissionRate: number;
        correctionRate: number;
    };
};

export interface DashboardData {
    stats: AdminStats;
}