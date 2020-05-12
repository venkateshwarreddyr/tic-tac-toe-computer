import React from "react";
import { Form } from "react-bootstrap";
const Check = ({ name, id, label, error, onChange, type, checked }) => {
  return (
    <Form.Group controlId="formBasic">
      <Form.Check
        custom
        type={type}
        id={id}
        name={name}
        label={label}
        onChange={onChange}
        defaultChecked={checked}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
};

export default Check;
