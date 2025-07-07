import { Link } from "react-router-dom";
import signupImg from "../../../assets/Mobile login-pana.svg";
import { MdFrontLoader, MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../../store/useAuthStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const { isSigningUp, signup } = useAuthStore();

  const SignUpSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 lg:flex hidden items-center justify-center">
        <img src={signupImg} alt="signup" className="lg:h-2/3" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={SignUpSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            signup(values);
            setSubmitting(false);
          }}
        >
          {({ getFieldProps, values, setFieldTouched }) => {
            const handleBlur = async (field) => {
              await setFieldTouched(field, true);
              try {
                await SignUpSchema.validateAt(field, values);
              } catch (error) {
                toast.dismiss();
                toast.error(error.message);
              }
            };

            return (
              <Form className="lg:w-2/3 md:w-auto mx-auto md:mx-20 flex gap-4 flex-col">
                <img src={signupImg} alt="signup" className="h-24 lg:hidden" />
                <h1 className="text-4xl font-extrabold">Sign up</h1>

                <label className="input input-bordered rounded flex items-center gap-2">
                  <FaUser />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Name"
                    {...getFieldProps("name")}
                    onBlur={() => handleBlur("name")}
                  />
                </label>

                <div className="flex gap-4 flex-wrap">
                  <label className="input input-bordered rounded flex items-center gap-2 flex-1">
                    <MdOutlineMail />
                    <input
                      type="email"
                      className="grow"
                      placeholder="Email"
                      {...getFieldProps("email")}
                      onBlur={() => handleBlur("email")}
                    />
                  </label>

                  <label className="input input-bordered rounded flex items-center gap-2 flex-1">
                    <MdPassword />
                    <input
                      type="password"
                      className="grow"
                      placeholder="Password"
                      {...getFieldProps("password")}
                      onBlur={() => handleBlur("password")}
                    />
                  </label>

                  <label className="input input-bordered rounded flex items-center gap-2 flex-1">
                    <MdPassword />
                    <input
                      type="password"
                      className="grow"
                      placeholder="Confirm password"
                      {...getFieldProps("passwordConfirm")}
                      onBlur={() => handleBlur("passwordConfirm")}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn rounded-full btn-primary"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <MdFrontLoader className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>

        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
