import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEdit,
    faTrash,
    faTools,
} from "@fortawesome/free-solid-svg-icons";

// Components
import Breadcrumb from "../../../../components/Backend/UI/Breadcrumb/Breadcrumb";
import SpecialTitle from "../../../../components/UI/Titles/SpecialTitle/SpecialTitle";
import Subtitle from "../../../../components/UI/Titles/Subtitle/Subtitle";
import List from "../../../../components/Backend/UI/List/List";
import Error from "../../../../components/Error/Error";
import Feedback from "../../../../components/Feedback/Feedback";
import TitleWrapper from "../../../../components/Backend/UI/TitleWrapper";
import Delete from "../../../../components/Backend/UI/Delete/Delete";

import {
    deleteFeatures,
    getFeatures,
    resetFeatures,
} from "../../../../store/actions/backend/features";
import { updateObject, convertDate } from "../../../../shared/utility";
import { BackendPage } from "../../types";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";

class Index extends Component<BackendPage> {
    componentDidMount() {
        this.props.get?.();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        if (!this.props.content?.cms || !this.props.backend?.features)
            return null;

        let {
            content: {
                cms: {
                    pages: {
                        components: {
                            list: { action },
                        },
                        backend: {
                            pages: {
                                features: { title, add, index, form },
                            },
                        },
                    },
                },
            },
            backend: {
                features: { loading, error, message, features, total },
            },
        } = this.props;

        const errors = (
            <>
                <Error err={error} />
            </>
        );
        const flash = this.props.location.state ? (
            <Feedback time={5000} message={this.props.location.state.message} />
        ) : null;
        const feedback = <Feedback message={message} />;

        if (!features) features = [];
        const data = features.map((feature) => {
            return updateObject(feature, {
                created_at: convertDate(feature.created_at),
                action: (
                    <div className="text-center">
                        <Link
                            to={`/admin/features/${feature.id}`}
                            className="mx-1"
                        >
                            <FontAwesomeIcon
                                icon={faEye}
                                className="text-green"
                                fixedWidth
                            />
                        </Link>
                        <Link
                            to={`/admin/features/${feature.id}/edit`}
                            className="mx-1"
                        >
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="text-brokenblue"
                                fixedWidth
                            />
                        </Link>
                        <span className="mx-1">
                            <Delete
                                deleteAction={() =>
                                    this.props.delete(feature.id)
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red"
                                    fixedWidth
                                />
                            </Delete>
                        </span>
                    </div>
                ),
            });
        });

        const content = (
            <>
                <Row>
                    <List
                        array={data}
                        loading={loading}
                        data={JSON.stringify(features)}
                        get={this.props.get}
                        total={total}
                        bordered
                        add={add}
                        link="/admin/features/add"
                        icon={faTools}
                        title={index}
                        className="shadow-sm"
                        fields={[
                            { name: form.name, key: "name" },
                            { name: form.prefix, key: "prefix" },
                            { name: form.created_at, key: "created_at" },
                            { name: action, key: "action", fixed: true },
                        ]}
                    />
                </Row>
            </>
        );

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={index} icon={faTools} />
                    <SpecialTitle>{title}</SpecialTitle>
                    <Subtitle>{index}</Subtitle>
                </TitleWrapper>
                <div>
                    {errors}
                    {flash}
                    {feedback}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    get: (page?: string | number, show?: string | number, search?: string) =>
        dispatch(getFeatures(page, show, search) as unknown as UnknownAction),
    delete: (id: string) =>
        dispatch(deleteFeatures(id) as unknown as UnknownAction),
    reset: () => dispatch(resetFeatures()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
