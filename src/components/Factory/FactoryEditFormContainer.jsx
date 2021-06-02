import FactoryEditForm from "./FactoryEditForm";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import store from "../../store/store";
import { patchFactoryData } from "../../store/actions";
import { useDispatch } from "react-redux";

const FactoryEditFormContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const storeState = store.getState();
  console.log("history is in FactoryEditContainer:", history);

  const editFactory = (values) => {
    const getFactory = storeState.factory.filter(
      (factory) => String(factory.id) === props.match.params.id
    );
    const newData = {
      factory_location: {
        name: values.name,
        country: values.country,
        city: values.city,
      },
    };

    dispatch(patchFactoryData(getFactory[0].id, newData));
  };
  return (
    <div className="content">
      <Card>
        <CardBody>
          <FactoryEditForm
            onSubmit={(values, formikHelpers) => {
              try {
                formikHelpers.setSubmitting(true);
                editFactory(values);
              } catch (errors) {
                console.log("errors", errors);
                return Object.entries(errors).forEach(([field, error]) => {
                  console.log("field", field);
                  formikHelpers.setFieldError(field, error[0]);
                });
              }
              // formikHelpers.setSubmitting(false);
            }}
            goBack={history.goBack}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default FactoryEditFormContainer;
