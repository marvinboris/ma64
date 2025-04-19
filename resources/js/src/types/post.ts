export type Post = {
    id: string;
    link: string;
    photo: string;
    title: Record<string, string>;
    body: Record<string, string>;
    author: string;
    post_category: {
        name: Record<string, string>;
    };
    created_at: string;
};
