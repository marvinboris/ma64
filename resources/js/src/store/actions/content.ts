import { Dispatch } from "redux";
import * as actionTypes from "./actionTypes";

const contentStart = () => ({ type: actionTypes.CONTENT_START });
const contentSuccess = (data: object) => ({
    type: actionTypes.CONTENT_SUCCESS,
    ...data,
});
const contentFail = (error: Error) => ({
    type: actionTypes.CONTENT_FAIL,
    error,
});
export const getContent =
    () => async (dispatch: Dispatch, getState: Function) => {
        dispatch(contentStart());

        try {
            let lang = localStorage.getItem("lang");
            if (!lang || lang === "undefined") {
                lang = import.meta.env.VITE_DEFAULT_LANG as string;
                localStorage.setItem("lang", lang);
            }
            const res = await fetch(`${window.PREFIX}content/${lang}`);
            const resData = await res.json();

            let { currencies, countries } = getState().content;

            if (!currencies || !countries) {
                const currenciesRes = await fetch(
                    window.CORS +
                        encodeURIComponent(
                            "https://raw.githubusercontent.com/mhs/world-currencies/master/currencies.json"
                        ),
                    { method: "GET", mode: "cors" }
                );
                currencies = await currenciesRes.json();

                const phoneRes = await fetch(
                    window.CORS +
                        encodeURIComponent("http://country.io/phone.json"),
                    { method: "GET", mode: "cors" }
                );
                const namesRes = await fetch(
                    window.CORS +
                        encodeURIComponent("http://country.io/names.json"),
                    { method: "GET", mode: "cors" }
                );

                let phone = await phoneRes.json();
                let names = await namesRes.json();

                currencies = JSON.parse(currencies.contents);
                phone = JSON.parse(phone.contents);
                names = JSON.parse(names.contents);

                countries = Object.keys(phone).map((key) => ({
                    country: key,
                    code: phone[key],
                    name: names[key],
                }));

                currencies = (currencies as { name: string }[]).sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                countries = (countries as { name: string }[]).sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                return dispatch(
                    contentSuccess({ ...resData, currencies, countries })
                );
            }

            dispatch(contentSuccess(resData));
        } catch (error) {
            console.log(error);
            dispatch(contentFail(error as Error));
        }
    };

export const setLanguage = (id: string) => async (dispatch: Dispatch) => {
    dispatch(contentStart());

    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${window.PREFIX}content/language/${id}`, {
            headers: {
                Authorization: token as string,
            },
        });
        const resData = await res.json();
        localStorage.setItem("lang", resData.language.abbr);
        dispatch(contentSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(contentFail(error as Error));
    }
};
