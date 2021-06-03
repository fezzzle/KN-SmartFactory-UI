/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Component } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange (event) {
    event.preventDefault();
    let newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };
  handleSubmit = () => {
    console.log(this.state)
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="userName" className="ms-2">
                            Username
                          </label>
                          <Input
                            placeholder="mamta"
                            id="usernName"
                            name="userName"
                            value={this.state.userName}
                            onChange={this.onChange}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail">
                            Email address
                          </label>
                          <Input
                            placeholder="mamta45@email.com"
                            type="email"
                            name="email"
                            value={this.state.email}
                            id="exampleInputEmail"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="firstName">First Name</label>
                          <Input
                            placeholder="Mamta"
                            name="firstName"
                            id="firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="lastName">Last Name</label>
                          <Input
                            placeholder="Jonnas"
                            name="lastName"
                            id="lastName"
                            value={this.state.lastName}
                            onChange={this.onChange}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label htmlFor="address">Address</label>
                          <Input
                            placeholder="Parnu mnt 32"
                            type="text"
                            name="address"
                            value={this.state.address}
                            id="address"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="city">City</label>
                          <Input
                            placeholder="Tallinn"
                            type="text"
                            value={this.state.city}
                            id="city"
                            name="city"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="country">Country</label>
                          <Input
                            placeholder="Estonia"
                            value={this.state.country}
                            type="text"
                            id="country"
                            name="country"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="postalCode">Postal Code</label>
                          <Input
                            placeholder="10141"
                            value={this.state.postalCode}
                            id="postalCode"
                            name="postalCode"
                            type="number"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/emilyz.jpg").default}
                      />
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
