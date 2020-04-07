import React, { useState, useContext } from "react";
//Packages
import { Alert, Input, Container } from "reactstrap";
import styled from "styled-components";
//Global Components
import Button from "../../../components/Button";
//Services
import { createPFT } from "../../../services/marineServices";
//Context
import { MarinePageContext } from "../MarinePage";

const StyledAlert = styled(Alert)`
  background-color: ${props => {
    if (props.success) return "#aebd38 !important";
    return "#505160 !important";
  }};
`;

function CreatePFT() {
  const dataProvider = useContext(MarinePageContext);
  const marineData = dataProvider.marineData;
  const setMarineData = dataProvider.setMarineData;

  const [scoreData, setScoreData] = useState({ pft_score: "", pft_date: "" });

  const updateScoreData = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setScoreData(prevState => {
      return {
        ...prevState,
        [name]: val
      };
    });
  };

  const submitForm = evt => {
    evt.preventDefault();

    const data = {
      score: scoreData.pft_score,
      last_updated: scoreData.pft_date
    };

    createPFT(marineData._id, data)
      .then(res => {
        setVisible(true);
      })
      .then(res => {
        setMarineData(prevState => {
          return {
            ...prevState,
            [marineData.appointments]: {
              ...scoreData
            }
          };
        });
        console.log("did it");
        setScoreData({ pft_score: "", pft_date: "" });
      })
      .catch(err => {
        console.log("Error in CreateAppointment");
      });
  };

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  return (
    <Container full>
      <form noValidate onSubmit={submitForm}>
        <Input
          type="input"
          name="pft_score"
          placeholder="PFT Score"
          className="form-control"
          value={marineData.pft_score}
          helperText='e.g "275"'
          onChange={updateScoreData}
        />

        <Input
          type="date"
          name="pft_date"
          placeholder="Date"
          className="form-control"
          value={marineData.pft_date}
          helperText='e.g "2019/01/01"'
          onChange={updateScoreData}
        />
        <StyledAlert success isOpen={visible} toggle={onDismiss}>
          PFT Added
        </StyledAlert>
        <Button small type="submit">
          Add Score
        </Button>
      </form>
    </Container>
  );
}

export default CreatePFT;
