import { usePatientStore } from "../store"
import PatitentDetails from "./PatitentDetails"

export default function PatientsList() {
    
    const patients = usePatientStore((state)=>state.patients)
    
    return (
        <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
            {patients.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">List of patients</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Manage your {''}
                        <span className="text-indigo-600 font-bold">Patients and Quotes</span>
                    </p>
                    {patients.map( patient => (
                        <PatitentDetails
                            key={patient.id}
                            patient={patient}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">There aren't Patients</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Star adding patients {''}
                        <span className="text-indigo-600 font-bold">and will appear in this place</span>
                    </p>
                    <div className="flex justify-center">
                        <img className="w-3/5" src="/vetp.png" alt="veterinary" />
                    </div>
                </>
            )}
        </div>
    )
}
