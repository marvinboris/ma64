import React, { Component } from "react";
import { Col, Input } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { State } from "@/src/store";
import { Post } from "@/src/types/post";

class Sidebar extends Component<State & { posts?: Post[] }> {
    render() {
        if (!this.props.content?.cms) return;
        const {
            content: {
                cms: {
                    pages: {
                        frontend: {
                            pages: {
                                posts: {
                                    body: { sidebar },
                                },
                            },
                        },
                    },
                },
            },
            posts,
        } = this.props;

        const lang = localStorage.getItem("lang") as string;

        const popularPosts = posts
            ?.filter((p, index) => index < 3)
            .map(({ link, photo, title }) => (
                <div className="mb-3" key={photo}>
                    <div className="mb-2">
                        <NavLink to={link} className="text-dark">
                            {title[lang]}
                        </NavLink>
                    </div>
                    <div
                        className="embed-responsive embed-responsive-16by9"
                        style={{
                            background: 'url("' + photo + '") no-repeat center',
                            backgroundSize: "cover",
                        }}
                    />
                </div>
            ));

        return (
            <Col>
                <div className="mb-4">
                    <h5 className="text-500">{sidebar.search.title}</h5>
                    <Input
                        type="search"
                        placeholder={sidebar.search.form.search + " ..."}
                    />
                </div>

                <div className="mb-4">
                    <h5 className="text-500">{sidebar.popular_posts.title}</h5>
                    {popularPosts}
                </div>
            </Col>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

export default connect(mapStateToProps)(Sidebar);
