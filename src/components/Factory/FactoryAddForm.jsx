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

const FactoryAddForm = ({ onSubmit, goBack }) => (
  <Formik
    initialValues={{
      name: "Some candy factory",
      country: "Estonia",
      city: "Valga",
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().min(0).required().label("Factory name"),
      country: Yup.string().min(0).required().label("Country"),
      city: Yup.string().min(0).required().label("Factory Location"),
    })}
    onSubmit={onSubmit}
  >
    {({ touched, errors, isSubmitting }) => (
      <Form>
        <FormField
          name="name"
          label="Factory name"
          touched={touched}
          errors={errors}
        />
        <FormField
          name="country"
          label="Country"
          touched={touched}
          errors={errors}
        />
        <FormField
          name="city"
          label="Factory Location"
          touched={touched}
          errors={errors}
        />
        <Button
          id="addFactoryFormSubmitButton"
          type="submit"
          color="primary"
          disabled={isSubmitting}
          touched={touched}
        >
          Save factory
        </Button>
        <Button
          id="addFactoryFormGoBackButton"
          color="warning"
          disabled={isSubmitting}
          touched={touched}
          onClick={goBack}
        >
          Go back
        </Button>
      </Form>
    )}
  </Formik>
);

export default FactoryAddForm;
