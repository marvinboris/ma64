import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Col,
    Container,
    Row,
    Input,
    Button,
    Form,
    FormGroup,
} from "reactstrap";
import { Dispatch, UnknownAction } from "redux";

import Feedback from "../../../components/Feedback/Feedback";
import Error from "../../../components/Error/Error";
import Spinner from "../../../components/UI/Spinner";
import Banner from "../../../components/UI/Banner/Banner";
import ArticleCard from "../../../components/UI/ArticleCard/ArticleCard";
import PresentationalContainer from "../../../components/UI/PresentationalContainer/PresentationalContainer";

import { updateObject } from "../../../shared/utility";
import { getProducts } from "../../../store/actions/frontend/products";
import { State } from "@/src/store";

class Products extends Component<State & { get: () => void }> {
    componentDidMount() {
        this.props.get();
    }

    render() {
        if (!this.props.content || !this.props.frontend?.products) return;
        const {
            content: {
                cms: {
                    pages: {
                        frontend: {
                            pages: {
                                products: { banner, form },
                            },
                        },
                    },
                },
            },
            frontend: {
                products: {
                    loading,
                    message,
                    error,
                    products = [],
                    brands = [],
                },
            },
        } = this.props;
        let content;
        const lang = localStorage.getItem("lang");

        const feedback = <Feedback message={message} />;
        const errors = (
            <>
                <Error err={error} />
            </>
        );

        const articleCards = products.map((product) => (
            <ArticleCard
                key={JSON.stringify(product)}
                {...updateObject(product, {
                    name: product.name[lang as string],
                    description: product.description[lang as string],
                })}
            />
        ));

        if (loading) content = <Spinner />;
        else
            content = (
                <Row>
                    <Col lg={9}>
                        <Form inline className="mb-5">
                            <Input
                                type="search"
                                className="mb-2 mr-sm-2"
                                id="search"
                            />
                            <Button
                                type="submit"
                                className="mb-2 mr-sm-2"
                                color="dark"
                            >
                                {form.go}
                            </Button>
                            <Button
                                type="reset"
                                className="mb-2 mr-sm-2"
                                color="light"
                            >
                                {form.reset}
                            </Button>
                            <Input
                                type="select"
                                className="mb-2"
                                name="sort"
                                id="sort"
                            >
                                <option>{form.sort_product_by}</option>
                            </Input>
                        </Form>

                        <Row>{articleCards}</Row>
                    </Col>

                    <Col>
                        <div className="mb-4">
                            <h3>{form.filter_by_price}</h3>
                            <Input id="range" type="range" min={0} max={1000} />
                        </div>

                        <div className="mb-4">
                            <h3>{form.filter_by_brands}</h3>
                            <FormGroup>
                                {brands.map((brand) => (
                                    <Input
                                        key={JSON.stringify(brand)}
                                        type="switch"
                                        id={brand.id}
                                        name="brands[]"
                                        label={brand.name}
                                    />
                                ))}
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            );

        return (
            <Col xs={12} className="Products p-0">
                <Banner title={banner.title} />

                <PresentationalContainer>
                    <div className="py-5">
                        <Container>
                            {feedback}
                            {errors}
                            {content}
                        </Container>
                    </div>
                </PresentationalContainer>
            </Col>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    get: () => dispatch(getProducts() as unknown as UnknownAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
