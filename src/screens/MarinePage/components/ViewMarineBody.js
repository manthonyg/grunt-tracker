import React, { useContext } from "react";
//Global Components
import Banner from "../../../components/Banner";
import Flex from "../../../components/Flex";
import Pill from "../../../components/Pill";
//Context
import { MarinePageContext } from "../MarinePage";

function ViewMarineBody() {
  const dataProvider = useContext(MarinePageContext);

  const marineData = dataProvider.marineData;

  return (
    <Flex justifyAround>
      {!!marineData ? (
        <Flex alignCenter>
          <Banner white>PFT</Banner>
          {marineData.body.pft.map(pft => (
            <Flex justifyCenter>
              <Pill>{pft.score}</Pill>
              <Banner small white>
                {pft.last_updated}
              </Banner>
            </Flex>
          ))}
          <Banner white>CFT</Banner>
          {marineData.body.cft.map(cft => (
            <Flex justifyCenter>
              <Pill>{cft.score}</Pill>
              <Banner small white>
                {cft.last_updated}
              </Banner>
            </Flex>
          ))}
        </Flex>
      ) : (
        <Flex justifyCenter>
          <Banner white small>
            No current entries!
          </Banner>
        </Flex>
      )}
    </Flex>
  );
}

export default ViewMarineBody;
