import { useEffect } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { Button, Upload, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { MdTitle } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import TiptapEditor from "../createblog/components/TiptapEditor";
import useBlogStore from "../../../store/useBlogStore";
import editBlogImg from "../../../assets/Blogging-cuate.svg";

const categoryOptions = ["career", "finance", "travel"];

const ValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string()
    .oneOf(categoryOptions, "Invalid category")
    .required("Category is required"),
  image: Yup.mixed().notRequired(),
});

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blog, getBlogById, updateBlogById } = useBlogStore();

  useEffect(() => {
    getBlogById(id);
  }, [id, getBlogById]);

  if (!blog) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 lg:flex hidden items-center justify-center">
        <img src={editBlogImg} alt="edit" className="lg:h-2/3" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <Formik
          enableReinitialize
          initialValues={{
            title: blog.title || "",
            content: blog.content || "",
            category: blog.category || "",
            image: null,
          }}
          validationSchema={ValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            let payload = { ...values };

            // Convert image to base64 if a new one is uploaded
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

            await updateBlogById(id, payload);
            setSubmitting(false);
            navigate("/my-blogs");
          }}
        >
          {({ errors, touched, getFieldProps, setFieldValue, values }) => (
            <Form className="w-full mx-auto md:mx-20 flex gap-4 flex-col">
              <img src={editBlogImg} alt="edit" className="h-24 lg:hidden" />
              <h1 className="text-4xl font-extrabold">Edit Blog</h1>

              <Upload
                beforeUpload={(file) => {
                  setFieldValue("image", file);
                  return false;
                }}
                showUploadList={
                  values.image ? [{ name: values.image.name }] : false
                }
              >
                <Button icon={<UploadOutlined />}>Cover image</Button>
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
                  Update
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

export default EditBlog;
