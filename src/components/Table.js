import React from "react";
//Packages
import { Table } from "reactstrap";
//Global Components
import Banner from "./Banner";
import Flex from "./Flex";
//Media
import Plus from "../images/plus.svg";

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
            <tr
              style={{
                textAlign: "center"
              }}
            >
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
                  <td
                    key={5 * Math.random()}
                    style={{
                      alignContent: "center",
                      textAlign: "center",
                      color: "#aebd38",
                      fontSize: "22px",
                      fontWeight: data === 0 ? "100" : "800"
                    }}
                  >
                    {data === 0 ? (
                      <img
                        src={Plus}
                        style={{ width: ".5rem", transform: "rotate(45deg)" }}
                      />
                    ) : (
                      data
                    )}
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
