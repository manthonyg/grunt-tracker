import React, { useContext } from "react";
//Global Components
import Banner from "../../../components/Banner";
//Packages
import { Table } from "reactstrap";
//Context
import { SquadPageContext } from "../SquadPage";

function SquadGenerateZaps() {
  const dataProvider = useContext(SquadPageContext);

  const marineData = dataProvider.marineData;

  return (
    <Table responsive>
      {!!marineData && !!marineData.length ? (
        <thead>
          <tr style={{ border: "2px solid black" }}>
            <th style={{ border: "2px solid black" }}>Zap#</th>
            <th style={{ border: "2px solid black" }}>Last</th>
            <th style={{ border: "2px solid black" }}>First</th>
            <th style={{ border: "2px solid black" }}>Blood Type</th>
            <th style={{ border: "2px solid black" }}>Religion</th>
          </tr>
        </thead>
      ) : (
        <Banner secondary>Add Members to Squad</Banner>
      )}

      {!!marineData && !!marineData.length && (
        <tbody>
          {marineData.map((marine, i) => (
            <tr key={marine._id}>
              <td>
                {marine.zap}
                {marine.blood_type}
              </td>
              <td>{marine.last}</td>
              <td>{marine.first}</td>
              <td>{marine.blood_type}</td>
              <td>{!!marine.religion ? marine.religion : "none"}</td>
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  );
}

export default SquadGenerateZaps;
