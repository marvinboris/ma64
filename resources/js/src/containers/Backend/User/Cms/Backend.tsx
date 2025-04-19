import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

// Components
import Breadcrumb from "../../../../components/Backend/UI/Breadcrumb/Breadcrumb";
import SpecialTitle from "../../../../components/UI/Titles/SpecialTitle/SpecialTitle";
import Subtitle from "../../../../components/UI/Titles/Subtitle/Subtitle";
import Error from "../../../../components/Error/Error";
import CustomSpinner from "../../../../components/UI/CustomSpinner/CustomSpinner";
import Form from "../../../../components/Backend/UI/Form/Form";
import FormButton from "../../../../components/UI/Button/BetweenButton/BetweenButton";
import TitleWrapper from "../../../../components/Backend/UI/TitleWrapper";
import Feedback from "../../../../components/Feedback/Feedback";

import {
    getCms,
    patchCms,
    resetCms,
} from "../../../../store/actions/backend/cms";
import { updateObject } from "../../../../shared/utility";
import BACKEND from "../../../../components/Content/Backend";
import { Cms } from "@/src/types/content";
import { Language } from "@/src/types/language";
import { RecursiveDeepness, recursiveDeepness } from "../../Admin/Cms/types";
import { BackendAdminPage } from "../../types";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";
import { Navigate } from "react-router";

type ComponentState = {
    app_name?: string;
};

const icon = "wrench";

const Separator = ({ sm = false }) => (
    <Col xs={12} className={`mb-${sm ? 2 : 3}`} />
);

