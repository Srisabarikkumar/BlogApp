import { MdOutlineMail, MdPassword } from "react-icons/md";
import loginImg from "../../../assets/Mobile login-cuate.svg";
import { Link } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { FiLoader } from "react-icons/fi";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();

  const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 lg:flex hidden items-center justify-center">
        <img src={loginImg} alt="login" className="lg:h-2/3" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            login(values);
            setSubmitting(false);
          }}
        >
          {({ getFieldProps, values, setFieldTouched }) => {
            const handleBlur = async (field) => {
              await setFieldTouched(field, true);
              try {
                await LoginSchema.validateAt(field, values);
              } catch (error) {
                toast.dismiss();
                toast.error(error.message);
              }
            };

            return (
              <Form className="lg:w-2/3 md:w-auto mx-auto md:mx-20 flex gap-4 flex-col">
                <img src={loginImg} alt="login" className="h-24 lg:hidden" />
                <h1 className="text-4xl font-extrabold">Sign in</h1>

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
                </div>

                <button
                  type="submit"
                  className="btn rounded-full btn-primary"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <FiLoader className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>

        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-lg">Don't have an account?</p>
          <Link to="/register">
            <button className="btn rounded-full btn-primary btn-outline w-full">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
