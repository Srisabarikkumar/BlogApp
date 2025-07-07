import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import createBlogImg from "../../../assets/Blog post-cuate.svg";
import { Button, Upload, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TiptapEditor from "./components/TiptapEditor";
import { MdTitle } from "react-icons/md";
import useBlogStore from "../../../store/useBlogStore";
import { Link, useNavigate } from "react-router-dom";

const categoryOptions = ["career", "finance", "travel"];

const CreateBlog = () => {
  const { createBlog } = useBlogStore();
  const navigate = useNavigate();

  const ValidationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    category: Yup.string()
      .oneOf(categoryOptions, "Invalid category")
      .required("Category is required"),
    image: Yup.mixed().notRequired(),
  });

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 lg:flex hidden items-center justify-center">
        <img src={createBlogImg} alt="signup" className="lg:h-2/3" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <Formik
          initialValues={{
            title: "",
            content: "",
            category: "",
            image: null,
          }}
          validationSchema={ValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            let payload = { ...values };

            if (values.image) {
              const toBase64 = (file) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = (error) => reject(error);
                });

              payload.image = await toBase64(values.image);
            }

            await createBlog(payload);
            setSubmitting(false);
            navigate("/");
          }}
        >
          {({ errors, touched, getFieldProps, setFieldValue, values }) => (
            <Form className="w-full mx-auto md:mx-20 flex gap-4 flex-col">
              <img
                src={createBlogImg}
                alt="signup"
                className="h-24 lg:hidden"
              />
              <h1 className="text-4xl font-extrabold">Create a Blog</h1>

              <Upload
                beforeUpload={(file) => {
                  setFieldValue("image", file);
                  return false;
                }}
                showUploadList={
                  values.image
                    ? [{ name: values.image.name, uid: "-1", status: "done" }]
                    : false
                }
              >
                <Button icon={<UploadOutlined />}>Add a cover image</Button>
              </Upload>

              <label className="input input-bordered rounded flex items-center gap-2">
                <MdTitle />
                <input
                  type="text"
                  className="grow text-2xl font-bold py-2"
                  placeholder="Blog title here..."
                  {...getFieldProps("title")}
                />
              </label>
              {errors.title && touched.title && (
                <div className="text-red-500">{errors.title}</div>
              )}

              <Field name="content">
                {({ field, form }) => (
                  <TiptapEditor
                    value={field.value}
                    onChange={(val) => form.setFieldValue("content", val)}
                  />
                )}
              </Field>
              {errors.content && touched.content && (
                <div className="text-red-500">{errors.content}</div>
              )}

              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">Select category</p>
                <Radio.Group
                  onChange={(e) => setFieldValue("category", e.target.value)}
                  value={values.category}
                >
                  {categoryOptions.map((cat) => (
                    <Radio.Button key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Radio.Button>
                  ))}
                </Radio.Group>
                {errors.category && touched.category && (
                  <div className="text-red-500">{errors.category}</div>
                )}
              </div>

              <div className="flex gap-4 justify-end">
                <button type="submit" className="btn rounded-full btn-primary">
                  Create
                </button>
                <Link to={"/my-blogs"}>
                  <button className="btn rounded-full btn-primary btn-outline">
                    Cancel
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateBlog;
