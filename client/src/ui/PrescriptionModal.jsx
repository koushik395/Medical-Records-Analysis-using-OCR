import styled from "styled-components";
import Modal from "./Modal";

const Img = styled.img`
  height: auto;
  width: 100%;
  &:hover {
    cursor: pointer;
    filter: blur(1.6px);
  }
`;

const ImgModal = styled.img`
  height: 50.6rem;
  width: auto;
`;

function PrescriptionModal({ image }) {
  return (
    <Modal>
      <Modal.Open opens="Myprescription">
        <Img
          src={`img/patient/prescriptions/${image.prescription}`}
          alt="Prescription"
        />
      </Modal.Open>
      <Modal.Window name="Myprescription">
        <ImgModal
          src={`img/patient/prescriptions/${image.prescription}`}
          alt="Prescription"
        />
      </Modal.Window>
    </Modal>
  );
}

export default PrescriptionModal;
