import React from "react";
import TextField from "@material-ui/core/TextField";
import { Rate, Spin, message } from "antd";
import api from "../../utils/Api";
import Button from "@material-ui/core/Button";

const Feedback = () => {
  const initialFormValues = {
    rating: 5,
    text: ""
  };
  const [values, setValues] = React.useState(initialFormValues);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = name => event => {
    const value = event.target ? event.target.value : event;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.request("feedback", { method: "post", data: values });
      message.success("Success");
      setValues(initialFormValues);
    } catch (e) {
      message.error(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Spin tip="Loading..." spinning={isLoading} delay={500}>
      <Rate value={values.rating} onChange={handleChange("rating")} />
      <br />
      <TextField
        multiline
        label="Text"
        rowsMax="4"
        value={values.text}
        onChange={handleChange("text")}
        margin="normal"
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Spin>
  );
};

export default Feedback;
