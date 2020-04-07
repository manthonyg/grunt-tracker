import React, { useContext } from "react";
//Global Components
import Banner from "../../../components/Banner";
import Flex, { Column } from "../../../components/Flex";
import Pill from "../../../components/Pill";
//Context
import { MarinePageContext } from "../MarinePage";

function ViewMarineBody() {
  const dataProvider = useContext(MarinePageContext);

  const marineData = dataProvider.marineData;

  return (
    <Flex justifyAround>
      {!!marineData ? (
        <>
          <Column>
            <Banner white>PFT</Banner>
            {marineData.body.pft.map(pft => (
              <>
                <Flex justifyCenter>
                  <Pill>{pft.score}</Pill>
                </Flex>
                <Flex justifyCenter>
                  <Banner small white>
                    {pft.last_updated}
                  </Banner>
                </Flex>
              </>
            ))}
          </Column>

          <Column>
            <Banner white>CFT</Banner>
            {marineData.body.cft.map(cft => (
              <>
                <Flex justifyCenter>
                  <Pill>{cft.score}</Pill>
                </Flex>
                <Flex justifyCenter>
                  <Banner small white>
                    {cft.last_updated}
                  </Banner>
                </Flex>
              </>
            ))}
          </Column>
        </>
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
