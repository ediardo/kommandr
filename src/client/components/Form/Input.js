import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

export const InputUsername = ({ value, placeholder, onChange }) => {
  return (
    <FormGroup>
      <Label for="inputUsername">Username</Label>
      <Input type="text" value={value} onChange={(e) => onChange(e)} placeholder={placeholder} id="inputUsername" />
    </FormGroup>
  )
};

export const InputName = ({ value, placeholder, onChange }) => {
  return (
    <FormGroup>
      <Label for="inputName">Name</Label>
      <Input type="text" value={value} onChange={(e) => onChange(e)} placeholder={placeholder} id="inputName" />
    </FormGroup>
  )
};

export const InputWebsite = ({ value, placeholder, onChange }) => {
  return (
    <FormGroup>
      <Label for="inputWebsite">Website</Label>
      <Input type="text" value={value} onChange={(e) => onChange(e)} placeholder={placeholder} id="inputWebsite"/>
    </FormGroup>
  )
};

export const InputPassword = ({ value, placeholder, onChange }) => {
  return (
    <FormGroup>
      <Label for="inputPassword">Username</Label>
      <Input type="password" value={value} onChange={(e) => onChange(e)} placeholder={placeholder} id="inputPassword"/>
    </FormGroup>
  )
};

export const InputEmail = ({ value, placeholder, onChange }) => {
  return (
    <FormGroup>
      <Label for="inputEmail">Email</Label>
      <Input type="password" value={value} onChange={(e) => onChange(e)} placeholder={placeholder} id="inputEmail"/>
    </FormGroup>
  )
}