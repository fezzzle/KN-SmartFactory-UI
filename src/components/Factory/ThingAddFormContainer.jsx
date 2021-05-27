import ThingAddForm from "./ThingAddForm";
import { Card, CardBody, Button } from "reactstrap";

const ThingAddFormContainer = () => {
  return (
    <div className="content">
      <Card>
        <CardBody>
          <ThingAddForm
            onSubmit={(values, formikHelpers) => {
              try {
                console.log("values from productionLineAddForm are: ", values);
                formikHelpers.setSubmitting(true);
              } catch (errors) {
                console.log('errors', errors)
                return Object.entries(errors).forEach(([field, error]) => {
                  console.log('field', field)
                  formikHelpers.setFieldError(field, error[0]);
                });
              }
              // formikHelpers.setSubmitting(false);
            }}
          />
          <Button className="float-left mr-2" color="info">
            Add a new device to a Thing
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
