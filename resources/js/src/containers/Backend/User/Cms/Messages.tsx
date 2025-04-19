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
import MESSAGES from "../../../../components/Content/Messages";
import { Cms } from "@/src/types/content";
import { Language } from "@/src/types/language";
import { recursiveDeepness } from "../../Admin/Cms/types";
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
    messages,
    language,
}: {
    messages: Cms["messages"] | undefined;
    language: Language;
}) => {
    const [activeTab, setActiveTab] = useState(`${language.abbr}-auth`);
    const [value, setValue] = useState(messages);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value !== activeTab) setActiveTab(value);
    };

    const options = Object.keys(messages || {})
        .sort((a, b) => a.localeCompare(b))
        .map((key) => {
            const id = `${language.abbr}-${key}`;

            return (
                <option key={id} className="text-capitalize" value={id}>
                    {key.split("_").join(" ")}
                </option>
            );
        });

    const prefix = `${language.abbr}[messages]`;

    const authItem = MESSAGES["auth"];
    const authName = `${prefix}[auth]`;
    const authValue = value?.["auth"];
    const authDeepness = ["auth"];
    const auth = recursiveDeepness(value, setValue)(
        authItem,
        authName,
        authValue,
        authDeepness,
        [
            {
                regex: `${authName}[admin][not_found]`,
                action: () => (
                    <Col xs={12}>
                        <h4>Admin</h4>
                    </Col>
                ),
            },
            {
                regex: `${authName}[user][inactive]`,
                action: () => (
                    <>
                        <Separator />
                        <Col xs={12}>
                            <h4>User</h4>
                        </Col>
                    </>
                ),
            },
        ]
    );

    const keys = Object.keys(MESSAGES).filter((key) => !["auth"].includes(key));
    const resourceTabPanes = keys.map((item) => {
        const currentItem = MESSAGES[item as keyof typeof MESSAGES];
        const currentName = `${prefix}[${item}]`;
        const currentValue = value?.[item as keyof typeof value];
        const currentDeepness = [item];
        const current = recursiveDeepness(value, setValue)(
            currentItem,
            currentName,
            currentValue,
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
                        activeTab === language.abbr + "-auth" ? "" : "d-none"
                    }`}
                >
                    {auth}
                </Row>

                {resourceTabPanes}
            </div>
        </Row>
    );
};

class Messages extends Component<BackendAdminPage> {
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
                        cms: { messages },
                    },
                },
            } = nextProps;
            return updateObject(prevState, { ...messages });
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
                                cms: { title, messages },
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

            const mainContent = languages.map((language) => (
                <div
                    key={Math.random()}
                    className={language.abbr === abbr ? "" : "d-none"}
                >
                    <Languages
                        language={language}
                        messages={
                            cms?.pages[language.abbr as keyof typeof cms.pages]
                                .messages
                        }
                    />
                </div>
            ));

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
                    <Breadcrumb main={messages} icon={icon} />
                    <SpecialTitle>{title}</SpecialTitle>
                    <Subtitle>{messages}</Subtitle>
                </TitleWrapper>
                <div className="p-4 pb-0">
                    {redirect}
                    {errors}
                    <Row>
                        <Form
                            onSubmit={this.submitHandler}
                            icon={icon}
                            title={messages}
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
        dispatch(patchCms("messages", data) as unknown as UnknownAction),
    reset: () => dispatch(resetCms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
