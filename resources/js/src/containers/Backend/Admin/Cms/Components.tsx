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
import FormInput from "../../../../components/Backend/UI/Input/Input";
import FormButton from "../../../../components/UI/Button/BetweenButton/BetweenButton";
import Feedback from "../../../../components/Feedback/Feedback";

import {
    getCms,
    patchCms,
    resetCms,
} from "../../../../store/actions/backend/cms";
import { updateObject } from "../../../../shared/utility";
import COMPONENTS from "../../../../components/Content/Components";
import { recursiveDeepness } from "./types";
import { Cms } from "@/src/types/content";
import { Language } from "@/src/types/language";
import { BackendAdminPage } from "../../types";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";

type Props = BackendAdminPage;

type ComponentState = {
    activeTab: string;
    app_name?: string;
};

const SubNavLinks = ({
    components,
    language,
}: {
    components: Cms["pages"]["fr"]["components"] | undefined;
    language: Language;
}) => {
    const [activeTab, setActiveTab] = useState(language.abbr + "-form");
    const [value, setValue] = useState(components);

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const navItems = Object.keys(components || {}).map((key) => {
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

    const prefix = `${language.abbr}[components]`;

    const formItem = COMPONENTS["form"];
    const formName = `${prefix}[form]`;
    const formValue = value?.["form"];
    const formDeepness = ["form"];
    const form = recursiveDeepness(value, setValue)(
        formItem,
        formName,
        formValue,
        formDeepness
    );

    const listItem = COMPONENTS["list"];
    const listName = `${prefix}[list]`;
    const listValue = value?.["list"];
    const listDeepness = ["list"];
    const list = recursiveDeepness(value, setValue)(
        listItem,
        listName,
        listValue,
        listDeepness
    );

    return (
        <>
            <Nav tabs pills>
                {navItems}
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId={language.abbr + "-form"} className="pt-4">
                    <Row>{form}</Row>
                </TabPane>

                <TabPane tabId={language.abbr + "-list"} className="pt-4">
                    <Row>{list}</Row>
                </TabPane>
            </TabContent>
        </>
    );
};

class Components extends Component<Props> {
    state = {
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
                        cms: { components },
                    },
                },
            } = nextProps;
            return updateObject(prevState, { ...components });
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
                                cms: { title, components },
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
                        onClick={() => this.toggle(language.abbr)}
                        className={
                            activeTab === language.abbr ? "active" : undefined
                        }
                    >
                        {language.name}
                    </NavLink>
                </NavItem>
            ));

            const tabContent = languages.map((language) => (
                <TabPane key={Math.random()} tabId={language.abbr}>
                    <SubNavLinks
                        components={
                            cms?.pages[language.abbr as keyof typeof cms.pages]
                                .components
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
                            title={components}
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
                    <Breadcrumb main={components} icon={faWrench} />
                    <SpecialTitle user icon={faWrench}>
                        {title}
                    </SpecialTitle>
                    <Subtitle user>{components}</Subtitle>
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
        dispatch(patchCms("components", data) as unknown as UnknownAction),
    reset: () => dispatch(resetCms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Components);
