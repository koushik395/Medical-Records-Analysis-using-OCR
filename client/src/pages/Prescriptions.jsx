import styled from "styled-components";
import { useGetPrescriptions } from "../features/userFeatures/useGetPrescriptions";
import Spinner from "../ui/Spinner";
import PrescriptionModal from "../ui/PrescriptionModal";
import Heading from "../ui/Heading";
import FileSaver from "../ui/FileSaver";

const ImageGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Adjust the width of each grid item */
  gap: 10px; /* Adjust the gap between grid items */
  grid-auto-flow: row;
  background-color: var(--color-grey-0);
  padding: 2rem;
`;

const YearContainer = styled.div`
  margin-bottom: 20px; /* Adjust spacing between years */
  grid-column: 1 / -1;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Adjust the width of each image */
  gap: 20px; /* Adjust the gap between images */
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Prescriptions() {
  const { isLoading, prescriptions } = useGetPrescriptions();

  if (isLoading) return <Spinner />;
  if (Object.keys(prescriptions).length === 0)
    return <Heading as="h2">No prescriptions found</Heading>;

  return (
    <ImageGridWrapper>
      {Object.entries(prescriptions).map(([year, records]) => (
        <YearContainer key={year}>
          <Heading as="h2">{year}</Heading>
          <ImageContainer>
            {records.map((image, index) => (
              <StyledDiv key={index}>
                <PrescriptionModal image={image} />
                <FileSaver filePath={image.prescription} />
              </StyledDiv>
            ))}
          </ImageContainer>
        </YearContainer>
      ))}
    </ImageGridWrapper>
  );
}

export default Prescriptions;
