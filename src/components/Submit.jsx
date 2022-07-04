import React from "react";


const Submit = (props) => (
  <form>
  
    <input
    required={true}
      type="submit"
      value="Submit"
      style={{align:"center",padding:"5px",margin:"10px 0px 0px 140px",color:"white",background:"blue"}}
      onClick={(event) => {
        event.preventDefault();
        
        props.clearForm();
        // props.onFormSubmit(event);
        // props.onFormSubmit1(event);
        // props.onFormSubmit2(event);
        // props.onFormSubmit3(event);
        // props.onFinSubmit(event);

        // props.getDb();
        props.postDB(event);
      }}
    />
  </form>
);

export default Submit;
