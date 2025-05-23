import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {
    faTachometerAlt,
    faTasks,
    faEye,
    faEdit,
    faTrash,
    faCircleNotch,
    faUserGraduate,
    faBook,
    faCalendar,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import Breadcrumb from "../../../../components/Backend/UI/Breadcrumb/Breadcrumb";
import Table from "../../../../components/Backend/UI/Table/Table";
import SpecialTitle from "../../../../components/UI/Titles/SpecialTitle/SpecialTitle";
import Subtitle from "../../../../components/UI/Titles/Subtitle/Subtitle";
import Card from "../../../../components/Backend/Dashboard/Card/Card";
import TitleWrapper from "../../../../components/Backend/UI/TitleWrapper";
import Error from "../../../../components/Error/Error";
import CustomSpinner from "../../../../components/UI/CustomSpinner/CustomSpinner";

import {
    getDashboard,
    resetDashboard,
} from "../../../../store/actions/backend/dashboard";
import { updateObject } from "../../../../shared/utility";
import { BackendAdminPage } from "../../types";
import { State } from "@/src/store";
import { Dispatch, UnknownAction } from "redux";

class Dashboard extends Component<
    BackendAdminPage & {
        deletecycles?: (id: string) => void;
        deleteyears?: (id: string) => void;
        deletesubjects?: (id: string) => void;
        deletestudents?: (id: string) => void;
    }
> {
    componentDidMount() {
        this.props.get?.();
    }

    componentWillUnmount() {
        this.props.reset?.();
    }

    render() {
        if (!this.props.content?.cms || !this.props.backend?.dashboard)
            return null;

        let {
            content: {
                cms: {
                    pages: {
                        backend: {
                            pages: {
                                dashboard: {
                                    admin: {
                                        title,
                                        subtitle,
                                        blocks: {
                                            total_restaurants,
                                            total_plans,
                                            total_plans_amount,
                                            total_recharges,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            backend: {
                dashboard: {
                    loading,
                    error,
                    blocksData,
                    totalCycles,
                    totalYears,
                    totalSubjects,
                    totalStudents,
                },
            },
        } = this.props;

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
            if (blocksData) {
                const data: {
                    children?: React.ReactNode;
                    icon: IconDefinition;
                    link: string;
                    color: string;
                    details: string;
                    title?: string;
                    titleColor?: string;
                    circleBorder?: string;
                    circleColor?: string;
                    light?: boolean;
                }[] = [
                    {
                        title: total_restaurants,
                        children: blocksData.totalCycles,
                        icon: faCircleNotch,
                        link: "/admin/cycles/",
                        color: "yellow",
                        details: total_restaurants,
                        titleColor: "white",
                    },
                    {
                        title: total_plans,
                        children: blocksData.totalYears,
                        icon: faCalendar,
                        link: "/admin/years/",
                        color: "brown",
                        details: total_plans,
                        titleColor: "white",
                    },
                    {
                        title: total_plans_amount,
                        children: blocksData.totalSubjects,
                        icon: faBook,
                        link: "/admin/subjects/",
                        color: "lightyellow",
                        details: total_plans_amount,
                        titleColor: "white",
                    },
                    {
                        title: total_recharges,
                        children: blocksData.totalStudents,
                        icon: faUserGraduate,
                        link: "/admin/students/",
                        color: "darkhead",
                        details: total_recharges,
                        titleColor: "white",
                    },
                ];

                const cards = data.map(
                    (
                        {
                            title,
                            titleColor,
                            icon,
                            link,
                            color,
                            children,
                            details,
                            circleBorder,
                            circleColor,
                            light,
                        },
                        index
                    ) => (
                        <Card
                            color={color}
                            key={index}
                            title={title}
                            titleColor={titleColor}
                            details={details}
                            circleBorder={circleBorder}
                            circleColor={circleColor}
                            icon={icon}
                            link={link}
                            light={light}
                        >
                            {children}
                        </Card>
                    )
                );

                const cyclesData = totalCycles?.map((cycle) =>
                    updateObject(cycle, {
                        action: (
                            <div className="text-center">
                                <Link
                                    className="text-blue mr-2"
                                    to={`/admin/cycles/${cycle.id}`}
                                >
                                    <FontAwesomeIcon icon={faEye} fixedWidth />
                                </Link>
                                <Link
                                    className="text-green mr-2"
                                    to={`/admin/cycles/${cycle.id}/edit`}
                                >
                                    <FontAwesomeIcon icon={faEdit} fixedWidth />
                                </Link>
                                <a
                                    className="text-red"
                                    href="#"
                                    onClick={() =>
                                        this.props.deletecycles?.(cycle.id)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        fixedWidth
                                    />
                                </a>
                            </div>
                        ),
                    })
                );

                const yearsData = totalYears?.map((year) =>
                    updateObject(year, {
                        action: (
                            <div className="text-center">
                                <Link
                                    className="text-blue mr-2"
                                    to={`/admin/years/${year.id}`}
                                >
                                    <FontAwesomeIcon icon={faEye} fixedWidth />
                                </Link>
                                <Link
                                    className="text-green mr-2"
                                    to={`/admin/years/${year.id}/edit`}
                                >
                                    <FontAwesomeIcon icon={faEdit} fixedWidth />
                                </Link>
                                <a
                                    className="text-red"
                                    href="#"
                                    onClick={() =>
                                        this.props.deleteyears?.(year.id)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        fixedWidth
                                    />
                                </a>
                            </div>
                        ),
                    })
                );

                const subjectsData = totalSubjects?.map((subject) =>
                    updateObject(subject, {
                        action: (
                            <div className="text-center">
                                <Link
                                    className="text-blue mr-2"
                                    to={`/admin/subjects/${subject.id}`}
                                >
                                    <FontAwesomeIcon icon={faEye} fixedWidth />
                                </Link>
                                <Link
                                    className="text-green mr-2"
                                    to={`/admin/subjects/${subject.id}/edit`}
                                >
                                    <FontAwesomeIcon icon={faEdit} fixedWidth />
                                </Link>
                                <a
                                    className="text-red"
                                    href="#"
                                    onClick={() =>
                                        this.props.deletesubjects?.(subject.id)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        fixedWidth
                                    />
                                </a>
                            </div>
                        ),
                    })
                );

                const studentsData = totalStudents?.map((student) =>
                    updateObject(student, {
                        action: (
                            <div className="text-center">
                                <Link
                                    className="text-blue mr-2"
                                    to={`/admin/students/${student.id}`}
                                >
                                    <FontAwesomeIcon icon={faEye} fixedWidth />
                                </Link>
                                <Link
                                    className="text-green mr-2"
                                    to={`/admin/students/${student.id}/edit`}
                                >
                                    <FontAwesomeIcon icon={faEdit} fixedWidth />
                                </Link>
                                <a
                                    className="text-red"
                                    href="#"
                                    onClick={() =>
                                        this.props.deletestudents?.(student.id)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        fixedWidth
                                    />
                                </a>
                            </div>
                        ),
                    })
                );

                content = (
                    <>
                        <div className="pt-4 px-4 pb-3 bg-yellow-10">
                            <Row>{cards}</Row>
                        </div>

                        <Row className="mt-5">
                            <Table
                                array={cyclesData || []}
                                searchable
                                draggable
                                closable
                                title="Total Cycles"
                                icon={faTasks}
                                bordered
                                limit={5}
                                lg={6}
                                fields={[
                                    { name: "Name", key: "name" },
                                    { name: "Slug", key: "slug" },
                                    { name: "Action", key: "action" },
                                ]}
                            >
                                <Link to="/admin/cycles" className="text-reset">
                                    {"View full cycle list | >"}
                                </Link>
                            </Table>

                            <Table
                                array={yearsData || []}
                                searchable
                                draggable
                                closable
                                title="Total Years"
                                icon={faTasks}
                                bordered
                                limit={5}
                                lg={6}
                                fields={[
                                    { name: "Name", key: "name" },
                                    { name: "Slug", key: "slug" },
                                    { name: "Action", key: "action" },
                                ]}
                            >
                                <Link to="/admin/years" className="text-reset">
                                    {"View full year list | >"}
                                </Link>
                            </Table>

                            <Table
                                array={subjectsData || []}
                                searchable
                                draggable
                                closable
                                title="Total Subjects"
                                icon={faTasks}
                                bordered
                                limit={5}
                                lg={6}
                                fields={[
                                    { name: "Name", key: "name" },
                                    { name: "Slug", key: "slug" },
                                    { name: "Action", key: "action" },
                                ]}
                            >
                                <Link
                                    to="/admin/subjects"
                                    className="text-reset"
                                >
                                    {"View full subject list | >"}
                                </Link>
                            </Table>

                            <Table
                                array={studentsData || []}
                                searchable
                                draggable
                                closable
                                title="Total Students"
                                icon={faTasks}
                                bordered
                                limit={5}
                                lg={6}
                                fields={[
                                    { name: "First name", key: "first_name" },
                                    { name: "Last name", key: "last_name" },
                                    { name: "Birth date", key: "birth_date" },
                                    { name: "Birth place", key: "birth_place" },
                                    { name: "Matricule", key: "matricule" },
                                    { name: "Action", key: "action" },
                                ]}
                            >
                                <Link
                                    to="/admin/students"
                                    className="text-reset"
                                >
                                    {"View full student list | >"}
                                </Link>
                            </Table>
                        </Row>
                    </>
                );
            }
        }

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={subtitle} icon={faTachometerAlt} />
                    <SpecialTitle user icon={faTachometerAlt}>
                        {title}
                    </SpecialTitle>
                    <Subtitle user>{subtitle}</Subtitle>
                </TitleWrapper>
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
    get: () => dispatch(getDashboard() as unknown as UnknownAction),
    reset: () => dispatch(resetDashboard() as unknown as UnknownAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
