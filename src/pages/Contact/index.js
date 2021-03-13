import React, { useState } from "react";
import DashTitle from "../../components/util/dashTitle";
import ContactCardList from "../../components/util/cards/contactCardList";
import ContactCard from "../../components/util/cards/contactCard";
import { update } from "../../components/util/form/formActions";
import FormField from "../../components/util/form/formfield";
import Button from "../../components/util/button";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const formdata = {
  firstName: {
    element: "input",
    value: "",
    config: {
      name: "firstName",
      type: "text",
      placeholder: "",
      label: "First Name",
    },
    validation: {
      required: true,
    },
    valid: false,
    validationMessage: "",
    showlabel: true,
  },
  lastName: {
    element: "input",
    value: "",
    config: {
      name: "lastName",
      type: "text",
      placeholder: "",
      label: "Last Name",
    },
    validation: {
      required: true,
    },
    valid: false,
    validationMessage: "",
    showlabel: true,
  },
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
  subject: {
    element: "input",
    value: "",
    config: {
      name: "subject",
      type: "text",
      placeholder: "",
      label: "Subject",
    },
    validation: {
      required: true,
    },
    valid: false,
    validationMessage: "",
    showlabel: true,
  },
  message: {
    element: "textarea",
    value: "",
    config: {
      name: "message",
      placeholder: "",
      type: "text",
      label: "Message",
      rows: "2",
    },
    validation: {
      required: true,
    },
    valid: false,
    validationMessage: "",
    showlabel: true,
  },
};

export default function Contact() {
  const [formData, setFormData] = useState(formdata);

  const updateForm = (element) => {
    const newFormdata = update(element, formData, "login");
    setFormData(newFormdata);
  };

  const customerService = [
    {
      title: "Flagship Store",
      text: ["500 Terry Francois St.", "San Francisco, CA 94158"],
    },
    {
      title: "Opening Hours",
      text: ["Monday-Friday", "9:00am - 7:00pm EST"],
    },
    {
      title: "Contact Us",
      text: ["1-800-000-0000", "info@mysite.com"],
    },
  ];
  const Stockists = [
    {
      title: "",
      text: [
        "500 Terry Francois St.",
        "San Francisco, CA 94158",
        "123-456-7890",
      ],
    },
    {
      title: "",
      text: [
        "500 Terry Francois St.",
        "San Francisco, CA 94158",
        "123-456-7890",
      ],
    },
    {
      title: "",
      text: [
        "500 Terry Francois St.",
        "San Francisco, CA 94158",
        "123-456-7890",
      ],
    },
  ];

  const inquiries = {
    title: "Inquiries",
    text:
      "For questions regarding our products and services you can also contact us by filling out the form below",
  };

  return (
    <div className="contact">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="SlideOut"
      >
        <div className="main-title">GET IN TOUCH</div>
      </ReactCSSTransitionGroup>

      <main>
        <DashTitle title="CUSTOMER SERVICE" />
        <ContactCardList data={customerService} />
        <div className="inquiries">
          <ContactCard title={inquiries.title} text={inquiries.text} />
        </div>
        <form className="contact-form">
          <div className="inline-inputs">
            <FormField
              id={"firstName"}
              formdata={formData.firstName}
              change={(element) => updateForm(element)}
            />

            <FormField
              id={"lastName"}
              formdata={formData.lastName}
              change={(element) => updateForm(element)}
            />
          </div>
          <FormField
            id={"email"}
            formdata={formData.email}
            change={(element) => updateForm(element)}
          />
          <FormField
            id={"subject"}
            formdata={formData.subject}
            change={(element) => updateForm(element)}
          />
          <FormField
            id={"message"}
            formdata={formData.message}
            change={(element) => updateForm(element)}
          />
          <Button title="Submit" type="btn-main" />
        </form>
        <DashTitle title="STOCKISTS" />
        <ContactCardList data={Stockists} />
        <ContactCardList data={Stockists} />
        <div className="finish"></div>
      </main>
    </div>
  );
}
