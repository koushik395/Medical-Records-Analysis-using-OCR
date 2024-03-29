import styled from "styled-components";
import FileSaver from "../../ui/FileSaver";
import Modal from "../../ui/Modal";

const Img = styled.img`
  height: 21.6rem;
  width: auto;
  &:hover {
    cursor: pointer;
    filter: blur(1.6px);
  }
`;

const ImgModal = styled.img`
  height: 50.6rem;
  width: auto;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2rem;
  grid-row: 1 / -1;
`;

function PrescriptionCard({ prescription }) {
  const filePath = prescription;
  return (
    <StyledDiv>
      <Modal>
        <Modal.Open opens="prescription">
          <Img
            src={`img/patient/prescriptions/${filePath}`}
            alt="Prescription"
          />
        </Modal.Open>
        <Modal.Window name="prescription">
          <ImgModal
            src={`img/patient/prescriptions/${filePath}`}
            alt="Prescription"
          />
        </Modal.Window>
      </Modal>
      <FileSaver filePath={prescription} />
    </StyledDiv>
  );
}

export default PrescriptionCard;
