import React, { useContext } from "react";
//Packages
import { Table } from "reactstrap";
//Global components
import Banner from "../../../../../components/Banner";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Button";
//Context
import { SquadPageContext } from "../../../SquadPage";

function ViewAccountability() {
  const dataProvider = useContext(SquadPageContext);

  const marineData = dataProvider.marineData;

  return (
    <>
      <Flex justifyBetween>
        <Button className="accountability-button" id="accounted">
          Generate Kill Cards
        </Button>
        <Button className="accountability-button" id="unaccounted">
          Something Here
        </Button>
      </Flex>

      <Table responsive>
        {!!marineData && !!marineData.length ? (
          <thead>
            <tr>
              <th>Zap#</th>
              <th>Last</th>
              <th>First</th>
              <th>Blood Type</th>
              <th>Religion</th>
            </tr>
          </thead>
        ) : (
          <Banner secondary>Add Members to Squad</Banner>
        )}

        {!!marineData && !!marineData.length && (
          <tbody>
            {marineData.map((marine, i) => (
              <tr key={marine._id}>
                <th scope="row">{i}</th>
                <td>{marine.zap}</td>
                <td>{marine.last}</td>
                <td>{marine.first}</td>
                <td>{marine.blood_type}</td>
                <td>{!!marine.religion ? marine.religion : "none"}</td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </>
  );
}

export default ViewAccountability;
