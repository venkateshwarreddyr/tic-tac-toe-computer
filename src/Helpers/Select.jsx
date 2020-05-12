import React from "react";
import { Form } from "react-bootstrap";
const Select = ({ name, label, error, onChange, values, inline }) => {
  return (
    <Form.Group
      // inline={inline}
      controlId="formBasic"
      className="form-select"
    >
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        onChange={onChange}
        defaultValue={""}
      >
        <option value="" key="" onClick={() => this.onClick("")}></option>
        {values.map(function(element) {
          return (
            <option
              value={element[1]}
              key={element[1]}
              onClick={() => this.onClick(element[1])}
            >
              {element[0]}
            </option>
          );
        })}
      </Form.Control>
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
};

export default Select;
