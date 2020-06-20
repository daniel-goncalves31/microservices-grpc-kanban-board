import { useFormik } from "formik";
import React from "react";
import {
  NewProjectRequest as NewProject,
  Priority,
} from "../../../graphql/generated";
import { newProjectValidationSchema } from "../../../utils/validation-schemas/new-project";
import Input from "../../shared/Input";
import Modal from "../../shared/Modal";
import Select from "../../shared/Select";

interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectModal: React.FC<Props> = ({ setModalIsOpen }) => {
  const onSubmit = async (newProjectInput: NewProject) => {
    console.log(newProjectInput);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const formik = useFormik<NewProject>({
    initialValues: {
      name: "",
      priority: Priority.Medium,
    },
    onSubmit,
    validationSchema: newProjectValidationSchema,
  });

  return (
    <Modal title="Project" onSubmit={formik.handleSubmit} onCancel={closeModal}>
      <Input
        label="Project Name"
        type="text"
        name="name"
        error={formik.errors.name}
        touched={formik.touched.name}
        value={formik.values.name}
        // disabled={loading}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Select
        label="Priority"
        loading={false}
        name="priority"
        onChange={(priority: any) => {
          formik.values.priority = priority.value;
        }}
        type={Priority}
        initialValue={{ value: Priority.Medium, label: Priority.Medium }}
      />
    </Modal>
  );
};

export default React.memo(ProjectModal);
