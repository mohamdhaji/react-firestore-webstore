import React, { useState, useEffect, useRef } from "react";
import {
  update,
  generateData,
  isFormValid,
} from "../../../components/util/form/formActions";
import FormField from "../../../components/util/form/formfield";
import { connect } from "react-redux";
import Button from "../../../components/util/button";
import Dropzone from "react-dropzone";
import { BsPlusCircle as PlusCircle } from "react-icons/bs";
import { AiOutlineCheck as Yes, AiOutlineClose as Close } from "react-icons/ai";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toastr } from "react-redux-toastr";
import {
  uploadProfileImage,
  updateUserInfo,
} from "../../../actions/userActions";
import Loader from "../../../components/util/loader";
import UserLayout from "../hoc";

const formdata = {
  firstName: {
    element: "input",
    value: "",
    config: {
      name: "firstname_input",
      type: "text",
      placeholder: "Enter your first name",
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
      name: "lastname_input",
      type: "text",
      placeholder: "Enter your last name",
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
      placeholder: "Enter your email",
      label: "Contact Email",
    },
    validation: {
      required: true,
      email: true,
    },
    valid: false,
    validationMessage: "",
    showlabel: true,
  },
  phone: {
    element: "input",
    value: "",
    config: {
      name: "phone_input",
      type: "number",
      placeholder: "Enter your phone",
      label: "Phone",
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
function Profile(props) {
  const [formData, setFormData] = useState(formdata);
  const cropper = useRef(null);
  const [userUpdating, setUserUpdating] = useState(false);
  const [image, setImage] = useState({
    file: null,
    fileName: "",
    cropResult: null,
    image: {},
  });

  const cancelCrop = () => {
    cropper.current.cropper.disable();

    setImage({
      file: null,
      fileName: "",
      cropResult: null,
      image: {},
    });
  };

  const cropImage = () => {
    if (cropper.current.cropper.disabled) cropper.current.cropper.enable();

    if (typeof cropper.current.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    cropper.current.cropper.getCroppedCanvas().toBlob((blob) => {
      let imageUrl = URL.createObjectURL(blob);
      setImage({ ...image, cropResult: imageUrl, image: blob });
    }, "image/jpeg");
  };

  const updateForm = (element) => {
    const newFormdata = update(element, formData, "profile");
    setFormData(newFormdata);
  };

  const updateInfo = async (event) => {
    event.preventDefault();
    setUserUpdating(true);

    let dataToSubmit = generateData(formData, "profile");
    let formIsValid = isFormValid(formData, "profile");
    try {
      if (formIsValid) {
        await props.updateUserInfo(dataToSubmit);
        toastr.success("Success", "Your profile info updated");
      }
    } catch (error) {
      toastr.error("Oops", error.message);
    }
    setUserUpdating(false);
  };

  useEffect(() => {
    const email = props.profile.email;
    if (email) {
      const formdata = { ...formData };
      const firstname = { ...formData["firstName"] };
      const lastname = { ...formData["lastName"] };
      const emaildata = { ...formdata["email"] };
      const phone = { ...formdata["phone"] };
      const userName = props.profile.displayName.split(" ");
      firstname.value = userName[0];
      lastname.value =
        userName[1] !== undefined
          ? userName.slice(1, userName.length).join(" ")
          : "";
      phone.value =
        props.profile.phone !== undefined ? props.profile.phone : "";
      emaildata.value = email;
      firstname["valid"] = true;
      if (lastname.value) lastname["valid"] = true;
      if (phone.value) phone["valid"] = true;
      emaildata["valid"] = true;
      formdata["email"] = emaildata;
      formdata["firstName"] = firstname;
      formdata["lastName"] = lastname;
      formdata["phone"] = phone;
      setFormData(formdata);
    }
  }, [props.profile.email]);

  useEffect(() => {
    return () => {
      if (cropper.current !== null) cropper.current.cropper.disable();
    };
  }, []);

  const onDrop = (files) => {
    // cropper.current.cropper.enable();

    setImage({});
    setImage({
      file: files[0],
      fileName: files[0].name,
      cropResult: null,
      image: {},
    });
  };

  const uploadImage = async () => {
    try {
      await props.uploadProfileImage(image.image, image.fileName);
      cancelCrop();
      toastr.success("Success", "Photo has been uploaded");
      cropper.current.cropper.disable();
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  return (
    <UserLayout>
      <div className="user-page my-account">
        <h2 className="title">My Account</h2>
        <p>View and edit your personal info below.</p>
        <div className="dash" />

        <div className="user-email">
          <div>Login Email:</div>
          <div>{props.profile.email}</div>
        </div>

        <div style={{ marginTop: "40px" }} className="title">
          EDIT PHOTO:
        </div>

        <div className="profile-photo__edit">
          <Dropzone
            onDrop={(e) => onDrop(e)}
            multiple={false}
            className="dropzone_box"
          >
            <div className="wrap">
              <PlusCircle size="40px" />
            </div>
          </Dropzone>
          <div className="dropzone_box cropper">
            {image.file && (
              <>
                <div className="title">RESIZE IMAGE:</div>
                <Cropper
                  style={{ height: 240, width: "100%" }}
                  ref={cropper}
                  src={image.file.preview}
                  aspectRatio={1}
                  viewMode={3}
                  zoomTo={0}
                  center={false}
                  replace={true}
                  dragMode="move"
                  guides={true}
                  scalable={true}
                  cropBoxMovable={true}
                  cropBoxResizable={true}
                  crop={cropImage}
                />
              </>
            )}
          </div>
          {image.file && (
            <>
              <div className="dropzone_box review">
                <div className="title">REVIEW AN IMAGE:</div>
                <img src={image.cropResult} alt="" />
                <div className="buttons">
                  <button onClick={uploadImage} className="upload">
                    <Yes size="25px" color="#fff" />
                    {props.loading && (
                      <div
                        style={{
                          width: "15px",
                          position: "absolute",
                          right: "20px",
                        }}
                      >
                        <Loader size="20px" color="primary" />
                      </div>
                    )}
                  </button>
                  <button onClick={cancelCrop} className="cancel">
                    <Close size="25px" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <form id="profile-form">
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
          <div className="inline-inputs">
            <FormField
              id={"email"}
              formdata={formData.email}
              change={(element) => updateForm(element)}
            />
          
            <FormField
              id={"phone"}
              formdata={formData.phone}
              change={(element) => updateForm(element)}
            />
          </div>
          <Button
            loading={userUpdating}
            onClick={updateInfo}
            title="Update Info"
            type="btn-loading"
          />
        </form>
      </div>
    </UserLayout>
  );
}

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
  loading: state.async.loading,
});
const actions = {
  uploadProfileImage,
  updateUserInfo,
};

export default connect(mapStateToProps, actions)(Profile);
