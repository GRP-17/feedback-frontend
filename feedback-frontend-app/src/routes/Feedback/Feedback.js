import React from "react";
import { Input, Rate, Spin, message, Button } from "antd";
import api from "../../utils/Api";

const Feedback = () => {
  const TEXT_MAX_LENGTH = 5000;
  const initialFormValues = {
    rating: 5,
    text: ""
  };
  const [values, setValues] = React.useState(initialFormValues);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (name, value) => {
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
      <Rate
        value={values.rating}
        onChange={v => {
          handleChange("rating", v);
        }}
      />
      <br />
      <Input.TextArea
        rows={4}
        placeholder="Details..."
        value={values.text}
        maxLength={TEXT_MAX_LENGTH}
        onChange={e => {
          handleChange("text", e.target.value);
        }}
      />
      <br />
      <div>{`${values.text.length}/${TEXT_MAX_LENGTH}`}</div>
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Spin>
  );
};

export default Feedback;
