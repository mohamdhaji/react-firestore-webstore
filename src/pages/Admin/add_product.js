import React, { Component } from "react";

import FormField from "../../components/util/form/formfield";
import { update } from "../../components/util/form/formActions";
import FileUpload from "../../components/util/form/fileupload";
import Button from "../../components/util/button";
import { createProduct } from "../../actions/productActions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { generateData } from "../../components/util/form/formActions";
class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      productName: {
        element: "input",
        value: "",
        config: {
          label: "Product name",
          name: "name_input",
          type: "text",
          placeholder: "Enter product name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      collection: {
        element: "select",
        value: "",
        config: {
          label: "Collection name",
          name: "collection_input",
          options: [
            { key: "phoneCases", value: "Phone Cases" },
            { key: "miniLeatherGoods", value: "Mini leather goods" },
            { key: "leatherBelts", value: "Leather Belts" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      bestSeller: {
        element: "select",
        value: "",
        bool: true,
        config: {
          label: " Best Sell, in stock",
          name: "bestSeller_input",
          options: [
            { key: true, value: true },
            { key: false, value: false },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Enter your description",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      quantity: {
        element: "input",
        value: "",
        config: {
          label: "Product quantity",
          name: "quantity_input",
          type: "number",
          placeholder: "Enter quantity",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product price",
          name: "price_input",
          type: "number",
          placeholder: "Enter your price",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      modelName: {
        element: "select",
        value: "",
        config: {
          label: "Product Model",
          name: "types_input",
          options: [
            { key: "iPhone X", value: "iPhone X" },
            { key: "iPhone XS", value: "iPhone XS" },
            { key: "Shoulder bag", value: "Shoulder bag" },
            { key: "Cross body", value: "Cross body" },
            { key: "Shopper Tote", value: "Shopper Tote" },
            { key: "Full Grain", value: "Full Grain" },
            { key: "Corrected Grain", value: "Corrected Grain" },
            { key: "Split", value: "Split" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      shipping: {
        element: "select",
        bool: true,
        value: "",
        config: {
          label: "Shipping",
          name: "shipping_input",
          options: [
            { key: true, value: true },
            { key: false, value: false },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      available: {
        element: "select",
        value: "",
        bool: true,
        config: {
          label: "Available, in stock",
          name: "available_input",
          options: [
            { key: true, value: true },
            { key: false, value: false },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },

      publish: {
        element: "select",
        value: "",
        bool: true,
        config: {
          label: "Publish",
          name: "publish_input",
          options: [
            { key: true, value: true },
            { key: false, value: false },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showlabel: false,
      },
    },
  };

 

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "products");
    if (element.id === "collection") {
      const modelName = { ...newFormdata["modelName"] };
      const key=element.event.target.value.replaceAll(" ","_")
      modelName.config.options = this.models[key];
    }
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  models = {
    Phone_Cases: [
      { key: "iPhone X", value: "iPhone X" },
      { key: "iPhone XS", value: "iPhone XS" },
    ],
    Mini_leather_goods: [
      { key: "Shoulder bag", value: "Shoulder bag" },
      { key: "Cross body", value: "Cross body" },
      { key: "Shopper Tote", value: "Shopper Tote" },
    ],
    Leather_Belts: [
      { key: "Full Grain", value: "Full Grain" },
      { key: "Corrected Grain", value: "Corrected Grain" },
      { key: "Split", value: "Split" },
    ],
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "products");

    this.props.createProduct(dataToSubmit);
  };

  imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formdata,
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formdata: newFormData,
    });
  };

  render() {
    return (
      <div id="add-product">
        <h1>Add product</h1>

        <form onSubmit={(event) => this.submitForm(event)}>
          <FileUpload imagesHandler={(images) => this.imagesHandler(images)} />

          <FormField
            id={"productName"}
            formdata={this.state.formdata.productName}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={"collection"}
            formdata={this.state.formdata.collection}
            change={(element) => this.updateForm(element)}
          />

          <FormField
            id={"bestSeller"}
            formdata={this.state.formdata.bestSeller}
            change={(element) => this.updateForm(element)}
          />

          <div className="form_devider"></div>

          <FormField
            id={"description"}
            formdata={this.state.formdata.description}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={"quantity"}
            formdata={this.state.formdata.quantity}
            change={(element) => this.updateForm(element)}
          />

          <FormField
            id={"price"}
            formdata={this.state.formdata.price}
            change={(element) => this.updateForm(element)}
          />

          <div className="form_devider"></div>

          <FormField
            id={"modelName"}
            formdata={this.state.formdata.modelName}
            change={(element) => this.updateForm(element)}
          />

          <FormField
            id={"shipping"}
            formdata={this.state.formdata.shipping}
            change={(element) => this.updateForm(element)}
          />

          <FormField
            id={"available"}
            formdata={this.state.formdata.available}
            change={(element) => this.updateForm(element)}
          />

          <div className="form_devider"></div>

          <FormField
            id={"publish"}
            formdata={this.state.formdata.publish}
            change={(element) => this.updateForm(element)}
          />

          {this.state.formSuccess ? (
            <div className="form_success">Success</div>
          ) : null}

          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}

          <Button disable={this.props.loading} onClick={this.submitForm} title="Add product" type="btn-v2" />
          {this.props.loading ? (
            <div className="loading">
              <CircularProgress disableShrink />
              <div>loading</div>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}
const actions = {
  createProduct,
};

const mapStateToProps = (state) => ({
  loading: state.async.loading,
});

export default connect(mapStateToProps, actions)(AddProduct);
