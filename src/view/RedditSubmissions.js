import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import { getSubmissions } from "../service/reddit";
import { Box, Paper } from "@mui/material";

const RedditSubmissions = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const getList = async () => {
    if (keyword) {
      setList([]);
      setLoading(true);
      const list = await getSubmissions(keyword);
      setList(list);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" my={5}>
        <TextField
          onInput={(e) => {
            setKeyword(e.target.value);
          }}
          label="Search reddit"
          variant="outlined"
          placeholder="Enter keyword"
          size="small"
          value={keyword}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getList();
            }
          }}
        />
        <IconButton
          aria-label="search"
          onClick={() => {
            getList();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </Box>

      <Paper
        elevation={8}
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        {loading && (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress />
          </Box>
        )}
        <List dense={true}>
          {list.map((x, index) => (
            <ListItem key={index}>
              <a href={x.full_link} target="_blank" rel="noreferrer">
                <ListItemText primary={x.title} secondary={x.author_fullname} />
              </a>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default RedditSubmissions;
