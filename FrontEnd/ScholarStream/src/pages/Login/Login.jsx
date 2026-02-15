import { useForm } from "react-hook-form";
import Button from "../../components/shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogIn from "./SocialLogIn/SocialLogIn";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { logInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = async (data) => {
    const { email, password } = data;
    try {
      const { user } = await logInUser(email, password);
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(location?.state || "/");
      user && toast.success("Logged in Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm  shrink-0 shadow-2xl m">
        <div className="card-body">
          <button className=" text-primary text-2xl animation font-bold">
            Scholar<span className="text-accent">Stream</span>
          </button>
          <form onSubmit={handleSubmit(handleLogIn)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.email.message}
                </p>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters or more",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password can not be longer that 20 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.password.message}
                </p>
              )}
              <div className="mb-4">
                <a className="link link-hover">Forgot password?</a>
              </div>
              <Button type={"submit"} label={"Log in"} />
            </fieldset>
          </form>
          <SocialLogIn />
          <p className="mt-2 text-xs">
            {" "}
            New to ScholarStream?{" "}
            <Link
              state={location?.state}
              className="link link-hover font-bold text-primary"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
