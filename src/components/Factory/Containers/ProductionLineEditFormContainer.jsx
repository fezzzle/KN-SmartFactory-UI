import ProductionLineEditForm from "../Components/ProductionLineEditForm";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import store from "../../../store/store";
import { patchProductionLineData } from "../../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const ProductionLineEditFormContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const storeState = store.getState();
  const stateData = useSelector((state) => state.factory);

  const editFactory = (values) => {
    const getFactory = stateData.filter(
      (factory) => String(factory.id) === String(props.location.state.factoryId)
    );
    const getProductionLineIndex = getFactory[0].production_line.findIndex(
      (line) => String(line.id) === String(props.match.params.id)
    );
    const newArray = getFactory[0].production_line;

    const filteredArray = getFactory[0].production_line.filter(
      (pLine) => String(pLine.id) !== String(props.match.params.id)
    );
    const newProductionLineData = [
      ...filteredArray,
      {
        ...newArray[getProductionLineIndex],
        name: values.name,
        line_number: values.line_number,
      },
    ];
    dispatch(patchProductionLineData(getFactory[0].id, newProductionLineData));
  };
  return (
    <div className="content">
      <Card>
        <CardBody>
          <ProductionLineEditForm
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

export default ProductionLineEditFormContainer;
