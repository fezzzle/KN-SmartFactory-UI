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

const ProductionLineAddForm = ({ onSubmit, goBack }) => (
  <Formik
    initialValues={{
      name: "Some application for line",
      line_number: 1,
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().min(0).required().label("Production line name"),
      line_number: Yup.number().min(0).max(100).positive().integer().required().label("Production Line Number"),
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

export default ProductionLineAddForm;
