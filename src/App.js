import React from "React";
import axios from "axios";

//Dependencies:
//npm i parcel-bundler
//npm i axios
//npm i

import SearchForm from "./searchForm";

class App extends React.Component {
  //constructor():
  state = {
    //The data that will be kept track of.
    doggos: [], //All of the dogs.
    currentBreed: "", //The current breed searching for.
    errors: "", //Any errors that occur can be placed here.
  };

  //--
  //After the first render:
  componentDidMount() {
    axios
      .get(`https://dog.ceo/api/breeds/image/random`) //Make an axios GET request.
      .then((res) => {
        //console.log(res, res.data)
        this.setState({
          ...this.state,
          doggos: res.data.message, //Update the doggos value.
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          doggos: [],
          errors: err.message, //Update the errors value.
        });

        console.log(err.message, err);
      });
  }

  //--
  //Each time the user requests to search a dog breed:
  searchDogs = (dogbreed) => {
    // console.log(dogbreed);
    axios
      .get(`https://dog.ceo/api/breed/${dogbreed.toLowerCase()}/images`)
      .then((res) => {
        //console.log(res, res.data)
        //Update state.
        this.setState({
          currentBreed: dogbreed,
          doggos: res.data.message,
          errors: "",
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          currentBreed: "",
          doggos: [],
          errors: "Unable find dog breed.", //Update the errors value.
        });

        console.log(err.message, err);
      });
  };

  //--
  //Each time the input gets changed.
  onChange = (evt) => {
    console.log("changed");
    this.setState({
      ...this.state,
      errors: "",
    });

    //Do anything else with evt if you want.
  };

  //--
  //Render data to the page.
  render() {
    return (
      <div className="App">
        {/**----- The main main. ------*/}
        <h1> Doggos! </h1>
        <h3 id="error">{this.state.errors}</h3>
        <SearchForm searchDogs={this.searchDogs} onChange={this.onChange} />
        <br></br>
        {
          /** IF the doggos variable is a STRING then show 1 picture. ELSE 2+ */
          typeof this.state.doggos == "string" ? (
            /** Create a new image for the doggos item. **/
            <img src={this.state.doggos} alt={this.state.doggos} />
          ) : (
            this.state.doggos.map((item) => {
              /** Create a new image for the doggos items. **/
              return <img width="200" src={item} key={item} alt={item} />;
            })
          )
        }
      </div>
    );
  }
}

export default App;
