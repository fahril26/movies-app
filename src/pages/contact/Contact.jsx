import { Button, Form, ListGroup } from "react-bootstrap";
import MyNavbar from "../../components/Navbar";
import "../../style/Contact.css";
import Footer from "../../components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Contact() {
  return (
    <>
      <MyNavbar />
      <div className="contact">
        <div className="container-fluid px-5 px-lg-4">
          <div className="row ">
            <div className="col-12 col-lg-8">
              <ContactForm />
            </div>

            <div className="col-12 col-lg-4 mt-5 mt-lg-0">
              <ContactInfo />
            </div>
          </div>
        </div>
        <div className="map-location ">
          <Map />
        </div>
      </div>
      <Footer />
    </>
  );
}

const initialValues = { name: "", email: "", subject: "", message: "" };
const validationSchema = Yup.object({
  name: Yup.string()
    .required("*Required!")
    .min(6, "*Must be 6 characters or more!"),
  email: Yup.string()
    .email("*Invalid email address!")
    .required("*Required!")
    .min(10, "*Must be 6 characters or more!"),
  subject: Yup.string()
    .required("*Required")
    .min(10, "*Must be 10 characters or more"),
  message: Yup.string()
    .required("*Required")
    .min(15, "*Must be 15 characters or more"),
});

const ContactForm = function ContactForm() {
  const formik = useFormik({
    initialValues,
    onSubmit: (value, { resetForm }) => {
      alert(`Thank You ${value.name} for contacting us :)`);

      resetForm();
    },

    validationSchema,
  });

  return (
    <>
      <Header title={"Contact Form"} />

      <Form className="contact-form p-5" onSubmit={formik.handleSubmit}>
        <div className="row mb-4">
          <div className="col-12 col-md-6 mb-4 mb-md-0 ">
            <Form.Control
              placeholder="You Name*"
              {...formik.getFieldProps("name")}
            />

            {formik.errors.name ? (
              <span className="error">
                {formik.touched.name && formik.errors.name}
              </span>
            ) : null}
          </div>
          <div className="col-12 col-md-6">
            <Form.Control
              type="email"
              placeholder="You Email*"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email ? (
              <span className="error">
                {formik.touched.email && formik.errors.email}
              </span>
            ) : null}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <Form.Control
              placeholder="Subject*"
              {...formik.getFieldProps("subject")}
            />

            {formik.errors.subject ? (
              <span className="error">
                {formik.touched.subject && formik.errors.subject}
              </span>
            ) : null}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <Form.Control
              as={"textarea"}
              placeholder="Type Your Message..."
              {...formik.getFieldProps("message")}
            />
            {formik.errors.message ? (
              <span className="error">
                {formik.touched.message && formik.errors.message}
              </span>
            ) : null}
          </div>
        </div>

        <div className="form-btn">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </>
  );
};

function ContactInfo() {
  const listItem = [
    {
      icon: <i className="bi bi-geo-alt-fill"></i>,
      info: "Adress",
      infoDetail: "Depok, Jawa Barat. Indonesia",
    },
    {
      icon: <i className="bi bi-telephone-fill"></i>,
      info: "Phone",
      infoDetail: "(+62) 1234567890",
    },

    {
      icon: <i className="bi bi-envelope-fill"></i>,
      info: "Email",
      infoDetail: "fhrl@mail.com",
    },
  ];

  return (
    <>
      <Header title={"Information"} />

      <div className="contact-info">
        <ListGroup as={"ul"}>
          {listItem.map((item) => (
            <ListItemInfo
              key={item.info}
              icon={item.icon}
              info={item.info}
              infoDetail={item.infoDetail}
            />
          ))}
        </ListGroup>
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function ListItemInfo({ icon, info, infoDetail }) {
  return (
    <ListGroup.Item as={"li"}>
      <span className={"icon-info"}>{icon}</span>
      <b>{info}: </b>
      <span className="info">{infoDetail}</span>
    </ListGroup.Item>
  );
}

// eslint-disable-next-line react/prop-types
function Header({ title }) {
  return (
    <header className="contact-header mb-4">
      <h4>{title}</h4>
    </header>
  );
}

function Map() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253763.06469116168!2d106.65298452516708!3d-6.38782234059918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e95620a297d3%3A0x1cfd4042316fb217!2sKota%20Depok%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700472810079!5m2!1sid!2sid"
      width="100%"
      height="450"
      loading="lazy"
    ></iframe>
  );
}
