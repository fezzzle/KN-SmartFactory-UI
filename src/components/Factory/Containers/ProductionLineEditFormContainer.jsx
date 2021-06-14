import ProductionLineEditForm from "../Components/ProductionLineEditForm";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import { patchProductionLineData } from "../../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const ProductionLineEditFormContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("history:", history);
  const stateData = useSelector((state) => state.factory);
  console.log("stateData:", stateData);

  const getFactory = stateData.filter(
    (factory) => String(factory.id) === String(props.location.state.factoryId)
  );
  const getProductionLineIndex = getFactory[0].production_line.findIndex(
    (line) => String(line.id) === String(props.match.params.id)
  );

  const filteredArray = getFactory[0].production_line.filter(
    (pLine) => String(pLine.id) !== String(props.match.params.id)
  );

  console.log("filteredArray:", filteredArray);

  const editFactory = (values) => {
    const newArray = getFactory[0].production_line;
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
        <CardTitle><h3>Edit production line data</h3></CardTitle>
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
            pLineDataFields={filteredArray[0]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductionLineEditFormContainer;
