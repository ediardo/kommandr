import React from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';

const Share = (props) => {
  const { embed, url } = props;
  return (
    <Form>
      <FormGroup>
        <Label for="url">URL</Label>
        <Input type="text" name="url" id="url" defaultValue={url} />
      </FormGroup>
      <FormGroup>
        <Label for="embed">Embed</Label>
        <Input type="text" name="url" id="embed" defaultValue={embed} />
      </FormGroup>
    </Form>
  )
}

export default Share;
