import { Aos } from "aos";
import { AxiosInstance } from "axios";
import _ from "lodash";
import Popper from "popper.js";

declare global {
    interface Window {
        axios: AxiosInstance;
        _: typeof _;
        Popper: typeof Popper;
        $: JQueryStatic;
        jQuery: JQueryStatic;
        CORS: string;
        PREFIX: string;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
        AOS: Aos;
    }

    interface JQuery {
        countUp(): JQuery;
        starRating(options?: object): JQuery;
    }
}
