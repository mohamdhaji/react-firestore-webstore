import React from 'react'
import { connect } from 'react-redux'
import AuthModel from "./auth";
import ProductModel from "./product"
import CartModel from "./cart"
import Menu from "./mobile/menu"
import Filter from "./mobile/filter"
const modalLookup = {
  AuthModel,
  ProductModel,
  CartModel,
  Menu,
  Filter
}

const mapState = (state) => ({
  currentModal: state.modals
})

const ModalManager = (props) => {
  let renderedModal;
  const currentModal=props.currentModal
  if (currentModal) {
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent closeModal={props.closeModal} {...modalProps}/>
  }
  return <span>{renderedModal}</span>
}

export default connect(mapState)(ModalManager)
