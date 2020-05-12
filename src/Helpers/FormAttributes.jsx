import React, { Component } from "react";
import Joi from "joi-browser";
import { Button } from "react-bootstrap";
import Input from "./Input";
import Check from "./Check";
import Select from "./Select";
import TextArea from "./TextArea";
class FormAttributes extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    console.log(this.state.data);
    if (!error) return null;
    const errors = {};
    for (let x of error.details) {
      errors[x.path[0]] = x.message;
      console.log(x);
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    Joi.validate(obj, this.schema);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("helloooss");
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log(this.state.errors);
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    console.log(this.state);
  };
  handleChangeForRadio = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.id;
    this.setState({ data });
    console.log(this.state);
  };
  renderButton = label => {
    return (
      <Button variant="primary" type="submit">
        {label}
      </Button>
    );
  };

  renderInput = (name, label, type = "input") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderTextArea = (name, label, type = "input") => {
    console.log(name, label);
    const { data, errors } = this.state;
    return (
      <TextArea
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
  renderCheck = (
    name,
    id,
    label,
    type = "checkbox",
    defaultChecked = false
  ) => {
    const { data, errors } = this.state;
    return (
      <Check
        type={type}
        name={name}
        label={label}
        id={id}
        onChange={this.handleChangeForRadio}
        checked={defaultChecked}
        error={errors[name]}
      />
    );
  };
  renderSelect = (name, label, values, inline = false) => {
    const { data, errors } = this.state;
    return (
      <Select
        values={values}
        name={name}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        inline={inline}
      />
    );
  };
}

export default FormAttributes;
