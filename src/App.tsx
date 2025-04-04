import { ToastContainer } from "react-toastify"
import PatientForm from "./components/PatientForm"
import PatientsList from "./components/PatientsList"
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <>
      <div className="container mx-auto mt-10">
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
          Patients follow-up {''}
          <span className="text-indigo-700">Veterinary</span>
        </h1>

        <div className="mt-12 md:flex w-3/4 mx-auto gap-5">
          <PatientForm />
          <PatientsList />
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default App
