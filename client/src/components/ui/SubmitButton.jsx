import React, { useState, useEffect } from "react";
import { Button, Form } from "antd";
const SubmitButton = ({ form }) => {
  const [submitState, setSubmitState] = useState(false);

  const values = Form.useWatch([].form);
  //   console.log(values);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmitState(true);
        },
        () => {
          setSubmitState(false);
        }
      );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submitState}>
      Submit
    </Button>
  );
};

export default SubmitButton;
