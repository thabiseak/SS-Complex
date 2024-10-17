// import Container from "@/components/Shared/Container";
import React, { useState } from "react";
// import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/router";
// import { isEmpty } from "@/utils/utils";
import { Link } from "react-router-dom";
import { addAPI } from "../../service/api";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required("new Password is required"),
  password: Yup.string().required("Password is required"),
  cnewpassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const RegisterPage = ({ AllData }) => {
  // const router = useRouter();

  const RegisterData = (obj, resetForm) => {
    console.log(obj, "--------");
    let sendData = {
      currentPassword: obj.password,
      newPassword: obj.newPassword,
    };
    addAPI("auth/password/" + AllData._id, sendData)
      .then((resp) => {
        toast.success("Successfully Added!");
        resetForm();
        setLoading(false);
      })
      .catch(
        (err) => toast.error(err.response.data.error || "somthing went wrong"),
        setLoading(false)
      );
  };

  const [Loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      password: "",
      cnewpassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      RegisterData(values, resetForm);
      // try {
      //   // Perform the API request (replace the URL with your actual API endpoint)
      //   const response = await axios.post(
      //     "http://localhost:3000/api/auth/login",
      //     values
      //   );
      //   console.log(response);

      //   // Handle success
      //   if (!isEmpty(response.data.result)) {
      //     toast.success("Register successfully");
      //     localStorage.setItem(
      //       "userData",
      //       JSON.stringify(response.data.result)
      //     );
      //   } else {
      //     toast.error("email or password incorrect");
      //   }
      // } catch (error) {
      //   // Handle error
      //   console.error("Error submitting data:", error);

      //   // Display error message (you can use a toast library or another UI element)
      //   toast.error("Error Register data. Please try again.");
      // } finally {
      //   setLoading(false);
      // }
    },
  });
  return (
    <div className="w-full bg-white rounded-xl">
      <br /> <br />
      <div
        className="text-center p-4 border rounded-sm"
        style={{
          maxWidth: "400px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <h1 className="text-2xl font-bold text-slate-800 uppercase">
          Update Password
        </h1>

        <div className="w-full h-full p-5 rounded">
          <form onSubmit={formik.handleSubmit}>
            <div
              className="flex flex-col justify-between h-full text-slate-500"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <div className="mt-5 space-y-2">
                <input
                  type="password"
                  placeholder="Old Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-3 px-3 rounded ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-red"
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.password}
                  </div>
                )}
                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-3 px-3 rounded ${
                    formik.touched.newPassword &&
                    formik.errors.newPassword &&
                    "border-red"
                  }`}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.newPassword}
                  </div>
                )}
                <input
                  type="password"
                  placeholder="Conform New Password"
                  name="cnewpassword"
                  value={formik.values.cnewpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-3 px-3 rounded ${
                    formik.touched.cnewpassword &&
                    formik.errors.cnewpassword &&
                    "border-red"
                  }`}
                />
                {formik.touched.cnewpassword && formik.errors.cnewpassword && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.cnewpassword}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 mt-10 text-white bg-blue-900 rounded-md "
                disabled={Loading}
                style={{ background: "#01959a" }}
              >
                {Loading ? "Loading ..." : "UPDATE PASSWORD"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
