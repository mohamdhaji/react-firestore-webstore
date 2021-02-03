import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import { BsPlusCircle as PlusCircle } from "react-icons/bs";
import { AiOutlineCloseCircle as Close } from "react-icons/ai";

import CircularProgress from "@material-ui/core/CircularProgress";

class Fileupload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false,
    };
  }

  onDrop = (files) => {
    
    const uploadedFiles = [...this.state.uploadedFiles, files[0]];
    this.setState({ uploading: true, uploadedFiles }, () => {
      this.props.imagesHandler(uploadedFiles);
    });
  };

  onRemove = (index) => {
    const uploadedFiles = [...this.state.uploadedFiles];
    uploadedFiles.splice(index, 1);
    this.setState({ uploadedFiles }, () => {
      this.props.imagesHandler(uploadedFiles);
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map((item, i) => (
      <div className="dropzone_box" key={item.preview}>
        <Close
          onClick={() => this.onRemove(i)}
          color="#212121"
          className="close"
          size="30px"
        />

        <div
          className="wrap"
          style={{ background: `url(${item.preview}) no-repeat` }}
        ></div>
      </div>
    ));

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={(e) => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <PlusCircle size="40px" />
              </div>
            </Dropzone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px",
                }}
              >
                {/* <CircularProgress style={{ color: "#00bcd4" }} thickness={7} /> */}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default Fileupload;
