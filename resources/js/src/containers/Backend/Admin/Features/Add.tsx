import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { faAnchor, faTools } from "@fortawesome/free-solid-svg-icons";

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
    getFeature,
    patchFeatures,
    postFeatures,
    resetFeatures,
} from "../../../../store/actions/backend/features";
import { BackendAdminPage } from "../../types";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";

const initialState = {
    name: "",
    prefix: "",

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
        this.setState({ [name]: files ? files[0] : value });
    };

    // Lifecycle methods
    componentDidMount() {
        this.props.reset?.();
        if (this.props.edit && this.props.match)
            this.props.show?.(this.props.match.params.id);
    }

    componentDidUpdate(prevProps: BackendAdminPage) {
        if (
            !prevProps.backend?.features?.message &&
            this.props.backend?.features?.message &&
            this.props.backend.features.message.type === "success" &&
            !this.props.edit
        ) {
            if (this.state.add) this.setState({ ...initialState });
            else
                this.props.history?.push({
                    pathname: "/admin/features",
                    state: {
                        message: this.props.backend.features.message,
                    },
                });
        }
        if (
            !prevProps.backend?.features?.feature &&
            this.props.backend?.features?.feature
        ) {
            const {
                backend: {
                    features: { feature },
                },
            } = this.props;
            this.setState({ ...feature });
        }
    }

    componentWillUnmount() {
        this.props.reset?.();
    }

    render() {
        if (!this.props.content?.cms || !this.props.backend?.features)
            return null;

        let {
            content: {
                cms: {
                    pages: {
                        backend: {
                            pages: {
                                features: { title, add, edit, index, form },
                            },
                        },
                    },
                },
            },
            backend: {
                features: { loading, error, message },
            },
        } = this.props;
        let { name, prefix } = this.state;
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
                                            icon={faTools}
                                            onChange={this.inputChangeHandler}
                                            value={name}
                                            name="name"
                                            required
                                            placeholder={form.name}
                                        />
                                        <FormInput
                                            type="text"
                                            className="col-md-6"
                                            icon={faAnchor}
                                            onChange={this.inputChangeHandler}
                                            value={prefix}
                                            name="prefix"
                                            required
                                            placeholder={form.prefix}
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
                                ? [{ to: "/admin/features", content: index }]
                                : undefined
                        }
                        main={this.props.edit ? edit : add}
                        icon={faTools}
                    />
                    <SpecialTitle>{title}</SpecialTitle>
                    <Subtitle>{this.props.edit ? edit : add}</Subtitle>
                </TitleWrapper>
                <div>
                    {errors}
                    <Row>
                        <Form
                            onSubmit={this.saveHandler}
                            icon={faTools}
                            title={this.props.edit ? edit : add}
                            list={index}
                            link="/admin/features"
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
    show: (id: string) => dispatch(getFeature(id) as unknown as UnknownAction),
    post: (data: object) =>
        dispatch(postFeatures(data) as unknown as UnknownAction),
    patch: (id: string, data: object) =>
        dispatch(patchFeatures(id, data) as unknown as UnknownAction),
    reset: () => dispatch(resetFeatures()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
