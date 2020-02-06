import React, { useContext } from "react";
//Packages
import { Table } from "reactstrap";
//Global components
import Banner from "../../../../../components/Banner";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Button";
//Context
import { SquadPageContext } from "../../../SquadPage";

function ViewWeapons() {
  const dataProvider = useContext(SquadPageContext);

  const marineData = dataProvider.marineData;

  return (
    <>
      <Flex justifyBetween>
        <Button inverted small id="accounted">
          Generate Kill Cards
        </Button>
        <Button inverted small id="unaccounted">
          Something Here
        </Button>
      </Flex>

      <Table responsive>
        {!!marineData && !!marineData.length ? (
          <thead>
            <tr>
              <th>Last</th>
              <th>First</th>
              <th>Primary</th>
              <th>Scope</th>
              <th>Optics</th>
              <th>Additional</th>
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

export default ViewWeapons;
