import React, { useState, useContext } from "react";
//Packages
import TimeField from "react-simple-timefield";
import { Alert, Input, Container } from "reactstrap";
//Global components
import Button from "../../../components/Button";
//Services
import { createAppointment } from "../../../services/marineServices";
//Context
import { MarinePageContext } from "../MarinePage";

function CreateAppointment() {
  const dataProvider = useContext(MarinePageContext);

  const marineData = dataProvider.marineData;

  const [data, setData] = useState({
    date: "",
    appointment_type: "",
    location: "",
    time: ""
  });

  const onChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setData(prevState => {
      return {
        ...prevState,
        [name]: val
      };
    });
  };

  const onSubmit = evt => {
    evt.preventDefault();

    createAppointment(marineData._id, data)
      .then(res => {
        setData({
          date: "",
          appointment_type: "",
          location: "",
          time: ""
        });
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
          type="date"
          name="date"
          placeholder="Appointments"
          className="form-control"
          value={data.date}
          helperText='e.g "02/11/19"'
          onChange={onChange}
        />

        <Input
          type="input"
          name="appointment_type"
          placeholder="Type of Appointment"
          className="form-control"
          value={data.appointment_type}
          helperText='e.g "Dental"'
          onChange={onChange}
        />

        <Input
          type="input"
          name="location"
          placeholder="Location"
          className="form-control"
          value={data.location}
          helperText='e.g "CP Hospital"'
          onChange={onChange}
        />

        <TimeField
          name="time"
          value={data.time} // {String}   required, format '00:00' or '00:00:00'
          onChange={onChange} // {Function} required
          input={
            <Input className="form-control" helperText="Time" type="input" />
          } // {Element}  default: <input type="text" />
          colon=":"
          // {String}   default: ":"
          // {Boolean}  default: false
        />
        <br />
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          Appointment Created
        </Alert>
        <Button type="submit">Add Appointment</Button>
      </form>
    </Container>
  );
}

export default CreateAppointment;
