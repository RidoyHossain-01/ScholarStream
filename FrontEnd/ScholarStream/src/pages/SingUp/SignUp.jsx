import toast from "react-hot-toast";
import Button from "../../components/shared/Button/Button";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogIn from "../Login/SocialLogIn/SocialLogIn";
import { imageUpload, saveOrUpdateUser } from "../../utils";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = async (data) => {
    const { name, image, email, password } = data;

    const imageFile = image?.[0];
    // console.log(imageFile);

    try {
      await registerUser(email, password);
      // console.log(registerResult);
      let imageURL = `https://i.ibb.co.com/211nxxrH/Sample-User-Icon.png`;

      //storing the image to imagebb
      if (imageFile) {
        imageURL = await imageUpload(imageFile);
      }

      // console.log(imageURL);

      //save or update user on the
      await saveOrUpdateUser({ name, email, image: imageURL });

      //updating user profile
      const userProfile = {
        displayName: name,
        photoURL: imageURL,
      };

      await updateUserProfile(userProfile);
      // console.log(updatedResult);
      navigate(location.state || "/");
      toast.success("Signed up successfully 🎉");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm  shrink-0 shadow-2xl m">
        <div className="card-body">
          <button className=" text-primary text-2xl animation font-bold">
            Scholar<span className="text-accent">Stream</span>
          </button>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <fieldset className="fieldset">
              {/* name input */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name can not be more that 20 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.name.message}
                </p>
              )}
              {/* image input */}
              <label className="label">Image</label>
              <input
                type="file"
                className="file-input file-input-primary"
                {...register("image")}
              />

              {/* email input */}
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

              {/* password input */}
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
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                    message:
                      "Password must have at least one uppercase, one lowercase, one number and one special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.password.message}
                </p>
              )}

              {/* forget password  */}
              <div className="mb-4">
                <a className="link link-hover">Forgot password?</a>
              </div>

              {/* sign up button */}
              <Button type={"submit"} label={"Sign Up"} />
            </fieldset>
          </form>
          <SocialLogIn />
          <p className="mt-2 text-xs">
            {" "}
            Already have an account?{" "}
            <Link
              state={location?.state}
              className="link link-hover font-bold text-primary"
              to={"/login"}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
