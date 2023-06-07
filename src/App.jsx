import { useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './App.css'

function App() {

  const Schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Email is invalid").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid").required("Email is required"),
    mobile: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Mobile number is invalid, Include countries code").min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits").required("Mobile number is required"),
    password: yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
    confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Confirm password is required")
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(Schema)
  }
    
  );

  const SendDataToServer = (data) => {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(SendDataToServer)} method="post">
  <div className="imgcontainer">
    <img src="../src/assets/portrait.png" alt="Avatar" className="avatar" />
  </div>

  <div className="container">
    <label htmlFor="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" {...register("username")} />
    <p>{errors.username?.message}</p>

    <label htmlFor="email"><b>Email</b></label>
    <input type="email" placeholder="Enter Email" name="email" {...register("email")} />
    <p>{errors.email?.message}</p>


    <label htmlFor="mobile"><b>Mobile Number</b></label>
    <input type="number" placeholder="Enter Mobile Number" name="mobile" {...register("mobile")} />
    <p>{errors.mobile?.message}</p>

    <label htmlFor="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" {...register("password")} />
    <p>{errors.password?.message}</p>

    <label htmlFor="psw"><b>Confirm Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" {...register("confirmpassword")} />
    <p>{errors.confirmpassword?.message}</p>

    <button type="submit">Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember" /> Remember me
    </label>
  </div>

  <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
    <button type="button" className="cancelbtn">Cancel</button>
    <span className="psw">Forgot <a href="#">password?</a></span>
  </div>
</form>
    </>
  )
}

export default App
