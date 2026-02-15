import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Field,
  Label,
  Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
const ApplicationFeedback = ({
  closeFeedback,
  feedbackOpen,
  applicationId,
  studentName,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isDisabled, setIsDisabled] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleFeedback = async (data) => {
    const feedback = { feedback: data.feedback };
    try {
      setIsDisabled(true);
      await axiosSecure.patch(
        `/application-feedback/${applicationId}`,
        feedback,
      );
      toast.success(`Feedback Sent to ${studentName}`);
      reset();
      refetch();
      setIsDisabled(false);
      closeFeedback();
    } catch (error) {
      toast.error(error.message);
      setIsDisabled(false);
    }
  };

  return (
    <Dialog
      open={feedbackOpen}
      as="div"
      className={" relative z-10 focus:outline-none"}
      onClose={closeFeedback}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-fit bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-primary"
            >
              <span className="text-accent">Application</span> Feedback
            </DialogTitle>
            <form onSubmit={handleSubmit(handleFeedback)}>
              <div className="w-full max-w-md px-4">
                <Field>
                  <Label className="text-sm/6 font-medium text-white">
                    Description
                  </Label>
                  <Description className="text-sm/6 ">
                    Feedback will be provided to {studentName}
                  </Description>
                  <Textarea
                    {...register("feedback", {
                      required: "Enter a valid feedback",
                    })}
                    className={clsx(
                      "mt-3 block w-full resize-none rounded-lg border-2 bg-white/5 px-3 py-1.5 text-sm/6 ",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
                    )}
                    rows={3}
                  />
                </Field>
                {errors.feedback && (
                  <p className="text-xs font-semibold text-red-500">
                    {errors.feedback.message}
                  </p>
                )}
              </div>
              <div className="flex mt-2 flex-col md:flex-row-reverse justify-center gap-2">
                <button
                  disabled={isDisabled}
                  type="submit"
                  className="btn text-white bg-green-500 btn-sm"
                >
                  Send Feedback
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ApplicationFeedback;
