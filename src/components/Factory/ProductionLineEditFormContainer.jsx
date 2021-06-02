import ProductionLineEditForm from "./ProductionLineEditForm";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import store from "../../store/store";
import { patchFactoryData } from "../../store/actions";
import { useDispatch } from "react-redux";

const ProductionLineEditFormContainer = (props) => {
  console.log("ProductionLineEditFormContainerprops:", props);
  const dispatch = useDispatch();
  const history = useHistory();
  const storeState = store.getState();

  const editFactory = (values) => {
    const getFactory = storeState.factory.filter(
      (factory) => String(factory.id) === props.location.state.factoryId
    );
    const getProductionLineIndex = getFactory[0].production_line.findIndex(
      (line) => String(line.id) === props.match.params.id
    );
    const newArray = getFactory[0].production_line;

    const filteredArray = getFactory[0].production_line.filter(
      (pLine) => pLine.id !== Number(props.match.params.id)
    );
    const newProductionLineData = {
      production_line: [
        ...filteredArray,
        {
          ...newArray[getProductionLineIndex],
          name: values.name,
          line_number: values.line_number,
        },
      ],
    };

    dispatch(patchFactoryData(getFactory[0].id, newProductionLineData));
    // console.log("storeState:", storeState);
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

export default ProductionLineEditFormContainer;
