import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import FormField from "../FormField/FormField";
import Modal from "../Modal/Modal";

export type FilterValue = {
  field: string;
  value: string;
};

export type Filter = {
  field: string;
  label?: string;
  options?: {
    label: string;
    value: string;
  }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  filterOptions: Filter[];
  filters: FilterValue[];
  setFilters: (filters: FilterValue[]) => void;
};

const FiltersModal = ({
  open,
  onClose,
  filterOptions,
  filters,
  setFilters,
}: Props) => {
  const onSubmit = (values: any) => {
    console.log("values", values);
    const newFilters = Object.keys(values)
      .map((field) => ({
        field,
        value: values[field],
      }))
      .filter(({ value }) => value);
    setFilters(newFilters);
    onClose();
  };

  const getInitialValues = (): any => {
    let initialValues: any = {};
    filterOptions.forEach((filter) => {
      initialValues[filter.field] = filters.find(
        (filterValue) => filterValue.field === filter.field
      )?.value;
    });
    return initialValues;
  };

  const selectOptions = (filter: Filter) => {
    if (!filter.options) return undefined;
    const options = [{ label: "None", value: "" }, ...filter.options];
    return options?.map((option) => ({
      id: option.value,
      name: option.label,
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 style={{ marginTop: 0 }}>Filters</h2>
      <Formik onSubmit={onSubmit} initialValues={getInitialValues()}>
        <Form>
          {filterOptions.map((filter: Filter, i: number) => (
            <FormField
              key={i}
              label={filter.label ?? filter.field}
              name={filter.field}
              selectOptions={selectOptions(filter)}
            />
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default FiltersModal;
