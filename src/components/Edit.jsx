import axios from "axios";
import React, { useEffect, useState } from "react";

const Edit = (props) => {
  var editDataObj = props.editData;
  // console.log(props.editjsxData);
  // console.log(editArray.stateValues.States);
  // const idToEdit = (node) => {
  //   props.onEdit(node);
  //   console.log(idToEdit);
  // };
 

  //manager app

  // const [stateEdit, setStateEdit] = useState({
  //   data: {
  //     formValues: {
  //       department: "",
  //     },
  //     desValue: {
  //       designation: "",
  //     },
  //     stateValue: {
  //       States: "",
  //     },
  //     districtValue: {
  //       districts: "",
  //     },
  //     id: ""
  //   }
  // });

  // useEffect(() => {
  //   getData(idToEdit.id);
  // }, [idToEdit.id]);

  // const getData = async (id) => {
  //   let a = await axios.get(`http://localhost:9089/data${id}`);
  //   console.log(a);

  //   setStateEdit({
  //     ...stateEdit,
  //     data: a.data,
  //   });
  // };

  // let updateInput = (event) => {
  //   setStateEdit({
  //     ...stateEdit,
  //     data: {
  //       ...stateEdit.data,
  //       [event.target.formValues.department]:
  //         event.target.formValues.department.value,
  //     },
  //   });
  // };

  // let submitForm = async (e) => {
  //   e.preventDefault();
  //   props.postDB(e);
  // };

  return (
    // <div className="col-md-4">
    //   <form onSubmit={submitForm}>
    //     <div className="mb-2">
    //       <input
    //         required={true}
    //         name="department"
    //         value={data.formValues.department}
    //         onChange={updateInput}
    //         type="text"
    //         placeholder="Deparment"
    //       />
    //     </div>

    //     <div className="mb-2">
    //       <input
    //         required={true}
    //         name="designation"
    //         value={data.desValue.designation}
    //         onChange={updateInput}
    //         type="text"
    //         placeholder="Designation"
    //       />
    //     </div>

    //     <div className="mb-2">
    //       <input
    //         required={true}
    //         name="state"
    //         value={data.stateValue.States}
    //         onChange={updateInput}
    //         type="number"
    //         placeholder="State"
    //       />
    //     </div>

    //     <div className="mb-2">
    //       <input
    //         required={true}
    //         name="District"
    //         value={data.districtValue.districts}
    //         onChange={updateInput}
    //         type="email"
    //         placeholder="District"
    //       />
    //     </div>
    //   </form>
    // </div>
    <></>
  );
};

export default Edit;
