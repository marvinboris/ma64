import { Moment } from "moment";
import { Dispatch } from "redux";

export function updateObject<T extends object, V extends object>(
    oldObject: T,
    updatedProps: V
) {
    return {
        ...oldObject,
        ...updatedProps,
    };
}

export const parseMoment = (item: Moment) => item.format("YYYY-MM-DD HH:mm:ss");

export const convertDate = (date: string | number | Date) => {
    if (!date) return null;

    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });

    return dtf
        .formatToParts(d)
        .map(({ value }) => value)
        .join("");
};

const twoDigits = (number: number) => (number < 10 ? "0" + number : number);

export const convertTime = (date: string | number | Date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    return `${twoDigits(hours)} : ${twoDigits(minutes)} : ${twoDigits(
        seconds
    )}`;
};

export const timeFromTimestamp = (timestamp: number) => {
    const totalSeconds = Math.round(timestamp);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;

    return `${twoDigits(hours)} : ${twoDigits(minutes)} : ${twoDigits(
        seconds
    )}`;
};

export const checkValidity = (
    value = "",
    rules: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        isEmail?: boolean;
        isNumeric?: boolean;
    }
) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== "" && isValid;

    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    if (rules.isEmail) {
        const pattern =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
};

export const htmlEntities = (str: string | null) => {
    if (str === null || str === "") return "";
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
};

export const manageResource =
    (
        root: string,
        actions: { success: Function; start: Function; fail: Function },
        type: string,
        ...params: unknown[]
    ) =>
    async (dispatch: Dispatch, getState: Function) => {
        dispatch(actions.start());
        const { role } = getState().auth;

        try {
            const token = localStorage.getItem("token") as string;
            let url, page, show, search;

            switch (type) {
                case "index":
                    page = (params[0] || 1) as number | string;
                    show = (params[1] || 10) as number | string;
                    search = (params[2] || "") as string;
                    url = `${
                        window.PREFIX + role
                    }/${root}?page=${page}&show=${show}&search=${search}`;
                    let res = await fetch(url, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    let resData = await res.json();
                    return dispatch(actions.success(resData));

                case "info":
                    url = `${window.PREFIX + role}/${root}/info`;
                    res = await fetch(url, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    resData = await res.json();
                    return dispatch(actions.success(resData));

                case "show":
                    let id = params[0];
                    url = `${window.PREFIX + role}/${root}/${id}`;
                    res = await fetch(url, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    resData = await res.json();
                    return dispatch(actions.success(resData));

                case "post":
                    let pageElt = document.getElementById("table-page") as
                        | HTMLInputElement
                        | undefined;
                    let showElt = document.getElementById("table-show") as
                        | HTMLInputElement
                        | undefined;
                    let searchElt = document.getElementById("table-search") as
                        | HTMLInputElement
                        | undefined;
                    if (pageElt) page = pageElt.value;
                    if (showElt) show = showElt.value;
                    if (searchElt) search = searchElt.value;

                    let data = params[0] as HTMLFormElement;
                    let form = new FormData(data);
                    url = `${
                        window.PREFIX + role
                    }/${root}?page=${page}&show=${show}&search=${search}`;
                    res = await fetch(url, {
                        method: "POST",
                        body: form,
                        headers: {
                            Authorization: token,
                        },
                    });
                    resData = await res.json();
                    if (res.status === 422)
                        throw new Error(
                            Object.values(resData.errors).join("\n")
                        );
                    else if (res.status !== 200 && res.status !== 201)
                        throw new Error(resData.error.message);
                    return dispatch(actions.success(resData));

                case "patch":
                    pageElt = document.getElementById("table-page") as
                        | HTMLInputElement
                        | undefined;
                    showElt = document.getElementById("table-show") as
                        | HTMLInputElement
                        | undefined;
                    searchElt = document.getElementById("table-search") as
                        | HTMLInputElement
                        | undefined;
                    if (pageElt) page = pageElt.value;
                    if (showElt) show = showElt.value;
                    if (searchElt) search = searchElt.value;

                    id = params[0];
                    data = params[1] as HTMLFormElement;
                    form = new FormData(data);
                    url = `${
                        window.PREFIX + role
                    }/${root}/${id}?page=${page}&show=${show}&search=${search}`;
                    res = await fetch(url, {
                        method: "POST",
                        body: form,
                        headers: {
                            Authorization: token,
                        },
                    });
                    resData = await res.json();
                    if (res.status === 422)
                        throw new Error(
                            Object.values(resData.errors).join("\n")
                        );
                    return dispatch(actions.success(resData));

                case "delete":
                    pageElt = document.getElementById("table-page") as
                        | HTMLInputElement
                        | undefined;
                    showElt = document.getElementById("table-show") as
                        | HTMLInputElement
                        | undefined;
                    searchElt = document.getElementById("table-search") as
                        | HTMLInputElement
                        | undefined;
                    if (pageElt) page = pageElt.value;
                    if (showElt) show = showElt.value;
                    if (searchElt) search = searchElt.value;

                    id = params[0];
                    url = `${
                        window.PREFIX + role
                    }/${root}/${id}?page=${page}&show=${show}&search=${search}`;
                    res = await fetch(url, {
                        method: "DELETE",
                        headers: {
                            Authorization: token,
                        },
                    });
                    resData = await res.json();
                    if (res.status === 422)
                        throw new Error(
                            Object.values(resData.errors).join("\n")
                        );
                    return dispatch(actions.success(resData));
            }
        } catch (error) {
            console.log(error);
            dispatch(actions.fail(error as Error));
        }
    };