const Languages = ({
    backend,
    language,
}: {
    backend:
        | Partial<Omit<Cms["backend"], "pages"> & Cms["backend"]["pages"]>
        | undefined;
    language: Language;
}) => {
    const [activeTab, setActiveTab] = useState(`${language.abbr}-header`);
    const [value, setValue] = useState(backend);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value !== activeTab) setActiveTab(value);
    };

    const options = Object.keys(backend || {})
        .sort((a, b) => a.localeCompare(b))
        .map((key) => {
            const id = `${language.abbr}-${key}`;

            return (
                <option key={id} className="text-capitalize" value={id}>
                    {key.split("_").join(" ")}
                </option>
            );
        });

    const prefix = `${language.abbr}[backend]`;

    const headerItem = BACKEND["header"];
    const headerName = `${prefix}[header]`;
    const headerValue = value?.["header"];
    const headerDeepness = ["header"];
    const header = recursiveDeepness(value, setValue)(
        headerItem,
        headerName,
        headerValue,
        headerDeepness,
        [],
        [
            {
                regex: `${headerName}[no_notification]`,
                action: () => <Separator />,
            },
            {
                regex: `${headerName}[sure_logout]`,
                action: () => <Separator />,
            },
        ]
    );

    const footerItem = BACKEND["footer"];
    const footerName = `${prefix}[footer]`;
    const footerValue = value?.["footer"];
    const footerDeepness = ["footer"];
    const footer = recursiveDeepness(value, setValue)(
        footerItem,
        footerName,
        footerValue,
        footerDeepness
    );

    const sidebarItem = BACKEND["sidebar"];
    const sidebarName = `${prefix}[sidebar]`;
    const sidebarValue = value?.["sidebar"];
    const sidebarDeepness = ["sidebar"];
    const sidebar = recursiveDeepness(value, setValue)(
        sidebarItem,
        sidebarName,
        sidebarValue as RecursiveDeepness["paramValue"],
        sidebarDeepness,
        [
            {
                regex: `${sidebarName}[admin]`,
                action: () => (
                    <Col xs={12}>
                        <h4>Roles</h4>
                    </Col>
                ),
            },
            {
                regex: `${sidebarName}[menu][dashboard]`,
                action: () => (
                    <Col xs={12}>
                        <h4>Menu</h4>
                    </Col>
                ),
            },
            {
                regex: `${sidebarName}[menu][.+][title]`,
                action: (item: string) => (
                    <Col xs={12}>
                        <h5>{item}</h5>
                    </Col>
                ),
            },
        ],
        [{ regex: `${sidebarName}[user]`, action: () => <Separator /> }]
    );

    const dashboardItem = BACKEND.pages["dashboard"];
    const dashboardName = `${prefix}[pages][dashboard]`;
    const dashboardValue = value?.["dashboard"];
    const dashboardDeepness = ["dashboard"];
    const dashboard = recursiveDeepness(value, setValue)(
        dashboardItem,
        dashboardName,
        dashboardValue as RecursiveDeepness["paramValue"],
        dashboardDeepness,
        [
            {
                regex: `${dashboardName}[admin][title]`,
                action: () => (
                    <Col xs={12}>
                        <h4>Admin</h4>
                    </Col>
                ),
            },
            {
                regex: `${dashboardName}[.+][blocks][total_issues][title]`,
                action: () => (
                    <Col xs={12}>
                        <h5>Blocks</h5>
                    </Col>
                ),
            },
            {
                regex: `${dashboardName}[user][title]`,
                action: () => (
                    <>
                        <Separator />
                        <Col xs={12}>
                            <h4>User</h4>
                        </Col>
                    </>
                ),
            },
        ],
        [
            {
                regex: `${dashboardName}[.+][subtitle]`,
                action: () => <Separator sm />,
            },
        ]
    );

    const cmsItem = BACKEND.pages["cms"];
    const cmsName = `${prefix}[pages][cms]`;
    const cmsValue = value?.["cms"];
    const cmsDeepness = ["cms"];
    const cms = recursiveDeepness(value, setValue)(
        cmsItem,
        cmsName,
        cmsValue,
        cmsDeepness,
        [],
        [
            {
                regex: `${cmsName}[auth]`,
                action: () => (
                    <>
                        <Separator />
                        <Col xs={12}>
                            <h4>Form</h4>
                        </Col>
                    </>
                ),
            },
        ]
    );

    const keys = Object.keys(BACKEND.pages).filter(
        (key) => !["dashboard", "cms"].includes(key)
    );
    const resourceTabPanes = keys.map((item) => {
        const currentItem = BACKEND.pages[item as keyof typeof BACKEND.pages];
        const currentName = `${prefix}[pages][${item}]`;
        const currentValue = value?.[item as keyof typeof value];
        const currentDeepness = [item];
        const current = recursiveDeepness(value, setValue)(
            currentItem,
            currentName,
            currentValue as RecursiveDeepness["paramValue"],
            currentDeepness
        );

        const id = language.abbr + "-" + item;

        return (
            <Row
                key={language.abbr + "-" + currentName}
                className={`pt-4 ${activeTab === id ? "" : "d-none"}`}
            >
                {current}
            </Row>
        );
    });

    return (
        <Row key={"Languages-" + language.abbr}>
            <div className="col-md-6 col-xl-4 col-xxl-3">
                <FormGroup>
                    <Input
                        type="select"
                        name="tab"
                        onChange={inputChangeHandler}
                        className="text-capitalize"
                        value={activeTab}
                    >
                        {options}
                    </Input>
                </FormGroup>
            </div>

            <div className="col-12">
                <Row
                    className={`pt-4 ${
                        activeTab === language.abbr + "-header" ? "" : "d-none"
                    }`}
                >
                    {header}
                </Row>

                <Row
                    className={`pt-4 ${
                        activeTab === language.abbr + "-footer" ? "" : "d-none"
                    }`}
                >
                    {footer}
                </Row>

                <Row
                    className={`pt-4 ${
                        activeTab === language.abbr + "-sidebar" ? "" : "d-none"
                    }`}
                >
                    {sidebar}
                </Row>

                <Row
                    className={`pt-4 ${
                        activeTab === language.abbr + "-dashboard"
                            ? ""
                            : "d-none"
                    }`}
                >
                    {dashboard}
                </Row>

                <Row
                    className={`pt-4 ${
                        activeTab === language.abbr + "-cms" ? "" : "d-none"
                    }`}
                >
                    {cms}
                </Row>

                {resourceTabPanes}
            </div>
        </Row>
    );
};

