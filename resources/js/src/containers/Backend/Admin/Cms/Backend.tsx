import React, { ChangeEvent, Component, FormEvent, useState } from "react";
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
import FormInput from "../../../../components/Backend/UI/Input/Input";
import FormButton from "../../../../components/UI/Button/BetweenButton/BetweenButton";
import Feedback from "../../../../components/Feedback/Feedback";

import {
    getCms,
    patchCms,
    resetCms,
} from "../../../../store/actions/backend/cms";
import { updateObject } from "../../../../shared/utility";
import BACKEND from "../../../../components/Content/Backend";
import { BackendAdminPage } from "../../types";
import { Cms, Content } from "@/src/types/content";
import { Language } from "@/src/types/language";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";
import { RecursiveDeepness, recursiveDeepness } from "./types";

type Props = BackendAdminPage;

type ComponentState = {
    activeTab: string;
    app_name?: string;
};

const Separator = ({ sm = false }) => (
    <Col xs={12} className={`mb-${sm ? 2 : 3}`} />
);

const SubNavLinks = ({
    backend,
    language,
}: {
    backend:
        | (Omit<Cms["pages"]["fr"]["backend"], "pages"> &
              Cms["pages"]["fr"]["backend"]["pages"])
        | undefined;
    language: Language;
}) => {
    const [activeTab, setActiveTab] = useState(language.abbr + "-header");
    const [value, setValue] = useState(backend);

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const navItems = Object.keys(backend || {}).map((key) => {
        const id = `${language.abbr}-${key}`;

        return (
            <NavItem key={id}>
                <NavLink
                    onClick={() => toggle(id)}
                    className={activeTab === id ? "active" : ""}
                >
                    <span className="text-capitalize">{key}</span>
                </NavLink>
            </NavItem>
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
    const dashboardDeepness = ["pages", "dashboard"];
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
                regex: `${dashboardName}[.+][blocks][subscription][title]`,
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

    const resourceTabPanes = Object.keys(BACKEND.pages).map((item) => {
        const currentItem = BACKEND.pages[item as keyof typeof BACKEND.pages];
        const currentName = `${prefix}[pages][${item}]`;
        const currentValue = value?.[item as keyof typeof value];
        const currentDeepness = ["pages", item];
        const current = recursiveDeepness(value, setValue)(
            currentItem,
            currentName,
            currentValue as RecursiveDeepness["paramValue"],
            currentDeepness,
            [],
            [
                {
                    regex: `${currentName}[index]`,
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

        return (
            <TabPane
                key={Math.random()}
                tabId={`${language.abbr}-${item}`}
                className="pt-4"
            >
                <Row>{current}</Row>
            </TabPane>
        );
    });

    const cmsItem = BACKEND.pages["cms"];
    const cmsName = `${prefix}[pages][cms]`;
    const cmsValue = value?.["cms"];
    const cmsDeepness = ["pages", "cms"];
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

    const settingsItem = BACKEND.pages["settings"];
    const settingsName = `${prefix}[pages][settings]`;
    const settingsValue = value?.["settings"];
    const settingsDeepness = ["pages", "settings"];
    const settings = recursiveDeepness(value, setValue)(
        settingsItem,
        settingsName,
        settingsValue as RecursiveDeepness["paramValue"],
        settingsDeepness
    );

    return (
        <>
            <Nav tabs pills>
                {navItems}
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId={language.abbr + "-header"} className="pt-4">
                    <Row>{header}</Row>
                </TabPane>

                <TabPane tabId={language.abbr + "-footer"} className="pt-4">
                    <Row>{footer}</Row>
                </TabPane>

                <TabPane tabId={language.abbr + "-sidebar"} className="pt-4">
                    <Row>{sidebar}</Row>
                </TabPane>

                <TabPane tabId={language.abbr + "-dashboard"} className="pt-4">
                    <Row>{dashboard}</Row>
                </TabPane>

                {resourceTabPanes}

                <TabPane tabId={language.abbr + "-cms"} className="pt-4">
                    <Row>{cms}</Row>
                </TabPane>

                <TabPane tabId={language.abbr + "-settings"} className="pt-4">
                    <Row>{settings}</Row>
                </TabPane>
            </TabContent>
        </>
    );
};

class Backend extends Component<Props> {
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

    submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        await this.props.patch?.(e.target);
    };

    inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
                                cms: { title, backend },
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

            const tabContent = languages.map((language) => {
                const data =
                    cms?.pages[language.abbr as keyof typeof cms.pages].backend;
                if (!data) return null;

                const backend = {
                    header: data.header,
                    footer: data.footer,
                    sidebar: data.sidebar,
                    ...data.pages,
                };

                return (
                    <TabPane key={Math.random()} tabId={language.abbr}>
                        <SubNavLinks backend={backend} language={language} />
                    </TabPane>
                );
            });

            content = (
                <>
                    <Row>
                        <Form
                            onSubmit={this.submitHandler}
                            icon={faWrench}
                            title={backend}
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
                    <Breadcrumb main={backend} icon={faWrench} />
                    <SpecialTitle user icon={faWrench}>
                        {title}
                    </SpecialTitle>
                    <Subtitle user>{backend}</Subtitle>
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
        dispatch(patchCms("backend", data) as unknown as UnknownAction),
    reset: () => dispatch(resetCms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backend);
