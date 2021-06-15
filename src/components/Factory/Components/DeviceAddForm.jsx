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

const DeviceAddForm = ({ onSubmit, goBack }) => (
  <Formik
    initialValues={{
      name: "Humidity sensor",
      SERIAL_NUMBER: "240938423094932893024",
      image: "Image location",
      model: "Model 832891",
      status: "DEACTIVATED",
      alerts_messgages: "ALERT ALERT",
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().min(0).required().label("Name"),
      // SERIAL_NUMBER: Yup.number().min(0).required().label("Device serial number"),
      SERIAL_NUMBER: Yup.number().min(0).positive().integer().required().label("Device serial number"),
      image: Yup.string().min(0).required().label("Image location"),
      model: Yup.string().min(0).required().label("Device model"),
      status: Yup.string().min(0).required().label("Device status"),
      alerts_messgages: Yup.string().min(0).required().label("Device alerts"),
    })}
    onSubmit={onSubmit}
  >
    {({ touched, errors, isSubmitting }) => (
      <Form>
        <FormField
          name="name"
          label="Device name"
          touched={touched}
          errors={errors}
        />
        <FormField
          name="SERIAL_NUMBER"
          label="Device serial number"
          touched={touched}
          errors={errors}
        />
        <FormField
          name="image"
          label="Device image"
          touched={touched}
          errors={errors}
        />
        <FormField
          name="model"
          label="Device model"
          touched={touched}
          errors={errors}
        />
        <FormField
          name="status"
          label="Device status"
          touched={touched}
          errors={errors}
        />
        <FormField
          name="status"
          label="Device alerts_messgages"
          touched={touched}
          errors={errors}
        />
        <Button
          id="addDeviceFormSubmitButton"
          type="submit"
          color="primary"
          disabled={isSubmitting}
          touched={touched}
          // TODO: onclick save new thing with a device 
        >
          Save device
        </Button>
        <Button
          id="addFactoryFormGoBackButton"
          color="warning"
          // disabled={isSubmitting}
          touched={touched}
          onClick={goBack}
        >
          Go back
        </Button>
      </Form>
    )}
  </Formik>
);

export default DeviceAddForm;
