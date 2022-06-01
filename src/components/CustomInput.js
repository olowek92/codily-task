import React from "react";
import Grow from "@mui/material/Grow";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { withStyles } from "tss-react/mui";

const defaultSearchStyles = (theme) => ({
  main: {
    display: "flex",
    flex: "1 0 auto",
  },
  searchText: {
    flex: "0.8 0",
  },
  clearIcon: {
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
});

class CustomSearchRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }

  handleTextChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    this.setState({ inputValue: result });
    this.props.onSearch(result);
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.onHide();
    }
  };

  render() {
    const { classes, options, onHide, searchText } = this.props;

    return (
      <Grow appear in={true} timeout={300}>
        <div className={classes.main} ref={(el) => (this.rootRef = el)}>
          <TextField
            placeholder={"Enter the ID - Only numbers are accepted"}
            className={classes.searchText}
            InputProps={{
              "aria-label": options.textLabels.toolbar.search,
            }}
            value={this.state.inputValue}
            onChange={this.handleTextChange}
            fullWidth={true}
            inputRef={(el) => (this.searchField = el)}
          />
          <IconButton className={classes.clearIcon} onClick={onHide}>
            <ClearIcon />
          </IconButton>
        </div>
      </Grow>
    );
  }
}

export default withStyles(CustomSearchRender, defaultSearchStyles, {
  name: "CustomSearchRender",
});
