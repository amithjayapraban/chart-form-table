import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import Data from "../api/data.json";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

interface Table {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function Pagination(props: Table) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  const modal = document.querySelector("[data-modal]") as HTMLDialogElement;
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function TableComponent() {
  const rows = Data.data.sort((a, b) => a.id - b.id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const calculateAge = (birthday: string) => {
    let [d, m, y] = birthday.split("/");
    const diff =
      Date.now() -
      new Date(`${parseInt(y)}-${parseInt(m)}-${parseInt(d)}`).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();

  return (
    <div className="flex relative">
      <section
        id="Dialog_edit"
        className="p-8 py-10 edit_modal hidden w-[60%] overflow-y-scroll  h-[90%] absolute top-12 z-[999] bg-white rounded-lg shadow-lg border"
      >
        <Form
          edit={true}
          {...{ h: "h-full overflow-hidden", w: "w-full", p: "p-0" }}
        />

        <button
          onClick={() =>
            document.getElementById("Dialog_edit")?.classList.toggle("hidden")
          }
          className="flex z-999 absolute top-2 w-4 h-4 justify-center items-center p-0 bg-red-600 rounded-full left-2 z-[999]]  "
        ></button>
      </section>
      <TableContainer className="p-8  ">
        <Table sx={{ minWidth: 500 }} aria-label="table">
          <TableBody>
            <TableRow className="border rounded-t">
              <TableCell
                className="bg-gray-700 "
                align="left"
                style={{ color: "white", width: 160 }}
              >
                First Name
              </TableCell>

              <TableCell
                className="bg-gray-700"
                align="left"
                style={{ color: "white", width: 160 }}
              >
                Last Name
              </TableCell>
              <TableCell
                className="bg-gray-700"
                align="left"
                style={{ color: "white", width: 200 }}
              >
                Email
              </TableCell>
              <TableCell
                className="bg-gray-700"
                align="left"
                style={{ color: "white", width: 160 }}
              >
                Age
              </TableCell>
              <TableCell
                className="bg-gray-700"
                align="left"
                style={{ color: "white", width: 160 }}
              >
                Gender
              </TableCell>
              <TableCell
                className="bg-gray-700"
                align="left"
                style={{ color: "white", width: 100 }}
              ></TableCell>
              <TableCell
                className="bg-gray-700  "
                style={{ color: "white", width: 100 }}
              ></TableCell>
            </TableRow>

            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  className="border-l  "
                  style={{ width: 160 }}
                  component="th"
                  scope="row"
                >
                  {row.first_name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.last_name}
                </TableCell>
                <TableCell  style={{ width: 200 }} align="left">
                  {row.email}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {calculateAge(row.dob)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.gender}
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  <button
                    onClick={() =>
                      document
                        .getElementById("Dialog_edit")
                        ?.classList.toggle("hidden")
                    }
                    className="text-white bg-orange-500 px-1 rounded"
                  >
                    Edit
                  </button>
                </TableCell>
                <TableCell
                  className="flex flex-col border-r"
                  style={{ width: 100 }}
                  align="right"
                >
                  <button
                    onClick={() => navigate(`/details/${row.id}`)}
                    className="text-white bg-emerald-500 px-1 rounded"
                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  50,
                  { label: "All", value: -1 },
                ]}
                colSpan={7}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={Pagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
