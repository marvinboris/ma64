import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, NavbarToggler, Container } from "reactstrap";

import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../UI/Logo/Logo";
import Languages from "./Languages";

import { getContent } from "../../../store/actions/content";

import "./Toolbar.css";
import { Dispatch, UnknownAction } from "redux";
import { State } from "@/src/store";
import { Language } from "@/src/types/language";

type InnerState = { isOpen: boolean; language: Language | null };

type Props = State & {
    getContent: Function;
    isAuth: boolean;
    name: string | null;
    notifications: string | null;
    role: string | null;
    logoutHandler: Function;
    drawerToggleClicked: Function;
};

class Toolbar extends Component<Props> {
    state: InnerState = {
        isOpen: false,
        language: null,
    };

    // Component methods
    toggle = () =>
        this.setState((prevState: InnerState) => ({
            isOpen: !prevState.isOpen,
        }));

    setLanguage = (lang: string) => {
        if (lang !== localStorage.getItem("lang")) {
            localStorage.setItem("lang", lang);
            this.props.getContent();
            this.setState({
                language: this.props.content?.languages?.find(
                    (l) => l.abbr === lang
                ),
            });
        }
    };

    // Lifecycle methods
    componentDidMount() {
        this.setState({
            language: this.props.content?.languages?.find(
                (l) => l.abbr === localStorage.getItem("lang")
            ),
        });
    }

    componentDidUpdate(prevProps: Props) {
        if (
            JSON.stringify(prevProps.content?.cms) !==
            JSON.stringify(this.props.content?.cms)
        )
            this.setState({
                language: this.props.content?.languages?.find(
                    (l) => l.abbr === localStorage.getItem("lang")
                ),
            });
    }

    render() {
        if (!this.props.content) return null;

        const { isOpen, language } = this.state;
        const {
            content: { languages },
        } = this.props;

        return (
            <div className="Toolbar fixed-top dark">
                <Container>
                    <Navbar color="transparent" dark expand="lg">
                        <Link
                            className="text-decoration-none navbar-brand"
                            to="/"
                        >
                            <Logo />
                        </Link>

                        <div className="d-flex align-items-center d-lg-none">
                            <div>
                                <NavbarToggler onClick={this.toggle} />
                            </div>

                            <div className="pl-3">
                                <Languages
                                    languages={languages}
                                    set={this.setLanguage}
                                    language={language}
                                />
                            </div>
                        </div>

                        <NavigationItems isOpen={isOpen} />

                        <div className="d-none d-lg-block pl-3">
                            <Languages
                                languages={languages}
                                set={this.setLanguage}
                                language={language}
                            />
                        </div>
                    </Navbar>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getContent: () => dispatch(getContent() as unknown as UnknownAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
