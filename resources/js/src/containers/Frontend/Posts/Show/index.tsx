import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Container } from "reactstrap";
import { Dispatch, UnknownAction } from "redux";

import Feedback from "../../../../components/Feedback/Feedback";
import Error from "../../../../components/Error/Error";
import PresentationalContainer from "../../../../components/UI/PresentationalContainer/PresentationalContainer";
import Banner from "../../../../components/UI/Banner/Banner";
import Stars from "../../../../components/UI/Stars/Stars";
import Sidebar from "../Sidebar/Sidebar";
import Spinner from "../../../../components/UI/Spinner";

import { updateObject } from "../../../../shared/utility";
import { getPost } from "../../../../store/actions/frontend/posts";
import { State } from "@/src/store";
import { Post as PostType } from "@/src/types/post";

class Post extends Component<
    State & {
        get: (slug1: string, slug2: string) => void;
        match: { params: { postCategorySlug: string; slug: string } };
    }
> {
    componentDidMount() {
        this.props.get(
            this.props.match.params.postCategorySlug,
            this.props.match.params.slug
        );
    }

    render() {
        if (!this.props.frontend?.posts) return;
        const {
            frontend: {
                posts: { loading, message, error, post, posts },
            },
        } = this.props;
        let content;
        const lang = localStorage.getItem("lang") as string;

        const feedback = <Feedback message={message} />;
        const errors = (
            <>
                <Error err={error} />
            </>
        );

        if (loading)
            content = (
                <>
                    <Banner
                        items={[
                            {
                                to:
                                    "/post-categories/" +
                                    this.props.match.params.postCategorySlug +
                                    "/posts",
                                content: "Blog",
                            },
                        ]}
                        title="Loading..."
                    />

                    <Spinner />
                </>
            );
        else if (post) {
            let { author, title, photo, body, post_category } = post;

            content = (
                <>
                    <Banner
                        items={[
                            {
                                to:
                                    "/post-categories/" +
                                    this.props.match.params.postCategorySlug +
                                    "/posts",
                                content: post_category.name[lang],
                            },
                        ]}
                        title={title[lang]}
                    />

                    <PresentationalContainer>
                        <div className="py-5">
                            <Container>
                                <Row>
                                    <Col lg={9}>
                                        <span className="text-decoration-none text-700 h3">
                                            {title[lang]}
                                        </span>
                                        <p>
                                            Written by{" "}
                                            <span className="text-700">
                                                {author}
                                            </span>
                                        </p>

                                        <div className="d-flex align-items-center mb-3">
                                            Rate this item
                                            <Stars />
                                        </div>

                                        <div
                                            className="embed-responsive embed-responsive-16by9 my-4"
                                            style={{
                                                background:
                                                    'url("' +
                                                    photo +
                                                    '") no-repeat center',
                                                backgroundSize: "cover",
                                            }}
                                        />

                                        <div
                                            className="mb-4"
                                            dangerouslySetInnerHTML={{
                                                __html: body[lang],
                                            }}
                                        />
                                    </Col>

                                    <Sidebar
                                        posts={posts?.map(
                                            (post) =>
                                                updateObject(post, {
                                                    title: post.title[lang],
                                                }) as PostType
                                        )}
                                    />
                                </Row>
                            </Container>
                        </div>
                    </PresentationalContainer>
                </>
            );
        }

        return (
            <Col xs={12} className="Blog p-0">
                {feedback}
                {errors}
                {content}
            </Col>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    get: (postCategorySlug: string, slug: string) =>
        dispatch(getPost(postCategorySlug, slug) as unknown as UnknownAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
