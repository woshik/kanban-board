import React from 'react';

const index = () => (
  <form className="row justify-content-center">
    <div className="col-lg-4 col-4">
      <input
        type="password"
        className="form-control"
        placeholder="Write you task"
      />
    </div>
    <div className="col-auto">
      <button type="submit" className="btn btn-primary mb-3">
        Add
      </button>
    </div>
  </form>
);

export default index;
