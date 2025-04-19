export type Notification = {
    id: number;
    read_at?: string;
    type: string;
    data: {
        name?: string;
        days?: number;
        amount?: number;
        method?: { name: string };
    };
};
