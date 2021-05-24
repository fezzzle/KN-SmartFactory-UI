import ThingAddForm from "./ThingAddForm";
import { Card, CardBody, Button } from "reactstrap";

const ThingAddFormContainer = () => {
  return (
    <div className="content">
      <Card>
        <CardBody>
          <ThingAddForm />
          <Button className="float-left mr-2" color="info">
            Add a new device to a Thing
          </Button>
          <Button className="float-left mr-2" color="primary">
            Save and go back
          </Button>
          <Button className="float-left mb-2" color="warning">
            Go back without saving
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ThingAddFormContainer;
