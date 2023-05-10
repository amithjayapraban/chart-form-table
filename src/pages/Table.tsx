import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { getAge } from "../util/getAge";
import { foredit } from "./Form";
import { Paper, TableHead } from "@mui/material";

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

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, paddingX: 4 }}>
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
  var rows = useSelector((state: RootState) => state.formSliceReducer.data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [forEdit, setForEdit] = React.useState<foredit>();
  var columns = ["First name", "Last name", "Email", "Age", "Gender", "", ""];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
    <div id="table_wrap " className="flex relative">
      <section
        id="Dialog_edit"
        className="px -8 py-0 edit_modal hidden md:w-[50%]   h-[90%] absolute top-4 left-64 z-[999] bg-white border rounded-lg shadow-lg "
      >
        <Form
          edit={true}
          forEdit={forEdit}
          {...{ h: "h-unset overflow-hidden", w: "w-full", p: "p-0 " }}
        />

        <button
          aria-label="Close"
          onClick={() =>
            document.getElementById("Dialog_edit")?.classList.toggle("hidden")
          }
          className="flex z-999 absolute top-3 w-4 h-4 justify-center items-center p-0 bg-red-600 rounded-full left-3 z-[999]]  "
        ></button>
      </section>
      <Paper
        sx={{ boxShadow: 0, border: 0, width: "100%", overflow: "hidden" }}
      >
        <TableContainer
          sx={{
            boxShadow: 0,

            paddingX: 4,
            marginTop: 4,
            height: window.innerHeight - 143,
          }}
          className=" "
        >
          <Table className="border-x border-t " stickyHeader aria-label="table">
            <TableHead>
              <TableRow>
                {columns.map((c: string, i) => {
                  return (
                    <TableCell
                      key={i}
                      align="left"
                      style={{
                        fontWeight: 600,
                        color: "rgba(0,0,0,.8)",
                        background: "",
                      }}
                    >
                      {c}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell
                    className="  "
                    style={{ width: 160 }}
                    component="th"
                    scope="row"
                  >
                    {row.first_name}
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="left">
                    {row.last_name}
                  </TableCell>
                  <TableCell style={{ width: 270 }} align="left">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {getAge(row.dob)}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.gender}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="left">
                    <button
                      onClick={() => {
                        setForEdit(row);
                        document
                          .getElementById("Dialog_edit")
                          ?.classList.toggle("hidden");
                      }}
                      className="text-white bg-orange-400 px-1 rounded"
                    >
                      Edit
                    </button>
                  </TableCell>
                  <TableCell
                    className="flex flex-col "
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
          </Table>
        </TableContainer>

        <TableRow>
          <TablePagination
            width={window.innerWidth}
            rowsPerPageOptions={[10, 15, 25, 50, { label: "All", value: -1 }]}
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
      </Paper>
    </div>
  );
}
