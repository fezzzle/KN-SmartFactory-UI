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
            name: "Some candy factory",
            description: "Some description of thing",
            production_location: 1,
            device_group: "10",
            devices: "Some devices shown somehow"
        }}
        validationSchema={Yup.object().shape({
            factory_name: Yup.string()
                .min(0)
                .required()
                .label('Thing name'),
            factory_location: Yup.string()
                .min(0)
                .required()
                .label('Thing description'),
            local_time: Yup.number()
                .min(0)
                .required()
                .label('Location on a production line'),
            factory_location: Yup.string()
                .min(0)
                .required()
                .label('Devices'),
        })}
        onSubmit={onSubmit}
    >
        {({ touched, errors, isSubmitting }) => (
            <Form>
                <FormField
                    name="name"
                    label="Thing name"
                    touched={touched}
                    errors={errors}
                />
                <FormField
                    name="description"
                    label="Thing description"
                    touched={touched}
                    errors={errors}
                />
                <FormField
                    name="production_location"
                    label="Location on a production line"
                    touched={touched}
                    errors={errors}
                />
                <FormField
                    name="device_group"
                    label="Thing device group"
                    touched={touched}
                    errors={errors}
                />
                <FormField
                    name="devices"
                    label="Things devices"
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