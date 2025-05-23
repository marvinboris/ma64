import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, FormGroup, Row } from "reactstrap";
import { faCheckCircle, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import Breadcrumb from "../../../../components/Backend/UI/Breadcrumb/Breadcrumb";
import SpecialTitle from "../../../../components/UI/Titles/SpecialTitle/SpecialTitle";
import Subtitle from "../../../../components/UI/Titles/Subtitle/Subtitle";
import Error from "../../../../components/Error/Error";
import CustomSpinner from "../../../../components/UI/CustomSpinner/CustomSpinner";
import Form from "../../../../components/Backend/UI/Form/Form";
import Save from "../../../../components/Backend/UI/Food/Form/Save";
import FormInput from "../../../../components/Backend/UI/Input/Input";
import TitleWrapper from "../../../../components/Backend/UI/TitleWrapper";
import Feedback from "../../../../components/Feedback/Feedback";

import {
    getUser,
    getUsersInfo,
    postUsers,
    patchUsers,
    resetUsers,
} from "../../../../store/actions/backend/users";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";
import { BackendAdminPage } from "../../types";
import { Navigate } from "react-router";
import { readURL } from "../../Admin/Cms/types";

const icon = "user";
const initialState = {
    name: "",
    phone: "",
    photo: null,
    email: "",
    password: "",
    password_confirmation: "",
    role_id: "",

    add: false,
};

class Add extends Component<BackendAdminPage> {
    state = { ...initialState };

    // Component methods
    saveHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (this.props.edit)
            this.props.patch?.(this.props.match?.params.id, e.target);
        else this.props.post?.(e.target);
    };

    saveAddHandler = () =>
        this.setState({ add: true }, () =>
            this.props.post?.(document.querySelector("form"))
        );

    inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (files) readURL(e.target);
        this.setState({ [name]: files ? files[0] : value });
    };

    fileUpload = () => document.getElementById("photo")?.click();

    // Lifecycle methods
    componentDidMount() {
        this.props.reset?.();
        if (this.props.edit && this.props.match)
            this.props.show?.(this.props.match.params.id);
        else this.props.info?.();
    }

    componentDidUpdate(prevProps: BackendAdminPage) {
        if (
            !prevProps.backend?.users?.message &&
            this.props.backend?.users?.message &&
            this.props.backend.users.message.type === "success" &&
            !this.props.edit
        ) {
            if (this.state.add) this.setState({ ...initialState });
            else
                this.props.history?.push({
                    pathname: "/user/users",
                    state: {
                        message: this.props.backend.users.message,
                    },
                });
        }
        if (
            !prevProps.backend?.users?.user &&
            this.props.backend?.users?.user
        ) {
            const {
                backend: {
                    users: { user },
                },
            } = this.props;
            this.setState({ ...user });
        }
        if (
            this.props.edit &&
            !prevProps.backend?.users?.message &&
            this.props.backend?.users?.message &&
            this.props.backend.users.message.type === "success"
        ) {
            if (!this.props.backend.users.user) return;
            const { photo } = this.props.backend.users.user;
            this.setState({ photo });
        }
    }

    componentWillUnmount() {
        this.props.reset?.();
    }

    render() {
        if (
            !this.props.content?.cms ||
            !this.props.backend?.users ||
            !this.props.auth?.data
        )
            return null;

        let {
            content: {
                cms: {
                    pages: {
                        backend: {
                            pages: {
                                users: { title, add, edit, index, form },
                            },
                        },
                    },
                },
            },
            backend: {
                users: { loading, error, message, roles, user },
            },
            auth: {
                data: {
                    role: { features },
                },
            },
        } = this.props;
        let {
            name,
            phone,
            photo,
            email,
            password,
            password_confirmation,
            role_id,
        } = this.state;
        let content;
        let errors = null;

        const feature = features.find((f) => f.prefix === "users");
        const redirect = !(
            feature &&
            JSON.parse(feature.permissions).includes(
                this.props.edit ? "u" : "c"
            )
        ) && <Navigate to="/user/dashboard" />;

        if (!roles) roles = [];
        const rolesOptions = roles
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((role) => (
                <option key={JSON.stringify(role)} value={role.id}>
                    {role.name}
                </option>
            ));

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
            content = (
                <>
                    <Col xl={9}>
                        <Feedback message={message} />

                        {this.props.edit && (
                            <input
                                type="hidden"
                                name="_method"
                                defaultValue="PATCH"
                            />
                        )}

                        <div className="shadow-lg rounded-8 bg-white px-4 px-sm-5 py-3 py-sm-4">
                            <Row className="my-2 my-sm-3">
                                <div className="col-lg-9">
                                    <Row>
                                        <FormInput
                                            type="text"
                                            className="col-md-6"
                                            icon={icon}
                                            onChange={this.inputChangeHandler}
                                            value={name}
                                            name="name"
                                            required
                                            placeholder={form.name}
                                        />
                                        <FormInput
                                            type="tel"
                                            className="col-md-6"
                                            addon={
                                                <span className="text-secondary text-small">
                                                    +237
                                                </span>
                                            }
                                            onChange={this.inputChangeHandler}
                                            value={phone}
                                            name="phone"
                                            required
                                            placeholder={form.phone}
                                        />
                                        <FormInput
                                            type="password"
                                            className="col-md-6"
                                            icon="lock"
                                            onChange={this.inputChangeHandler}
                                            value={password}
                                            name="password"
                                            placeholder={form.password}
                                        />
                                        <FormInput
                                            type="password"
                                            className="col-md-6"
                                            icon="lock"
                                            onChange={this.inputChangeHandler}
                                            value={password_confirmation}
                                            name="password_confirmation"
                                            placeholder={
                                                form.password_confirmation
                                            }
                                        />
                                        <FormInput
                                            type="email"
                                            className="col-md-6"
                                            icon="envelope"
                                            onChange={this.inputChangeHandler}
                                            value={email}
                                            name="email"
                                            placeholder={form.email}
                                        />
                                        <FormInput
                                            className="col-lg-6"
                                            type="select"
                                            name="role_id"
                                            placeholder={form.role}
                                            onChange={this.inputChangeHandler}
                                            icon="user-tag"
                                            required
                                            value={role_id}
                                        >
                                            <option value="">
                                                {form.select_role}
                                            </option>
                                            {rolesOptions}
                                        </FormInput>
                                    </Row>
                                </div>

                                <div className="col-lg-3">
                                    <FormGroup>
                                        <div
                                            id="embed-photo"
                                            className="embed-responsive embed-responsive-1by1 bg-soft rounded-8 d-flex justify-content-center align-items-center position-relative"
                                            style={{
                                                cursor: "pointer",
                                                backgroundImage: photo
                                                    ? `url("${photo}")`
                                                    : undefined,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                                overflow: "visible",
                                            }}
                                            onClick={this.fileUpload}
                                        >
                                            {this.props.edit ? (
                                                photo &&
                                                photo !== user?.photo && (
                                                    <div className="text-center text-green w-100">
                                                        <div
                                                            className="position-absolute"
                                                            style={{
                                                                top: 0,
                                                                right: 0,
                                                                transform:
                                                                    "translate(50%,-50%)",
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faCheckCircle
                                                                }
                                                                fixedWidth
                                                                size="2x"
                                                            />
                                                        </div>

                                                        <div
                                                            className="position-absolute file-selected text-truncate w-100 pt-3"
                                                            style={{
                                                                top: "100%",
                                                                left: 0,
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            ) : photo ? (
                                                <div className="text-center text-green w-100">
                                                    <div
                                                        className="position-absolute"
                                                        style={{
                                                            top: 0,
                                                            right: 0,
                                                            transform:
                                                                "translate(50%,-50%)",
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheckCircle}
                                                            fixedWidth
                                                            size="2x"
                                                        />
                                                    </div>

                                                    <div
                                                        className="position-absolute file-selected text-truncate w-100 pt-3"
                                                        style={{
                                                            top: "100%",
                                                            left: 0,
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="text-center text-light w-100 overflow-hidden px-3">
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faFileImage}
                                                            fixedWidth
                                                            size="4x"
                                                        />
                                                    </div>

                                                    <div className="mt-3 mb-1 text-center text-12 text-truncate">
                                                        {form.upload}
                                                    </div>

                                                    <div className="text-center text-12 text-truncate">
                                                        {form.size}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </FormGroup>
                                </div>

                                <Save
                                    edit={Boolean(this.props.edit)}
                                    saveAddHandler={this.saveAddHandler}
                                />
                            </Row>
                        </div>
                    </Col>
                </>
            );
        }

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb
                        items={
                            this.props.edit
                                ? [{ to: "/user/users", content: index }]
                                : undefined
                        }
                        main={this.props.edit ? edit : add}
                        icon={icon}
                    />
                    <SpecialTitle>{title}</SpecialTitle>
                    <Subtitle>{this.props.edit ? edit : add}</Subtitle>
                </TitleWrapper>
                <div>
                    {redirect}
                    {errors}
                    <Row>
                        <Form
                            onSubmit={this.saveHandler}
                            icon={icon}
                            title={this.props.edit ? edit : add}
                            list={index}
                            link="/user/users"
                            innerClassName="row justify-content-center"
                        >
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                className="d-none"
                                onChange={this.inputChangeHandler}
                                accept=".png,.jpg,.jpeg"
                            />
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
    show: (id: string) => dispatch(getUser(id) as unknown as UnknownAction),
    info: () => dispatch(getUsersInfo() as unknown as UnknownAction),
    post: (data: object) =>
        dispatch(postUsers(data) as unknown as UnknownAction),
    patch: (id: string, data: object) =>
        dispatch(patchUsers(id, data) as unknown as UnknownAction),
    reset: () => dispatch(resetUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
