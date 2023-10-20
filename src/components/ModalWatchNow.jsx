/* eslint-disable react/prop-types */

import Modal from "react-bootstrap/Modal";

import "../style/ModalWatchNow.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <iframe
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/${props.data}`}
          title="YouTube video player"
          // eslint-disable-next-line react/no-unknown-property
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
