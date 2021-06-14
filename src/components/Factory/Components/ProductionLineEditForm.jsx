import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Input, FormGroup, Label, FormFeedback } from "reactstrap";
import * as Yup from "yup";

/**
 * Custom form field component to make using Reactstrap and Formik together
 * easier and less verbose.
 */
const FormField = ({ label, name, touched, errors }) => (
  <FormGroup>
    <Label for={name}>{label}</Label>
    <Input
      type="text"
      name={name}
      id={name}
      tag={Field}
      invalid={touched[name] && !!errors[name]}
      min={0}
      required
    />
    {touched[name] && errors[name] && (
      <FormFeedback>{errors[name]}</FormFeedback>
    )}
  </FormGroup>
);

const ProductionLineEditForm = ({ onSubmit, goBack, pLineDataFields }) => (
  <Formik
    // initialValues={{
    //   line_number: pLineDataFields["line_number"],
    //   name: pLineDataFields["name"],
    // }}
    initialValues={{
      line_number: 123,
      name: "tere",
    }}
    validationSchema={Yup.object().shape({
      line_number: Yup.string()
        .min(0)
        .required()
        .label("Production Line Number"),
      name: Yup.string().min(0).required().label("Production line name"),
    })}
    onSubmit={onSubmit}
  >
    {({ touched, errors, isSubmitting }) => (
      <Form>
        <FormField
          name="line_number"
          label="Production Line Number"
          touched={touched}
          errors={errors}
        />
        <FormField
          name="name"
          label="Production line name"
          touched={touched}
          errors={errors}
        />
        <Button
          id="addProductionFormSubmitButton"
          type="submit"
          color="primary"
          disabled={isSubmitting}
          touched={touched}
        >
          Save a production line
        </Button>
        {goBack === undefined ? null : (
          <Button
            id="addProductionFormSubmitButton"
            type="button"
            color="warning"
            // disabled={isSubmitting}
            touched={touched}
            onClick={goBack}
          >
            Go back
          </Button>
        )}
      </Form>
    )}
  </Formik>
);

export default ProductionLineEditForm;
