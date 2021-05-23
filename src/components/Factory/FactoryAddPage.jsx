import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

import FactoryAddForm from "./FactoryAddForm";

const FactoryAddPage = ({ projects, fetchProjects, updateProject }) => {
//   const { id } = useParams();

  const history = useHistory();
//   useEffect(() => {
//     fetchProjects();
//   }, [fetchProjects]);

//   const project = projects.find((project) => project.id == id);

  return (
    <div className="content">
      <Card color="light">
        <CardBody>
          <FactoryAddForm/>
            {/* project={project}
            onSubmit={async (values, formikHelpers) => {
              try {
                await updateProject(id, values);
              } catch (errors) {
                return Object.entries(errors).forEach(([field, error]) => {
                  formikHelpers.setFieldError(field, error[0]);
                });
              }

              formikHelpers.setSubmitting(false);

              history.push("/dashboard");
            }} */}
          
        </CardBody>
      </Card>
    </div>
  );
};

export default FactoryAddPage;
