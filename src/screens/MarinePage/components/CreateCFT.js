import React, { useState } from "react";
import axios from "axios";
//Packages
import { Alert, Input, Button, Container } from "reactstrap";

function CreateCFT(props) {
  const [marineData, setMarineData] = useState({
    cft_score: "",
    cft_date: ""
  });

  const onChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setMarineData(prevState => {
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

    axios
      .put(`http://localhost:8082/api/marines/${props.marine}/body/cft`, data)
      .then(res => {
        setMarineData({ cft_score: "", cft_date: "" });
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

        <br />
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          CFT Added
        </Alert>
        <Button type="submit" onClick={props.onClick}>
          Add Appointment
        </Button>
      </form>
    </Container>
  );
}

export default CreateCFT;
