import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';

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

const FactoryAddForm = ({ project, onSubmit }) => (
    <Formik
        initialValues={{
            factory_name: "Some candy factory",
            factory_location: "Valga"
        }}
        validationSchema={Yup.object().shape({
            factory_name: Yup.string()
                .min(0)
                .required()
                .label('Factory name'),
            factory_location: Yup.string()
                .min(0)
                .required()
                .label('Factory Location'),
        })}
        onSubmit={onSubmit}
    >
        {({ touched, errors, isSubmitting }) => (
            <Form>
                <FormField
                    name="factory_name"
                    label="Factory name"
                    touched={touched}
                    errors={errors}
                />
                <FormField
                    name="factory_location"
                    label="Factory Location"
                    touched={touched}
                    errors={errors}
                />
                {/* <Button
                    id="editProjectFormSubmitButton"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                    touched={touched}
                >
                    UPDATE
                </Button> */}
            </Form>
        )}
    </Formik>
);

export default FactoryAddForm;