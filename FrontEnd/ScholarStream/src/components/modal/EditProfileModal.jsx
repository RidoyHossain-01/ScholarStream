import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import toast from "react-hot-toast";

const EditProfileModal = ({ isOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, updateUserProfile, loading } = useAuth();
  const onSubmit = async (data) => {
    const { name, image } = data;
    const imageFile = image?.[0];
    try {
      let imageURL = user?.photoURL;
      if (imageFile) {
        imageURL = await imageUpload(imageFile);
      }
      //updating user profile
      const userProfile = {
        displayName: name,
        photoURL: imageURL,
      };
      await updateUserProfile(userProfile);
      await saveOrUpdateUser({ name, email: user?.email, image: imageURL });

      closeModal();
      window.location.reload();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none shadow-2xl"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-base-100 border border-base-300 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl"
            >
              <DialogTitle
                as="h3"
                className=" text-primary  text-2xl font-medium mb-4 text-center"
              >
                Edit Your Profile
              </DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* name input */}
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  defaultValue={user?.displayName}
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
                <label className="label mt-2">Image</label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full"
                  {...register("image")}
                />

                <div className="mt-6">
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default EditProfileModal;
