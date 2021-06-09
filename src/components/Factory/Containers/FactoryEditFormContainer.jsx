import FactoryEditForm from "../Components/FactoryEditForm";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import store from "../../../store/store";
import { editFactoryData } from "../../../store/actions/actions";
import { useDispatch } from "react-redux";

const FactoryEditFormContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const storeState = store.getState();

  const editFactory = (values) => {
    const getFactory = storeState.factory.filter(
      (factory) => String(factory.id) === props.match.params.id
    );
    const newData = {
      name: values.name,
      country: values.country,
      city: values.city,
    };
    console.log("newData:", newData);

    console.log("getFactory:", getFactory[0].id);

    dispatch(editFactoryData(getFactory[0].id, newData));
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
                return Object.entries(errors).forEach(([field, error]) => {
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
