import React, { useEffect } from "react";
import AuthHeader from "../Header-Footer/Header/authHeader";
import Header from "../Header-Footer/Header";
import Message from "../../components/util/message";
import Footer from "../Header-Footer/Footer";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modalActions";
import ModalManager from "../Models/ModalManager";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function Layout(props) {
  // const [model, setModel] = useState(false);

  // const openCloseModel = (value) => {
  //   setModel(value);
  // };
  const matchesMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (
      matchesMobile &&
      props.currentModal &&
      props.currentModal.modalType === "Filter"
    )
      props.closeModal();
  }, [matchesMobile]);

  const display =
    props.currentModal &&
    (props.currentModal.modalType === "AuthModel" ||
      props.currentModal.modalType === "Menu" ||
      props.currentModal.modalType === "Filter")
      ? "none"
      : "block";

  return (
    <div className="layout-hoc">
      {/* {props.currentModal && props.currentModal.modalType === "AuthModel" ? (
        <AuthModel closeModal={props.closeModal} />
      ) : (
        <> */}
      <AuthHeader closeModal={props.closeModal} openModal={props.openModal} />
      <Header role={props.role} />
      {<ModalManager closeModal={props.closeModal} />}
      <div style={{ display: display }}>{props.children}</div>
      <div style={{ display: display }}>
        <Message />
      </div>
      <div style={{ display: display }}>
        <Footer />
      </div>
      {/* </>
      )} */}
    </div>
  );
}

const mapState = (state) => ({
  currentModal: state.modals,
  role: state.firebase.profile.role,
});

const actions = {
  openModal,
  closeModal,
};

export default connect(mapState, actions)(Layout);
