import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Col, FormGroup, Input, Row } from "reactstrap";

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
    getBrand,
    getBrandsInfo,
    postBrands,
    patchBrands,
    resetBrands,
} from "../../../../store/actions/backend/brands";
import { BackendAdminPage } from "../../types";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";
import { Navigate } from "react-router";

const icon = "copyright";
const initialState: {
    name: string;
    add?: boolean;
    translate?: string;
} = {
    name: "",

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
        if (name.includes("[")) {
            const { translate } = this.state;
            const stateName = name.split("[")[0];
            const element = this.state[stateName as keyof typeof initialState];
            if (element)
                element[translate as keyof typeof element] = value as any;
            return this.setState({ [stateName]: element });
        }
        this.setState({ [name]: files ? files[0] : value });
    };

    // Lifecycle methods
    componentDidMount() {
        this.props.reset?.();
        if (this.props.edit && this.props.match)
            this.props.show?.(this.props.match.params.id);
        this.setState({ translate: import.meta.env.VITE_DEFAULT_LANG });
    }

    componentDidUpdate(prevProps: BackendAdminPage) {
        if (
            !prevProps.backend?.brands?.message &&
            this.props.backend?.brands?.message &&
            this.props.backend.brands.message.type === "success" &&
            !this.props.edit
        ) {
            if (this.state.add)
                this.setState({
                    ...initialState,
                    translate: import.meta.env.VITE_DEFAULT_LANG,
                });
            else
                this.props.history?.push({
                    pathname: "/user/brands",
                    state: {
                        message: this.props.backend.brands.message,
                    },
                });
        }
        if (
            (!prevProps.backend?.brands?.brand &&
                this.props.backend?.brands?.brand) ||
            (this.props.edit &&
                !prevProps.backend?.brands?.message &&
                this.props.backend?.brands?.message &&
                this.props.backend.brands.message.type === "success")
        ) {
            const {
                backend: {
                    brands: { brand },
                },
            } = this.props;
            this.setState({ ...brand });
        }
    }

    componentWillUnmount() {
        this.props.reset?.();
    }

    render() {
        if (
            !this.props.content?.cms ||
            !this.props.backend?.brands ||
            !this.props.auth?.data
        )
            return null;

        let {
            content: {
                cms: {
                    pages: {
                        backend: {
                            pages: {
                                brands: { title, add, edit, index, form },
                            },
                        },
                    },
                },
            },
            backend: {
                brands: { loading, error, message },
            },
            auth: {
                data: {
                    role: { features },
                },
            },
        } = this.props;
        let { name } = this.state;
        let content;
        let errors = null;

        const feature = features.find((f) => f.prefix === "brands");
        const redirect = !(
            feature &&
            JSON.parse(feature.permissions).includes(
                this.props.edit ? "u" : "c"
            )
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
                                            id="name"
                                            className="col-md-6"
                                            icon={icon}
                                            onChange={this.inputChangeHandler}
                                            value={name}
                                            name="name"
                                            required
                                            placeholder={form.name}
                                        />
                                    </Row>
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
                                ? [{ to: "/user/brands", content: index }]
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
                            link="/user/brands"
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
    show: (id: string) => dispatch(getBrand(id) as unknown as UnknownAction),
    info: () => dispatch(getBrandsInfo() as unknown as UnknownAction),
    post: (data: object) =>
        dispatch(postBrands(data) as unknown as UnknownAction),
    patch: (id: string, data: object) =>
        dispatch(patchBrands(id, data) as unknown as UnknownAction),
    reset: () => dispatch(resetBrands()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