class Backend extends Component<BackendAdminPage> {
    state = {
        abbr: import.meta.env.VITE_DEFAULT_LANG,
    };

    static getDerivedStateFromProps(
        nextProps: BackendAdminPage,
        prevState: ComponentState
    ) {
        if (nextProps.backend?.cms?.cms && prevState.app_name === "") {
            const {
                backend: {
                    cms: {
                        cms: { backend },
                    },
                },
            } = nextProps;
            return updateObject(prevState, { ...backend });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset?.();
        this.props.get?.();
    }

    componentWillUnmount() {
        this.props.reset?.();
    }

    submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await this.props.patch?.(e.target);
    };

    inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    };

    render() {
        if (
            !this.props.content?.cms ||
            !this.props.backend?.cms ||
            !this.props.auth?.data
        )
            return null;

        let {
            content: {
                cms: {
                    pages: {
                        components: {
                            form: { save },
                        },
                        backend: {
                            pages: {
                                cms: { title, backend },
                            },
                        },
                    },
                },
            },
            backend: {
                cms: { loading, error, message, cms, languages },
            },
            auth: {
                data: {
                    role: { features },
                },
            },
        } = this.props;
        const { abbr } = this.state;
        let content = null;
        let errors = null;

        const feature = features.find((f) => f.prefix === "cms");
        const redirect = !(
            feature && JSON.parse(feature.permissions).includes("u")
        ) && <Navigate to="/user/dashboard" />;

        if (loading)
            content = (
                <Col xs={12}>
                    <CustomSpinner />
                </Col>
            );
        else {
            errors = (
                <>
                    <Error err={error} />
                </>
            );

            if (!languages) languages = [];
            const languagesOptions = languages.map((language) => (
                <option
                    key={Math.random() + JSON.stringify(language)}
                    value={language.abbr}
                >
                    {language.name}
                </option>
            ));

            const mainContent = languages.map((language) => {
                const data =
                    cms?.pages[language.abbr as keyof typeof cms.pages].backend;
                const backend = {
                    header: data?.header,
                    footer: data?.footer,
                    sidebar: data?.sidebar,
                    ...data?.pages,
                };

                return (
                    <div
                        key={Math.random()}
                        className={language.abbr === abbr ? "" : "d-none"}
                    >
                        <Languages backend={backend} language={language} />
                    </div>
                );
            });

            content = (
                <Col lg={9}>
                    <Feedback message={message} />
                    <Row>
                        <input
                            type="hidden"
                            name="_method"
                            defaultValue="PATCH"
                        />

                        <div className="col-md-6 col-xl-4 col-xxl-3">
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="abbr"
                                    onChange={this.inputChangeHandler}
                                    value={abbr}
                                >
                                    {languagesOptions}
                                </Input>
                            </FormGroup>
                        </div>

                        <div className="col-12">{mainContent}</div>

                        <div className="col-12">
                            <FormButton color="green" icon="save">
                                {save}
                            </FormButton>
                        </div>
                    </Row>
                </Col>
            );
        }

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={backend} icon={icon} />
                    <SpecialTitle>{title}</SpecialTitle>
                    <Subtitle>{backend}</Subtitle>
                </TitleWrapper>
                <div className="p-4 pb-0">
                    {redirect}
                    {errors}
                    <Row>
                        <Form
                            onSubmit={this.submitHandler}
                            icon={icon}
                            title={backend}
                            link="/admin/cms"
                            innerClassName="row justify-content-center"
                        >
                            {content}
                        </Form>
                    </Row>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    get: () => dispatch(getCms() as unknown as UnknownAction),
    patch: (data: object) =>
        dispatch(patchCms("backend", data) as unknown as UnknownAction),
    reset: () => dispatch(resetCms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backend);
