import { toast } from "react-toastify"
import { usePatientStore } from "../store"
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

type PatitentDetailsProps = {
    patient:Patient
}

export default function PatitentDetails({patient}:PatitentDetailsProps) {

    const deletePatient = usePatientStore((state)=>state.deletePatient)
    const getPatientById = usePatientStore((state)=>state.getPatientById)

    const handleClick =()=>{
        deletePatient(patient.id)
        toast('Patient deleted',{
            type:'error'
        })
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="Name" data={patient.name} />
            <PatientDetailItem label="Owner" data={patient.caretaker} />
            <PatientDetailItem label="Email" data={patient.email} />
            <PatientDetailItem label="Discharge Date" data={patient.date.toString()} />
            <PatientDetailItem label="Symptoms" data={patient.symptoms} />
            
            <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white font-bold uppercase rounded-lg"
                    onClick={()=>getPatientById(patient.id)}
                >Edit</button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white font-bold uppercase rounded-lg"
                    onClick={handleClick}
                >Delete</button>
            </div>
        </div>
    )
}
