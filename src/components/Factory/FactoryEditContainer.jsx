import React, { useState, useRef } from "react";
// import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardLink,
} from "reactstrap";

const FactoryEditContainer = () => {
  return (
    <div className="content">
      <Card style={{ width: "25rem", height: "30rem" }} className="text-center">
        <CardBody>
          <CardText><h2>Factory name: Cola</h2></CardText>
          <CardText><h2>Production Lines: 3</h2></CardText>
          <CardText><h2>Things: 10</h2></CardText>
          <CardText><h2>Devices: 100</h2></CardText>
        </CardBody>
        <Card style={{ width: "25rem" }} className="text-center">
          <CardBody>
            <CardTitle>Special title treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button href="/#" color="primary">
                Edit Factory
            </Button>
          </CardBody>
        </Card>
      </Card>
    </div>
  );
};

export default FactoryEditContainer;
