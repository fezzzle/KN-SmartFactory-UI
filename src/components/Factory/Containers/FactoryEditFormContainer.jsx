import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { editFactoryData } from "../../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import FactoryEditForm from "../Components/FactoryEditForm";

const FactoryEditFormContainer = (props) => {
  console.log("FactoryEditFormContainer props:", props);
  const dispatch = useDispatch();
  const history = useHistory();
  const stateData = useSelector((state) => state.factory);
  const [saveStatus, setSaveStatus] = useState(false);

  const getFactory = stateData.filter(
    (factory) => String(factory.id) === props.match.params.id
  );

  const editFactory = (values) => {
    const newData = {
      name: values.name,
      country: values.country,
      city: values.city,
    };
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
                setSaveStatus(true);
                editFactory(values);
              } catch (errors) {
                return Object.entries(errors).forEach(([field, error]) => {
                  formikHelpers.setFieldError(field, error[0]);
                });
              }
              // formikHelpers.setSubmitting(false);
            }}
            goBack={history.goBack}
            factoryDataFields={getFactory[0]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default FactoryEditFormContainer;
