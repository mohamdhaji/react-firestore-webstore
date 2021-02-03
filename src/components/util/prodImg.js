import React, { Component } from "react";
import imgnotavailable from "../../util/images/imgnotavailable.png";
import { SRLWrapper } from "simple-react-lightbox";

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: [],
  };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.images !== this.props.images) {
  //     if (Object.keys(this.props.images).length > 0) {
  //       let lightboxImages = [];

  //       Object.keys(this.props.images).forEach((id) => {
  //         lightboxImages.push(this.props.images[id]);
  //       });

  //       this.setState({
  //         lightboxImages,
  //       });
  //     }
  //   }
  // }
  static getDerivedStateFromProps(props, state) {
    if (props.images !== state.lightboxImages) {
      if (Object.keys(props.images).length > 0) {
        let lightboxImages = [];

        Object.keys(props.images).forEach((id) => {
          lightboxImages.push(props.images[id]);
        });

        return {
          lightboxImages,
        }
      }
    }
  }
  // componentDidMount() {
  //   if (Object.keys(this.props.images).length > 0) {
  //     let lightboxImages = [];

  //     Object.keys(this.props.images).forEach((id) => {
  //       lightboxImages.push(this.props.images[id]);
  //     });

  //     this.setState({
  //       lightboxImages,
  //     });
  //   }
  // }

  handleLightBox = (pos) => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: pos,
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false,
    });
  };

  showThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        ></div>
      ) : null
    );

  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0];
    } else {
      return imgnotavailable;
    }
  };

  options = {
    buttons: {
      showThumbnailsButton: false,
      showDownloadButton: false,
    },
    thumbnails: {
      showThumbnails: false,
    },
  };

  render() {
    const { lightboxImages } = this.state;
    return (
      <div className="product_image_container">
        <div className="images">
          <SRLWrapper options={this.options}>
            {lightboxImages.map((url) => (
              <img key={url} src={url} alt="" />
            ))}
          </SRLWrapper>
        </div>
        {/* <div className="main_thumbs">{this.showThumbs(lightboxImages)}</div> */}
      </div>
    );
  }
}

export default ProdImg;
