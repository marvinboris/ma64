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
import FRONTEND from "../../../../components/Content/Frontend";
import { Cms } from "@/src/types/content";
import { Language } from "@/src/types/language";
import { RecursiveDeepness, recursiveDeepness } from "../../Admin/Cms/types";
import { BackendAdminPage } from "../../types";
import { Navigate } from "react-router";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";

const icon = "wrench";

type ComponentState = {
    app_name?: string;
};

const Separator = ({ sm = false }) => (
    <Col xs={12} className={`mb-${sm ? 2 : 3}`} />
);

const Languages = ({
    frontend,
    language,
}: {
    frontend:
        | Partial<Omit<Cms["frontend"], "pages"> & Cms["frontend"]["pages"]>
        | undefined;
    language: Language;
}) => {
    const [activeTab, setActiveTab] = useState(`${language.abbr}-header`);
    const [value, setValue] = useState(frontend);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value !== activeTab) setActiveTab(value);
    };

    const fileUpload = (id: string) => document.getElementById(id)?.click();

    const options = Object.keys(frontend || {})
        .sort((a, b) => a.localeCompare(b))
        .map((key) => {
            const id = `${language.abbr}-${key}`;

            return (
                <option key={id} className="text-capitalize" value={id}>
                    {key.split("_").join(" ")}
                </option>
            );
        });

    const prefix = `${language.abbr}[frontend]`;

    const headerItem = FRONTEND["header"];
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
                regex: `${headerName}[top][facebook_likes][title]`,
                action: () => <Separator />,
            },
        ]
    );

    const footerItem = FRONTEND["footer"];
    const footerName = `${prefix}[footer]`;
    const footerValue = value?.["footer"];
    const footerDeepness = ["footer"];
    const footer = recursiveDeepness(value, setValue)(
        footerItem as unknown as RecursiveDeepness["paramItem"],
        footerName,
        footerValue as RecursiveDeepness["paramValue"],
        footerDeepness,
        [
            {
                regex: `${footerName}[top][address][title]`,
                action: () => (
                    <Col xs={12}>
                        <h3 className="col-12">Top</h3>
                        <Separator sm />
                        <h4 className="col-12">Adress</h4>
                    </Col>
                ),
            },
            {
                regex: `${footerName}[top][phone_email][title]`,
                action: () => (
                    <Col xs={12}>
                        <Separator />
                        <h4 className="col-12">Phone & e-mail</h4>
                    </Col>
                ),
            },
            {
                regex: `${footerName}[top][newsletter][title]`,
                action: () => (
                    <Col xs={12}>
                        <Separator />
                        <h4 className="col-12">Newsletter</h4>
                    </Col>
                ),
            },
            {
                regex: `${footerName}[top][partners][title]`,
                action: () => (
                    <Col xs={12}>
                        <Separator />
                        <h4 className="col-12">Partners</h4>
                    </Col>
                ),
            },
            {
                regex: `${footerName}[top][facebook_likes][title]`,
                action: () => (
                    <Col xs={12}>
                        <Separator />
                        <h4 className="col-12">Facebook likes</h4>
                    </Col>
                ),
            },
            {
                regex: `${footerName}[bottom][all_rights_reserved]`,
                action: () => (
                    <Col xs={12}>
                        <Separator />
                        <h3 className="col-12">Bottom</h3>
                    </Col>
                ),
            },
            {
                regex: `${footerName}[bottom][social_networks][facebook]`,
                action: () => (
                    <Col xs={12}>
                        <Separator />
                        <h4 className="col-12">Social networks links</h4>
                    </Col>
                ),
            },
        ]
    );

    const homeItem = FRONTEND.pages["home"];
    const homeName = `${prefix}[pages][home]`;
    const homeValue = value?.["home"];
    const homeDeepness = ["home"];
    const home = recursiveDeepness(value, setValue)(
        homeItem as unknown as RecursiveDeepness["paramItem"],
        homeName,
        homeValue as RecursiveDeepness["paramValue"],
        homeDeepness,
        [
            {
                regex: `${homeName}[banner][carousel][0][src]`,
                action: () => (
                    <>
                        <h3 className="col-12">Banner</h3>
                        <Separator sm />
                        <h4 className="col-12">Carousel</h4>
                    </>
                ),
            },
            {
                regex: `${homeName}[banner][body][title]`,
                action: () => (
                    <>
                        <Separator />
                        <h4 className="col-12">Body</h4>
                    </>
                ),
            },
            {
                regex: `${homeName}[features][from_air]`,
                action: () => (
                    <>
                        <Separator />
                        <h4 className="col-12">Features</h4>
                    </>
                ),
            },
            {
                regex: `${homeName}[qualification_assistance][title]`,
                action: () => (
                    <>
                        <Separator />
                        <h4 className="col-12">Qualification assistance</h4>
                    </>
                ),
            },
            {
                regex: `${homeName}[products][title]`,
                action: () => (
                    <>
                        <Separator />
                        <h4 className="col-12">Our products</h4>
                    </>
                ),
            },
            {
                regex: `${homeName}[squares][education_kits][title]`,
                action: () => (
                    <>
                        <Separator />
                        <h4 className="col-12">Squares</h4>
                    </>
                ),
            },
            {
                regex: `${homeName}[blog][title]`,
                action: () => (
                    <>
                        <Separator />
                        <h4 className="col-12">Our blog</h4>
                    </>
                ),
            },
        ]
    );

    const keys = Object.keys(FRONTEND.pages).filter(
        (key) => !["home"].includes(key)
    );
    const resourceTabPanes = keys.map((item) => {
        const currentItem = FRONTEND.pages[item as keyof typeof FRONTEND.pages];
        const currentName = `${prefix}[pages][${item}]`;
        const currentValue = value?.[item as keyof typeof value];
        const currentDeepness = [item];
        const current = recursiveDeepness(value, setValue)(
            currentItem as unknown as RecursiveDeepness["paramItem"],
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
                        activeTab === language.abbr + "-home" ? "" : "d-none"
                    }`}
                >
                    {home}
                </Row>

                {resourceTabPanes}
            </div>
        </Row>
    );
};

class Frontend extends Component<BackendAdminPage> {
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
                        cms: { frontend },
                    },
                },
            } = nextProps;
            return updateObject(prevState, { ...frontend });
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
                                cms: { title, frontend },
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
                    cms?.pages[language.abbr as keyof typeof cms.pages]
                        .frontend;
                const frontend = {
                    header: data?.header,
                    footer: data?.footer,
                    ...data?.pages,
                };

                return (
                    <div
                        key={Math.random()}
                        className={language.abbr === abbr ? "" : "d-none"}
                    >
                        <Languages frontend={frontend} language={language} />
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
                    <Breadcrumb main={frontend} icon={icon} />
                    <SpecialTitle>{title}</SpecialTitle>
                    <Subtitle>{frontend}</Subtitle>
                </TitleWrapper>
                <div className="p-4 pb-0">
                    {redirect}
                    {errors}
                    <Row>
                        <Form
                            onSubmit={this.submitHandler}
                            icon={icon}
                            title={frontend}
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
        dispatch(patchCms("frontend", data) as unknown as UnknownAction),
    reset: () => dispatch(resetCms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Frontend);
