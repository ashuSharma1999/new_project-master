import React from "react";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Label from "./Label";
export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      name: "",
      address: "",
      gender: "",
      dob: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      countryData: null,
      stateData: null,
    };
  }
  save = (e) => {
    e.preventDefault();
    this.props.FormTransfer({
      _id: this.state._id,
      name: this.state.name,
      address: this.state.address,
      gender: this.state.gender,
      dob: this.state.dob,
      country: this.state.country,
      state: this.state.state,
      city: this.state.city,
      pincode: this.state.pincode,
    });

    this.setState({
      name: "",
      address: "",
      gender: "",
      dob: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      id: "",
      countryData: null,
      stateData: null,
    });
  };

  UNSAFE_componentWillReceiveProps = (nextProps, nextState) => {
    if (nextProps.isEditing) {
      this.setState(nextProps.employeeEditableData);

      this.setCountryData(
        nextProps.employeeEditableData.country,
        nextProps.employeeEditableData.state
      );
    }
  };

  setCountryData = (country, state) => {
    this.props.countryList.forEach((i) => {
      if (i.name === country) {
        this.setState(
          () => {
            return {
              countryData: i,
              stateData: null,
            };
          },
          () => {
            this.setStateData(state, this.state.countryData);
          }
        );
      }
    });
  };

  setStateData = (state, countryData) => {
    countryData.states.forEach((i) => {
      if (i.name === state) this.setState({ stateData: i });
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.save}>
          <div>
            <h3>Registration Form</h3>
            <Label name={"Name:"} />
            <Input
              type="text"
              name="Name"
              placeholder="Enter Your Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <br />
          <div>
            <Label name={"Address:"} />
            <Input
              type="text "
              name="Address"
              placeholder="Enter Your Address"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
            />
          </div>
          <br />
          <div onChange={(e) => this.setState({ gender: e.target.value })}>
            <Label name={"Gender:"} />
            <Label name={"Male:"} />
            <Input type="radio" value="male" name="gender" />
            <Label name={"Female:"} />
            <Input type="radio" value="female" name="gender" />
            <Label name={"Others:"} />
            <Input type="radio" value="other" name="gender" />
          </div>
          <br />
          <div>
            <Label name={"DOB:"} />
            <Input
              type="date"
              name="DOB"
              value={this.state.dob}
              onChange={(e) => this.setState({ dob: e.target.value })}
            />
          </div>
          <br />
          <div>
            <Label name={"Country:"} />
            <Dropdown
              value={this.state.country}
              onChange={(e) => {
                this.setState({ country: e.target.value });
                this.setCountryData(e.target.value);
              }}
              list={this.props.countryList}
            />
          </div>
          <br />
          <div>
            <>
              <Label name={"State:"} />
              <Dropdown
                value={this.state.state}
                onChange={(e) => {
                  this.setState({ state: e.target.value });

                  this.setStateData(e.target.value, this.state.countryData);
                }}
                list={this.state.countryData && this.state.countryData.states}
              />
            </>
          </div>
          <br />
          <div>
            <>
              <Label name={"City:"} />
              <Dropdown
                value={this.state.city}
                onChange={(e) => this.setState({ city: e.target.value })}
                list={this.state.stateData && this.state.stateData.cities}
              />
            </>
          </div>
          <br />
          <div>
            <Label name={"Pincode:"} />
            <Input
              type="text"
              name="Pincode"
              value={this.state.pincode}
              onChange={(e) => this.setState({ pincode: e.target.value })}
            />
          </div>
          <br />
          <div>
            <Input
              type="submit"
              value={this.props.isEditing ? "Update" : "Save"}
            />
          </div>
        </form>
      </div>
    );
  }
}




// using axios data from local json



import React from "react";
import axios from "axios";
import Form from "./FormComponents/Form";
import List from "./FormComponents/List";

const BASE_URL = "https://crmnext-public-api.herokuapp.com/users";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isEditing: false,
      editableEmployee: null,
      countryList: [],
    };
  }

  FormtoApp = async (SingleData) => {
    const that = this;

    if (this.state.isEditing) {
      await axios
        .put(`${BASE_URL}/edit-details/${SingleData._id}`, SingleData)
        .then(() => {
          that.fetchEmployees();
        });

      this.setState({ isEditing: false, editableEmployee: null });
    } else {
      this.sendData(SingleData);
    }
  };

  handleEmployeeDelete = async (employeeId) => {
    const that = this;

    await axios.delete(`${BASE_URL}/delete-detail/${employeeId}`).then(() => {
      that.fetchEmployees();
    });
  };

  handleEmployeeEdit = async (employeeId) => {
    this.setState({
      isEditing: true,
    });
    const employeeToEdit = this.state.list.filter(
      (employee) => employee._id === employeeId
    );
    this.setState({ editableEmployee: employeeToEdit[0] });
  };

  fetchEmployees = async () => {
    const response = await axios.get(`${BASE_URL}/get-details`);
    const data = await response.data;

    this.setState({
      list: data,
    });
  };

  fetchCountryJSON = () => {
    const that = this;
    fetch("location.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({
          countryList: myJson,
        });
      });
  };

  componentDidMount = async () => {
    this.fetchCountryJSON();
    this.fetchEmployees();
  };
  sendData = async (data) => {
    delete data["_id"];
    await axios.post(`${BASE_URL}/add-details`, data).then(() => {
      this.fetchEmployees();
    });
  };
  render() {
    return (
      <>
        <Form
          FormTransfer={this.FormtoApp}
          isEditing={this.state.isEditing}
          employeeEditableData={this.state.editableEmployee}
          countryList={this.state.countryList}
        />
        <List
          list={this.state.list}
          onEditEmployee={this.handleEmployeeEdit}
          onDeleteEmployee={this.handleEmployeeDelete}
        />
      </>
    );
  }
}

export default App;