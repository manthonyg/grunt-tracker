import React, { useState, useContext } from "react";
//Packages
import { Alert, Input, Container } from "reactstrap";
//Global components
import Button from "../../../components/Button";
//Services
import { createPFT } from "../../../services/marineServices";
//Context
import { MarinePageContext } from "../MarinePage";

function CreatePFT() {
  const dataProvider = useContext(MarinePageContext);

  const marineData = dataProvider.marineData;

  const [scoreData, setScoreData] = useState({ pft_score: "", pft_date: "" });

  const onChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setScoreData(prevState => {
      return {
        ...prevState,
        [name]: val
      };
    });
  };

  const onSubmit = evt => {
    evt.preventDefault();

    const data = {
      score: scoreData.pft_score,
      last_updated: scoreData.pft_date
    };

    createPFT(marineData._id, data)
      .then(res => {
        setScoreData({ pft_score: "", pft_date: "" });
        setVisible(true);
      })
      .catch(err => {
        console.log("Error in CreateAppointment");
      });
  };

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  return (
    <Container full>
      <form noValidate onSubmit={onSubmit}>
        <Input
          type="input"
          name="pft_score"
          placeholder="PFT Score"
          className="form-control"
          value={marineData.pft_score}
          helperText='e.g "275"'
          onChange={onChange}
        />

        <Input
          type="date"
          name="pft_date"
          placeholder="Date"
          className="form-control"
          value={marineData.pft_date}
          helperText='e.g "2019/01/01"'
          onChange={onChange}
        />
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          PFT Added
        </Alert>
        <Button small type="submit">
          Add Score
        </Button>
      </form>
    </Container>
  );
}

export default CreatePFT;
