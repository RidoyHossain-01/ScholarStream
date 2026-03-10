import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const ApplicationDetailsModal = ({ closeModal, isOpen, application }) => {
  const {
    scholarshipName,
    universityName,
    subjectCategory,
    scholarshipCategory,
    degree,
    applicationFees,
    tuitionFees,
    serviceCharge,
    universityImage,
    applicationDate,
    paymentStatus,
    applicationStatus,
    transactionId,
    student,
  } = application;
  return (
    <Dialog
      open={isOpen}
      as="div"
      className={" relative z-10 focus:outline-none"}
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-fit bg-base-100 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl border border-base-300"
          >
            <DialogTitle
              as="h3"
              className="text-xl font-medium text-center leading-6 text-primary"
            >
              <span className="text-accent ">Application</span> Details
            </DialogTitle>

            <div className="divider"></div>

            {/* University Section */}
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={universityImage}
                alt={universityName}
                className="w-full md:w-48 h-32 object-cover rounded-lg border"
              />

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold">{scholarshipName}</h3>
                <p className="text-base-content/60">{universityName}</p>

                <div className="flex flex-wrap gap-2 mt-2 items-center">
                  <span className="badge badge-outline ">{degree}</span>
                  <span className="badge badge-outline">{subjectCategory}</span>
                  <span className="badge badge-outline">
                    {scholarshipCategory}
                  </span>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Student Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Student Information
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <p>
                  <strong>Name:</strong> {student?.name}
                </p>
                <p>
                  <strong>Email:</strong> {student?.email}
                </p>
                <p>
                  <strong>Application Date:</strong> {applicationDate}
                </p>
                <p>
                  <strong>Transaction ID:</strong> {transactionId}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            {/* Financial Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Financial Information
              </h4>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="text-sm text-base-content/60">
                    Application Fees
                  </p>
                  <p className="text-sm font-semibold">${applicationFees}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-base-content/60">Tuition Fees</p>
                  <p className="text-sm font-semibold">${tuitionFees}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-base-content/60">Service Charge</p>
                  <p className="text-sm font-semibold">${serviceCharge}</p>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="mt-6 border-t border-base-200 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-base-content/60">
                    Application Status
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${
                      applicationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : applicationStatus === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {applicationStatus}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Payment Status</p>
                  <span
                    className={`badge ${
                      paymentStatus === "Paid" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {paymentStatus}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={closeModal}
              className={"bg-accent text-white w-full rounded-lg mt-5 p-2 "}
            >
              Close
            </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
