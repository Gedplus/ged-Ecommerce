import React from 'react'
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import {AiOutlineHome , AiOutlineMail} from "react-icons/ai"
import {BiInfoCircle , BiPhoneCall} from "react-icons/bi"
import Container from '../components/Container';
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlice';
const contactSchema = yup.object().shape({
  name: yup
  .string().required(" Name is Required"),
  email: yup
  .string()
  .email("Email should be valid")
  .required("Email is Required"),
  mobile: yup
  .string().required("Mobile is Required"),
  comment: yup
  .string().required("Comments is Required"),

});
const Contact = () => { 

  const dispatch = useDispatch();

  const formik = useFormik({
      initialValues: {
        name:"",
        email: "",
        mobile:"",
        comment:"",
      
     
      },
      validationSchema: contactSchema,
      onSubmit: (values) => {
        dispatch(createQuery(values))
      },
    });

  return (
  <>  <Meta title={"Contact Us"} />
  <BreadCrumb title="Contact Us" />
  <Container class1="contact-wrapper py-5 home-wrapper-2"> <div className="row">
        <div className="col-12">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.6708750136872!2d10.7412226753261!3d34.73868958117426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fe3b317d53004d%3A0x8fa823f72b7a4286!2sGEDPLUS!5e0!3m2!1sen!2stn!4v1697194976879!5m2!1sen!2stn" width="600" height="450" className="border-0 w-100" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="col-12 mt-5">
          <div className="contact-inner-wrapper d-flex justify-content-between">
<div><h3 className="contact-title mb-4">Contact</h3>
<form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
  <div>
    <input type="text" className="form-control" placeholder="Nom"
    value={formik.values.name} onChange={formik.handleChange("name")}
    onBlur={formik.handleBlur("name")} name='name' />
               <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
  </div>
  <div>
    <input type="email" className="form-control"  name='email' placeholder="Email"
    value={formik.values.email} onChange={formik.handleChange("email")}
    onBlur={formik.handleBlur("email")} />
       <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
  </div>
  <div>
    <input type="tel" className="form-control" name='mobile'  placeholder="NUmero de téléphone" 
    value={formik.values.mobile} onChange={formik.handleChange("mobile")}
    onBlur={formik.handleBlur("mobile")} />
       <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
  </div>
  <div>
    <textarea name="comment" id="" className="w-100 form-control"  cols="30" rows="4" placeholder="Message" 
    value={formik.values.comment} onChange={formik.handleChange("comment")}
                     onBlur={formik.handleBlur("comment")} ></textarea>
                         <div className="error">
            {formik.touched.comment && formik.errors.comment}
          </div>
  </div>
  <div><button className="button border-0">Submit</button></div>
</form>

</div>
<div><h3 className="contact-title mb-4">Prenez contact avec nous</h3>
<div>
  <ul className="ps-0">
    <li className="mb-3 d-flex gap-15 align-items-center"><AiOutlineHome className="fs-5"/><address className="mb-0">33 New Montgomery St. Ste 750 San Francisco, CA, USA 94105</address></li>
    <li className="mb-3 d-flex gap-15 align-items-center" ><BiPhoneCall className="fs-5" /><a href="tel:+91 85268658665">+91 85268658665</a></li>
    <li className="mb-3 d-flex gap-15 align-items-center" ><AiOutlineMail className="fs-5" /><a href="cherifsahar97@gmail.com">cherifsahar97@gmail.com</a></li>
    <li className="mb-3 d-flex gap-15 align-items-center"><BiInfoCircle className="fs-5" /><p className="mb-0">Monday - friday 10 AM - 8 PM </p></li>
    
    
    
    </ul></div></div>
          </div>
        </div>
      </div></Container>

  
  
  
  </>
  )
}

export default Contact
