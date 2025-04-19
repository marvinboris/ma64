import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";

// Components
import Breadcrumb from "../../../../components/Backend/UI/Breadcrumb/Breadcrumb";
import SpecialTitle from "../../../../components/UI/Titles/SpecialTitle/SpecialTitle";
import Subtitle from "../../../../components/UI/Titles/Subtitle/Subtitle";
import Error from "../../../../components/Error/Error";
import CustomSpinner from "../../../../components/UI/CustomSpinner/CustomSpinner";
import Form from "../../../../components/Backend/UI/Form/Form";
import FormButton from "../../../../components/UI/Button/BetweenButton/BetweenButton";
import Feedback from "../../../../components/Feedback/Feedback";

import {
    getCms,
    patchCms,
    resetCms,
} from "../../../../store/actions/backend/cms";
import { updateObject } from "../../../../shared/utility";
import AUTH from "../../../../components/Content/Auth";
import { State } from "@/src/store";
import { BackendAdminPage } from "../../types";
import { Dispatch, UnknownAction } from "redux";
import { Language } from "@/src/types/language";
import { Cms } from "@/src/types/content";
import { recursiveDeepness } from "./types";

type Props = BackendAdminPage;

type ComponentState = {
    activeTab: string;
    app_name?: string;
};

const SubNavLinks = ({
    auth,
    language,
}: {
    auth: Cms["pages"]["fr"]["auth"] | undefined;
    language: Language;
}) => {
    const [activeTab, setActiveTab] = useState(language.abbr + "-footer");
    const [value, setValue] = useState(auth);

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const navItems = Object.keys(auth || {}).map((key) => {
        const id = `${language.abbr}-${key}`;

        return (
            <NavItem key={id}>
                <NavLink
                    className={activeTab === id ? "active" : undefined}
                    onClick={() => toggle(id)}
                >
                    <span className="text-capitalize">{key}</span>
                </NavLink>
            </NavItem>
        );
    });

    const prefix = `${language.abbr}[auth]`;

    const footerItem = AUTH["footer"];
    const footerName = `${prefix}[footer]`;
    const footerValue = value?.["footer"];
    const footerDeepness = ["footer"];
    const footer = recursiveDeepness(value, setValue)(
        footerItem,
        footerName,
        footerValue,
        footerDeepness
    );

    const userItem = AUTH["user"];
    const userName = `${prefix}[user]`;
    const userValue = value?.["user"];
    const userDeepness = ["user"];
    const user = recursiveDeepness(value, setValue)(
        userItem,
        userName,
        userValue,
        userDeepness
    );

    const adminItem = AUTH["admin"];
    const adminName = `${prefix}[admin]`;
    const adminValue = value?.["admin"];
    const adminDeepness = ["admin"];
    const admin = recursiveDeepness(value, setValue)(
        adminItem,
        adminName,
        adminValue,
        adminDeepness,
        [
            {
                regex: `${prefix}[admin][login][sign_in_to]`,
                action: () => (
                    <Col xs={12}>
                        <h4>Login</h4>
                    </Col>
                ),
            },
            {
                regex: `${prefix}[admin][verify][enter]`,
                action: () => (
                    <Col xs={12}>
                        <h4>Verify</h4>
                    </Col>
                ),
            },
        ]
    );

    return (
        <>
            <Nav tabs pills>
                {navItems}
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId={language.abbr + "-footer"} className="pt-4">
                    <Row>{footer}</Row>
                </TabPane>

                <TabPane tabId={language.abbr + "-user"} className="pt-4">
                    <Row>{user}</Row>
                </TabPane>

                <TabPane tabId={language.abbr + "-admin"} className="pt-4">
                    <Row>{admin}</Row>
                </TabPane>
            </TabContent>
        </>
    );
};

class Auth extends Component<Props> {
    state: ComponentState = {
        activeTab: import.meta.env.VITE_DEFAULT_LANG,
    };

    static getDerivedStateFromProps(
        nextProps: Props,
        prevState: ComponentState
    ) {
        if (nextProps.backend?.cms?.cms && prevState.app_name === "") {
            const {
                backend: {
                    cms: {
                        cms: { auth },
                    },
                },
            } = nextProps;
            return updateObject(prevState, { ...auth });
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

    fileUpload = () => document.getElementById("logo")?.click();

    toggle = (tab: string) => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    };

    render() {
        if (!this.props.content || !this.props.backend?.cms) return null;

        let {
            content: {
                cms: {
                    pages: {
                        components: {
                            form: { save },
                        },
                        backend: {
                            pages: {
                                cms: { title, auth },
                            },
                        },
                    },
                },
            },
            backend: {
                cms: { loading, error, message, cms, languages },
            },
        } = this.props;
        const { activeTab } = this.state;
        let content = null;
        let errors = null;

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
            const nav = languages.map((language) => (
                <NavItem key={Math.random()}>
                    <NavLink
                        className={
                            activeTab === language.abbr ? "active" : undefined
                        }
                        onClick={() => this.toggle(language.abbr)}
                    >
                        {language.name}
                    </NavLink>
                </NavItem>
            ));

            const tabContent = languages.map((language) => (
                <TabPane key={Math.random()} tabId={language.abbr}>
                    <SubNavLinks
                        auth={
                            cms?.pages[language.abbr as keyof typeof cms.pages]
                                .auth
                        }
                        language={language}
                    />
                </TabPane>
            ));

            content = (
                <>
                    <Row>
                        <Form
                            onSubmit={this.submitHandler}
                            icon={faWrench}
                            title={auth}
                            link="/admin/cms"
                            innerClassName="row"
                            className="shadow-sm"
                        >
                            <Col lg={12}>
                                <Feedback message={message} />
                                <Row>
                                    <input
                                        type="hidden"
                                        name="_method"
                                        defaultValue="PATCH"
                                    />

                                    <Col lg={2}>
                                        <Nav tabs vertical pills>
                                            {nav}
                                        </Nav>
                                    </Col>

                                    <Col lg={10}>
                                        <TabContent activeTab={activeTab}>
                                            {tabContent}
                                        </TabContent>
                                    </Col>

                                    <div className="col-12">
                                        <FormButton color="green" icon={faSave}>
                                            {save}
                                        </FormButton>
                                    </div>
                                </Row>
                            </Col>
                        </Form>
                    </Row>
                </>
            );
        }

        return (
            <>
                <div className="bg-soft py-4 pl-5 pr-4 position-relative">
                    <Breadcrumb main={auth} icon={faWrench} />
                    <SpecialTitle user icon={faWrench}>
                        {title}
                    </SpecialTitle>
                    <Subtitle user>{auth}</Subtitle>
                </div>
                <div className="p-4 pb-0">
                    {errors}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    get: () => dispatch(getCms() as unknown as UnknownAction),
    patch: (data: object) =>
        dispatch(patchCms("auth", data) as unknown as UnknownAction),
    reset: () => dispatch(resetCms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
