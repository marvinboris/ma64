import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// Components
import Breadcrumb from "../../../../components/Backend/UI/Breadcrumb/Breadcrumb";
import SpecialTitle from "../../../../components/UI/Titles/SpecialTitle/SpecialTitle";
import Subtitle from "../../../../components/UI/Titles/Subtitle/Subtitle";
import List from "../../../../components/Backend/UI/List/List";
import Error from "../../../../components/Error/Error";
import Feedback from "../../../../components/Feedback/Feedback";
import Delete from "../../../../components/Backend/UI/Delete/Delete";
import TitleWrapper from "../../../../components/Backend/UI/TitleWrapper";
import View from "../../../../components/Backend/UI/View/View";

import {
    getUsers,
    deleteUsers,
    resetUsers,
} from "../../../../store/actions/backend/users";
import { updateObject, convertDate } from "../../../../shared/utility";
import { Dispatch, UnknownAction } from "redux";
import { State } from "@/src/store";
import { BackendPage } from "../../types";

const icon = "user";

class Index extends Component<BackendPage> {
    componentDidMount() {
        this.props.get?.();
    }

    componentWillUnmount() {
        this.props.reset();
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
                        components: {
                            list: { action, see },
                        },
                        backend: {
                            pages: {
                                users: { title, add, index, form },
                            },
                        },
                    },
                },
            },
            backend: {
                users: { loading, error, message, users, total },
            },
            auth: {
                data: {
                    role: { features },
                },
            },
        } = this.props;

        const feature = features.find((f) => f.prefix === "users");
        const redirect = !feature && <Navigate to="/user/dashboard" />;

        const errors = (
            <>
                <Error err={error} />
            </>
        );
        const flash = this.props.location.state ? (
            <Feedback time={5000} message={this.props.location.state.message} />
        ) : null;
        const feedback = <Feedback message={message} />;

        if (!users) users = [];
        const data = users.map((user) => {
            return updateObject(user, {
                created_at: convertDate(user.created_at),
                photo: user.photo && (
                    <div className="d-flex">
                        <span>{see}</span>

                        <span className="ml-auto">
                            <View
                                title={`${form.user_photo}: ${user.name}`}
                                content={
                                    <img src={user.photo} className="w-100" />
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="text-green mr-2"
                                    fixedWidth
                                />
                            </View>
                        </span>
                    </div>
                ),
                action: (
                    <div className="text-center">
                        <Link to={`/user/users/${user.id}`} className="mx-1">
                            <FontAwesomeIcon
                                icon={faEye}
                                className="text-green"
                                fixedWidth
                            />
                        </Link>
                        {JSON.parse(feature?.permissions || "[]").includes(
                            "u"
                        ) && (
                            <Link
                                to={`/user/users/${user.id}/edit`}
                                className="mx-1"
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="text-brokenblue"
                                    fixedWidth
                                />
                            </Link>
                        )}
                        {JSON.parse(feature?.permissions || "[]").includes(
                            "d"
                        ) && (
                            <span className="mx-1">
                                <Delete
                                    deleteAction={() =>
                                        this.props.delete(user.id)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="text-red"
                                        fixedWidth
                                    />
                                </Delete>
                            </span>
                        )}
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
                        data={JSON.stringify(users)}
                        get={this.props.get}
                        total={total}
                        bordered
                        add={add}
                        link="/user/users/add"
                        icon={icon}
                        title={index}
                        className="shadow-sm"
                        fields={[
                            { name: form.full_name, key: "name" },
                            { name: form.email, key: "email" },
                            { name: form.phone, key: "phone" },
                            { name: form.role, key: "role" },
                            { name: form.photo, key: "photo" },
                            { name: action, key: "action", fixed: true },
                        ]}
                    />
                </Row>
            </>
        );

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={index} icon={icon} />
                    <SpecialTitle>{title}</SpecialTitle>
                    <Subtitle>{index}</Subtitle>
                </TitleWrapper>
                <div>
                    {redirect}
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
        dispatch(getUsers(page, show, search) as unknown as UnknownAction),
    delete: (id: string) =>
        dispatch(deleteUsers(id) as unknown as UnknownAction),
    reset: () => dispatch(resetUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
