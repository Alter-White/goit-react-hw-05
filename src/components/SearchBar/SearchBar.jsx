import { Field, Form, Formik } from "formik";
import { Toaster, toast } from "react-hot-toast";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values, { resetForm }) => {
    const query = values.query;
    if (!query || query.trim() === "") {
      toast.error("Sorry, there is no search query!");
    } else {
      onSearch(query);
      resetForm();
    }
  };

  return (
    <header>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Field
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Type to search..."
              autoFocus
            />
            <button type="submit">Go!</button>
          </Form>
        )}
      </Formik>
      <Toaster />
    </header>
  );
};

export default SearchBar;
