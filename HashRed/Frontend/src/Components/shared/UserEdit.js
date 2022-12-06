 
import { Button, TableCell, TableRow, TableBody, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function UserEdit(props) {
  const [edit, setEdit] = useState(false);
  const [stocks, setStocks] = useState(props.row.stocks);
  const [fiat, setFiat] = useState(props.row.fiat);
  const save = () => {
    const userObj = {
      userId: props.row.userId,
      stockCount: stocks,
      fiat: fiat,
    };
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    try {
      axios
        .post("http://localhost:5000/user/update", userObj, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          props.getUsers();
          setEdit(!edit);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {edit ? (
        <TableBody>
          <TableRow
            key={props.row.user}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Typography color="white">{props.row.user}</Typography> 
            </TableCell>
            <TableCell align="right">
              <input
                value={stocks}
                onChange={(e) => setStocks(e.target.value)}
                size="4"
              />
            </TableCell>
            <TableCell align="right">
              <input value={fiat} onChange={(e) => setFiat(e.target.value)} size="4"/>
            </TableCell>
            <TableCell align="right">
              <Button onClick={save} size="4">Save</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <>
          <TableBody>
            <TableCell component="th" scope="row">
            <Typography color="white">{props.row.user}</Typography> 
            </TableCell>
            <TableCell align="right"> <Typography color="white">{props.row.stocks}</Typography> </TableCell>
            <TableCell align="right"> <Typography color="white">{props.row.fiat}</Typography> </TableCell>
            <TableCell align="right">
              <Button onClick={() => setEdit(!edit)}>Edit</Button>
            </TableCell>
          </TableBody>
        </>
      )}
    </>
  );
}

export default UserEdit;
 
// import { Button, TableCell, TableRow } from "@mui/material";
// import axios from "axios";
// import React, { useState } from "react";

// function UserEdit(props) {
//   const [edit, setEdit] = useState(false);
//   const [stocks,setStocks] = useState(props.row.stocks);
//   const [fiat,setFiat] = useState(props.row.fiat);
//   const save=()=>{
//     const userObj={
//         userId : props.row.userId,
//         stockCount:stocks,
//         fiat : fiat
//     };
//     const headers = {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("token"),
//       };
//     try {
//         axios
//           .post("http://localhost:5000/user/update", userObj ,{
//             headers: headers,
//           })
//           .then((response) => {
//             console.log(response);
//             props.getUsers();
//             setEdit(!edit);
//           })
//           .catch((e) => {
//             console.log(e);
//           });
//       } catch (err) {
//         console.log(err);
//       }
//   }
//   return (
//     <>
//       {edit ? (
//         <TableRow
//         key={props.row.user}
//         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//       >
//          <TableCell component="th" scope="row">
//             {props.row.user}
//           </TableCell>
//           <TableCell align="right">
//             <input value={stocks} onChange={(e)=>setStocks(e.target.value)}/>
//           </TableCell>
//           <TableCell align="right">
//               <input value={fiat} onChange={(e)=>setFiat(e.target.value)}/>
//           </TableCell>
//           <TableCell align="right">
//             <Button onClick={save}>Save</Button>
//           </TableCell>
//       </TableRow>
//       ) : (
//         <>
//           <TableCell component="th" scope="row">
//             {props.row.user}
//           </TableCell>
//           <TableCell align="right">{props.row.stocks}</TableCell>
//           <TableCell align="right">{props.row.fiat}</TableCell>
//           <TableCell align="right">
//             <Button onClick={() => setEdit(!edit)}>Edit</Button>
//           </TableCell>
//         </>
//       )}
//     </>
//   );
// }

// export default UserEdit; 
