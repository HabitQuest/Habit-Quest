import NewHabitForm from "./NewHabitForm";

export const NewHabitModal = ({ showModal, setShowModal, onSave }) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black opacity-80"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-full h-1/2 max-w-3xl mx-auto my-6">
              <div className="relative flex flex-col w-full h-auto border-0 rounded-xl shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between  border-b border-solid rounded-t border-blueGray-200"></div>
                <h1 className="text-center text-3xl bg-dark-green p-4 font-bold">
                  New Habit
                </h1>

                <div className="relative flex-auto bg-dark-green p-6">
                  <NewHabitForm onSave={onSave} setShowModal={setShowModal} />
                </div>
                <div className="flex items-center space-x-4 justify-end p-6 border-t border-solid rounded-b bg-transparent border-blueGray-200">
                  <button
                    className="px-5 py-2 text-red-500 border border-red-500 rounded-lg"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
