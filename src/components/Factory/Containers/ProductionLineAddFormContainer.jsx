import ProductionLineAddForm from "../Components/ProductionLineAddForm";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { updateFactoryData } from "../../../store/actions/actions";

const ProductionLineAddFormContainer = (props) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.factory);
  

  const addProductionLine = (values) => {
    const getCurrentFactory = stateData.filter(factory => String(factory.id) === props.match.params.id)
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
          <CardTitle>
            <h3 className="mt-4">
              Add A new production line
            </h3>
          </CardTitle>
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
            goBack={history.goBack}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductionLineAddFormContainer;
