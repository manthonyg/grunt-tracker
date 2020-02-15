import React from "react";
//Packages
import { Table } from "reactstrap";
//Global Components
import Banner from "./Banner";
import Flex from "./Flex";

function TableTemplate({
  marineData,
  tableHeaders,
  tableData,
  bannerText,
  children
}) {
  return (
    <>
      <Banner secondary>{bannerText}</Banner>
      <Table responsive>
        {!!marineData && !!marineData.length ? (
          <thead>
            <tr>
              {tableHeaders.map(header => (
                <th key={header} scope="col">
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
        ) : (
          <Flex justifyCenter>
            <em>empty</em>
          </Flex>
        )}

        {!!marineData && !!marineData.length && (
          <tbody>
            <tr>
              {tableData &&
                tableData.length &&
                tableData.map(data => (
                  <td key={data} style={{ alignContent: "center" }}>
                    {data === 0 ? "-" : data}
                  </td>
                ))}
            </tr>
          </tbody>
        )}
      </Table>
    </>
  );
}

export default TableTemplate;
