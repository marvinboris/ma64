import React, { ChangeEvent, Component, FormEvent } from "react";
import { connect } from "react-redux";
import { Form, Col } from "reactstrap";
import { faLock, faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import Title from "../../../../components/UI/Titles/Title/Title";
import Input from "../../../../components/UI/Input/Input";
import BetweenButton from "../../../../components/UI/Button/BetweenButton/BetweenButton";
import Error from "../../../../components/Error/Error";
import Feedback from "../../../../components/Feedback/Feedback";
import CustomSpinner from "../../../../components/UI/CustomSpinner/CustomSpinner";

import { authUserLogin, setHash } from "../../../../store/actions/auth";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";

export class Login extends Component<
    State & {
        onAuth: Function;
        onSetHash: Function;
        history: string[];
        dark?: boolean;
    }
> {
    state = {
        email: "",
        password: "",
    };

    componentDidUpdate() {
        if (!this.props.auth) return;

        const {
            auth: { hash },
            onSetHash,
            history,
        } = this.props;
        if (hash) {
            onSetHash(hash);
            history.push("/auth/verify");
        }
    }

    submitHandler = (e: FormEvent) => {
        e.preventDefault();
        this.props.onAuth(e.target);
    };

    inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        if (!this.props.content || !this.props.auth) return null;

        const { email, password } = this.state;
        const {
            content: {
                cms: {
                    pages: {
                        auth: {
                            user: { login },
                        },
                    },
                },
            },
            auth: { loading, error, message },
        } = this.props;
        let titleContent, formContent;

        titleContent = (
            <>
                {login.dont_be_late}!{" "}
                <span className="text-border">{login.get_in}</span>
            </>
        );

        formContent = (
            <>
                <Input
                    type="text"
                    icon="user"
                    onChange={this.inputChangeHandler}
                    validation={{ required: true, isEmail: true }}
                    value={email}
                    name="email"
                    required
                    placeholder={login.email_address}
                />
                <Input
                    type="password"
                    icon="lock"
                    onChange={this.inputChangeHandler}
                    validation={{ required: true }}
                    value={password}
                    name="password"
                    required
                    placeholder={login.password}
                />

                <BetweenButton
                    color="border"
                    size="lg"
                    className="py-3 px-4 btn-block"
                    icon="sign-in-alt"
                >
                    {login.sign_in}
                </BetweenButton>
            </>
        );

        const errors = <Error err={error} />;
        const feedback = <Feedback message={message} />;
        let content = null;

        if (loading)
            content = (
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <CustomSpinner />
                </div>
            );
        else content = <Form onSubmit={this.submitHandler}>{formContent}</Form>;

        return (
            <>
                <Title className="h4">{titleContent}</Title>
                {errors}
                {feedback}
                {content}
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onAuth: (data: HTMLFormElement) =>
        dispatch(authUserLogin(data) as unknown as UnknownAction),
    onSetHash: (hash: string) => dispatch(setHash(hash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
