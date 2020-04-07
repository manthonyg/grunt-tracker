import React, { useState, useContext } from "react";
//Packages
import { Alert, Input, Container } from "reactstrap";
import styled from "styled-components";
//Global Components
import Button from "../../../components/Button";
//Services
import { createCFT } from "../../../services/marineServices";
//Context
import { MarinePageContext } from "../MarinePage";

const StyledAlert = styled(Alert)`
  background-color: ${props => {
    if (props.success) return "#aebd38 !important";
    return "#505160 !important";
  }};
`;

function CreateCFT(props) {
  const dataProvider = useContext(MarinePageContext);
  const marineData = dataProvider.marineData;

  const [scoreData, setScoreData] = useState({
    cft_score: "",
    cft_date: ""
  });
  console.log(scoreData);

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
      score: scoreData.cft_score,
      last_updated: scoreData.cft_date
    };

    createCFT(marineData._id, data)
      .then(res => {
        setScoreData({ cft_score: "", cft_date: "" });
        setVisible(true);
      })
      .catch(err => {
        console.warn(`Error while creating CFT entry: ${err}`);
      });
  };

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  return (
    <Container full>
      <form noValidate onSubmit={submitForm}>
        <Input
          type="input"
          name="cft_score"
          placeholder="CFT Score"
          className="form-control"
          value={scoreData.cft_score}
          helperText='e.g "275"'
          onChange={updateScoreData}
        />

        <Input
          type="date"
          name="cft_date"
          placeholder="Date"
          className="form-control"
          value={scoreData.cft_date}
          helperText='e.g "2019/01/01"'
          onChange={updateScoreData}
        />

        <StyledAlert success isOpen={visible} toggle={onDismiss}>
          CFT Added
        </StyledAlert>
        <Button small type="submit" onClick={props.onClick}>
          Add Score
        </Button>
      </form>
    </Container>
  );
}

export default CreateCFT;
