import React, { useEffect, useState } from "react";
import axios from "axios";

const host = 'http://18.191.151.223:8080'

function UserProfile() {
  let [userInfo, setUserInfo] = useState({});
  let [disabled, setDisabled] = useState(true);
  let [userError, setUserError] = useState({});
  let [isSubmit, setIsSubmit] = useState(false);
  let [patientId, setPatientId] = useState(
    JSON.parse(localStorage.getItem("patientEmail"))
  );
  //let patientId = JSON.parse(localStorage.getItem('patientEmail'));
  // console.log(JSON.parse(localStorage.getItem('patientEmail')));
  const editAllFields = () => {
    setDisabled(false);
  };

  // validation function
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.mobileNo) {
      errors.mobileNo = "Mobile Number is required!";
    }
    if (!values.city) {
      errors.city = "City is required!";
    }
    if (!values.medicalhistory) {
      errors.medicalHistory = "Medical History is required!";
    }
    return errors;
  };

  // This function will run when update button will clicked...
  const saveUserProfileData = () => {
    let error = validate(userInfo);
    setUserError(error);
    setIsSubmit(true);
    console.log(error);
    if (Object.keys(error).length === 0) {
      axios
        .put(`${host}/userservice/api/v1/user/patient`, userInfo)
        .then((response) => {
          setUserInfo(response.data);
          setDisabled(true);
        });
    }
  };

  useEffect(() => {
    console.log(patientId);
    axios
      .get(`${host}/userservice/api/v1/user/patient/${patientId}`)
      .then((res) => {
        const persons = res.data;
        setUserInfo(persons);
      });
  }, []);

  return (
    <>
      <div className="col-md-9 border">
        <div className="">
          <div className="row">
            <div className="col-md-12 patientProfileInput">
              <div className="p-3 py-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">User Profile</h4>
                  <h2>
                    <i
                      className="fas fa-edit"
                      onClick={() => {
                        editAllFields();
                      }}
                    ></i>
                  </h2>
                </div>
                <div className="row mt-2 patientProfileInput">
                  <div className="col-md-6">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      value={userInfo.name}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setUserInfo((prev) => {
                          return { ...prev, name: e.target.value };
                        });
                      }}
                    />
                    <label className="errors">{userError.name}</label>
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email Id"
                      value={userInfo.email}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setUserInfo((prev) => {
                          return { ...prev, email: e.target.value };
                        });
                      }}
                    />
                    <label className="errors">{userError.email}</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Mobile Number"
                      value={userInfo.mobileNo}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setUserInfo((prev) => {
                          return { ...prev, mobileNo: e.target.value };
                        });
                      }}
                    />
                    <label className="errors">{userError.mobileNo}</label>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your City Name"
                      value={userInfo.city}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setUserInfo((prev) => {
                          return { ...prev, city: e.target.value };
                        });
                      }}
                    />
                    <label className="errors">{userError.city}</label>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Upload Your image"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Medical History</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Write your Medical History"
                      value={userInfo.medicalhistory}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setUserInfo((prev) => {
                          return { ...prev, medicalhistory: e.target.value };
                        });
                      }}
                    />
                    <label className="errors">{userError.medicalHistory}</label>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    disabled={disabled ? true : false}
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                      saveUserProfileData();
                    }}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
