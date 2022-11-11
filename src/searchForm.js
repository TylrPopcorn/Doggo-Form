import React from "react";

class searchForm extends React.Component {
  constructor() {
    //Using a constructor this time to show both examples being used.
    super();
    this.state = {
      inputValue: "", //Used to keep track of the input from the textbar.
    };
  }

  //--
  //Each time the search bar changes
  onChange = (evt) => {
    this.setState({
      inputValue: evt.target.value, //Allow the search bar to be updated.
    });

    this.props.onChange(evt);
  };

  //--
  //Each time the form gets submitted
  onSubmit = (evt) => {
    evt.preventDefault();

    this.props.searchDogs(this.state.inputValue); //Bubble up and send the data back to APP.js.

    this.setState({
      inputValue: "",
    });
  };

  render() {
    return (
      <div className="searchForm">
        <form onSubmit={this.onSubmit}>
          <label>
            Dog breed:
            {/** Input field */}
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.onChange}
            />
          </label>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default searchForm;
