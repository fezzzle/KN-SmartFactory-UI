import ProductionLineAddForm from "./ProductionLineAddForm";
import { Card, CardBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { updateFactoryData } from "../../store/actions";
import store from "../../store/store";

const ProductionLineAddFormContainer = (props) => {
  const storeState = store.getState();
  const dispatch = useDispatch();

  const addProductionLine = (values) => {
    const getCurrentFactory = storeState.factory.filter(factory => String(factory.id) === props.match.params.id)
    console.log('getCurrentFactory:', getCurrentFactory)
    let data = {
        id: Math.random().toString(36).substr(2, 9),
        name: values.name,
        line_number: values.line_number,
        thing: [],
    };
    getCurrentFactory[0].production_line.push(data)
    dispatch(updateFactoryData(getCurrentFactory[0]));
  };
  return (
    <div className="content">
      <Card>
        <CardBody>
          <ProductionLineAddForm
            onSubmit={(values, formikHelpers) => {
              try {
                formikHelpers.setSubmitting(true);
                addProductionLine(values);
              } catch (errors) {
                return Object.entries(errors).forEach(([field, error]) => {
                  formikHelpers.setFieldError(field, error[0]);
                });
              }
              // formikHelpers.setSubmitting(false);
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductionLineAddFormContainer;
