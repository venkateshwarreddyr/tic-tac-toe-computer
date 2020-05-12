import React from "react";
import { Form } from "react-bootstrap";
const Input = ({ name, label, value, error, onChange, type }) => {
  return (
    <Form.Group controlId="formBasicPhone">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        //   placeholder="Enter your phone number"
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <Form.Text className="text-muted">
        {/* We'll never share your phone number with anyone else. */}
      </Form.Text>
    </Form.Group>
  );
};

export default Input;
