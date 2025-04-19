import { State } from "@/src/store";
import { Location } from "react-router";

export type BackendPage = State & {
    location: Location;
    get?: (
        page?: number | string,
        show?: number | string,
        search?: string
    ) => void;
    reset: () => void;
    delete: (id: string) => void;
};

export type BackendAdminPage = State & {
    location?: Location;
    edit?: Function | boolean;
    patch?: Function;
    post?: Function;
    match?: { params: Record<string, string> };
    info?: () => void;
    show?: (id: string) => void;
    get?: (
        page?: number | string,
        show?: number | string,
        search?: string
    ) => void;
    reset?: () => void;
    delete?: (id: string) => void;
    history?: { push: Function };
};
