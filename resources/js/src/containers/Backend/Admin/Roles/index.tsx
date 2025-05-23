import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEdit,
    faTrash,
    faUserTag,
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
    deleteRoles,
    getRoles,
    resetRoles,
} from "../../../../store/actions/backend/roles";
import { updateObject, convertDate } from "../../../../shared/utility";
import { Dispatch, UnknownAction } from "redux";
import { State } from "@/src/store";
import { BackendPage } from "../../types";

class Index extends Component<BackendPage> {
    componentDidMount() {
        this.props.get?.();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        if (!this.props.content?.cms || !this.props.backend?.roles) return null;

        let {
            content: {
                cms: {
                    pages: {
                        components: {
                            list: { action },
                        },
                        backend: {
                            pages: {
                                roles: { title, add, index, form },
                            },
                        },
                    },
                },
            },
            backend: {
                roles: { loading, error, message, roles, total },
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

        if (!roles) roles = [];
        const data = roles.map((role) => {
            return updateObject(role, {
                created_at: convertDate(role.created_at),
                action: (
                    <div className="text-center">
                        <Link to={`/admin/roles/${role.id}`} className="mr-2">
                            <FontAwesomeIcon
                                icon={faEye}
                                className="text-green"
                                fixedWidth
                            />
                        </Link>
                        <Link
                            to={`/admin/roles/${role.id}/edit`}
                            className="mr-2"
                        >
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="text-brokenblue"
                                fixedWidth
                            />
                        </Link>
                        <span className="mx-1">
                            <Delete
                                deleteAction={() => this.props.delete(role.id)}
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
                        data={JSON.stringify(roles)}
                        get={this.props.get}
                        total={total}
                        bordered
                        add={add}
                        link="/admin/roles/add"
                        icon={faUserTag}
                        title={index}
                        className="shadow-sm"
                        fields={[
                            { name: form.name, key: "name" },
                            { name: form.description, key: "description" },
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
                    <Breadcrumb main={index} icon={faUserTag} />
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
        dispatch(getRoles(page, show, search) as unknown as UnknownAction),
    delete: (id: string) =>
        dispatch(deleteRoles(id) as unknown as UnknownAction),
    reset: () => dispatch(resetRoles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
