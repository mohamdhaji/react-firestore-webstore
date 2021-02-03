import React, { useState } from "react";
import FormField from "../../util/form/formfield";
import { update } from "../../util/form/formActions";
import Button from "../../util/button";
import IdentityProviderList from "../../util/identityProviderList";
const formdata = {
  email: {
    element: "input",
    value: "",
    config: {
      name: "email_input",
      type: "email",
      placeholder: "",
      label: "Email",
    },
    validation: {
      required: true,
      email: true,
    },
    valid: false,
    validationMessage: "",
    showlabel: true,
  },
  password: {
    element: "input",
    value: "",
    config: {
      name: "password_input",
      type: "password",
      placeholder: "",
      label: "password",
    },
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    validationMessage: "",
    showlabel: true,
  },
};

export default function OauthWithEmail(props) {
  const [formData, setFormData] = useState(formdata);

  const updateForm = (element) => {
    const newFormdata = update(element, formData, "login");
    setFormData(newFormdata);
  };

  return (
    <div className="oauth-email">
      <FormField
        id={"email"}
        formdata={formData.email}
        change={(element) => updateForm(element)}
      />
      <FormField
        id={"password"}
        formdata={formData.password}
        change={(element) => updateForm(element)}
      />
      <Button
        onClick={() =>
          props.onClick(formData.email.value, formData.password.value)
        }
        title={props.type}
        type="btn-v3"
      />

      <div className="or-divider email-oauth-dash">
        <span className="dash"></span>
        <span>{props.text}</span>
        <span className="dash"></span>
      </div>

      <IdentityProviderList />
    </div>
  );
}
