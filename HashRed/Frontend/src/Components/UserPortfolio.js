 
import  { Table, Typography , TableCell, TableContainer, TableHead, TableRow, Box,  Paper} from "@mui/material"; 
import { useEffect, useState } from "react";
import axios from "axios";
import UserEdit from "./shared/UserEdit";

function createData(user, userId, stocks, fiat) {
  return { user, userId, stocks, fiat };
}

const UserPorfolio = () => {
  const [rows, setRows] = useState();
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const getUsers = () => {
    try {
      axios
        .get("http://localhost:5000/user/get-all", {
          headers: headers,
        })
        .then((response) => {
          let tempRow = [];
          response.data.users.forEach((user) => {
            tempRow.push(
              createData(user.userName, user.userId, user.stockCount, user.fiat)
            );
          });
          console.log(response.data);
          setRows(tempRow);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <> 
        <TableContainer sx={{ maxWidth: 650, border: "3px solid white", backgroundColor: "#000"  }} component={Box}>

          <Table sx={{ maxWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography color="white">User</Typography></TableCell>
                <TableCell align="right"><Typography color="white">Stocks</Typography></TableCell>
                <TableCell align="right"><Typography color="white">Fiat</Typography></TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>

            {rows &&
              rows.map((row) => <UserEdit row={row} getUsers={getUsers} />)}
          </Table>
        </TableContainer> 
    </>
  );
};

export default UserPorfolio;
