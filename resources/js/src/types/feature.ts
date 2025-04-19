export type FeaturePermission = "c" | "u" | "d";

export type Feature = {
    id: string;
    name: string;
    prefix: string;
    permissions: FeaturePermission[];
    created_at: string;
};
