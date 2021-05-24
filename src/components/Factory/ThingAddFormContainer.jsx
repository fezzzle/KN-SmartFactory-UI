import ThingAddForm from "./ThingAddForm";
import { Card, CardBody, Button } from "reactstrap";

const ThingAddFormContainer = () => {
  return (
    <div className="content">
      <Button className="float-left mb-2" color="primary">
        Go back without saving
      </Button>
      <Card>
        <CardBody>
          <ThingAddForm />
          <Button className="float-left mr-2" color="primary">
            Save and go back
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ThingAddFormContainer;
