import React, { useState, useContext } from "react";
//Packages
import { Alert, Input, Container } from "reactstrap";
//Global Components
import Button from "../../../components/Button";
//Services
import { createCFT } from "../../../services/marineServices";
//Context
import { MarinePageContext } from "../MarinePage";

function CreateCFT(props) {
  const dataProvider = useContext(MarinePageContext);
  const marineData = dataProvider.marineData;

  const [scoreData, setScoreData] = useState({
    cft_score: "",
    cft_date: ""
  });

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
      score: marineData.cft_score,
      last_updated: marineData.cft_date
    };

    createCFT(marineData._id, data)
      .then(res => {
        setScoreData({ cft_score: "", cft_date: "" });
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
          name="cft_score"
          placeholder="CFT Score"
          className="form-control"
          value={marineData.cft_score}
          helperText='e.g "275"'
          onChange={onChange}
        />

        <Input
          type="date"
          name="cft_date"
          placeholder="Date"
          className="form-control"
          value={marineData.cft_date}
          helperText='e.g "2019/01/01"'
          onChange={onChange}
        />

        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          CFT Added
        </Alert>
        <Button small type="submit" onClick={props.onClick}>
          Add Score
        </Button>
      </form>
    </Container>
  );
}

export default CreateCFT;
