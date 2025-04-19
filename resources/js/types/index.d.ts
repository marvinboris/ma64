import { Notification } from "@/src/types/notification";

export interface User {
    id: string;
    name: string;
    photo: string;
    role: {
        name: string;
        features: {
            prefix: string;
            permissions: string;
        }[];
    };
    email: string;
    email_verified_at: string;
    notifications?: Notification[];
    created_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
