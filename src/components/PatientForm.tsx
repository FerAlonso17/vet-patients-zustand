import { useForm } from "react-hook-form"
import Error from "./Error"
import { DraftPatient } from "../types"
import { usePatientStore } from "../store"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function PatientForm() {

    const addPatient = usePatientStore(state => state.addPatient)
    const updatedPatient = usePatientStore(state => state.updatedPatient)
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<DraftPatient>()

    useEffect(() => {
        if (activeId) {
            const activePatient=patients.filter(patient=>patient.id===activeId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('date', activePatient.date)
            setValue('email', activePatient.email)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId])

    const registerPatient = (data: DraftPatient) => {
        if(activeId) {
            updatedPatient(data)
            toast('Patient updated correctly', {
                type: 'success'
            })
        } else {
            addPatient(data)
            toast.success('Patient added correctly')
        }
        reset()
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Follow-up Patients</h2>

            <p className="text-lg mt-5 text-center mb-5">
                Add Patients and {''}
                <span className="text-indigo-600 font-bold">manage them</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-5 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Patient
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Name of Patient"
                        {...register('name', {
                            required: 'Name required'
                        })}
                    />
                    {errors.name && (<Error>{errors.name?.message}</Error>)}
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Owner
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Name of owner"
                        {...register('caretaker', {
                            required: 'Owner required'
                        })}
                    />
                    {errors.caretaker && (<Error>{errors.caretaker?.message}</Error>)}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email of register"
                        {...register("email", {
                            required: "Email required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email no valid'
                            }
                        })}
                    />
                    {errors.email && (<Error>{errors.email?.message}</Error>)}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Discharge date
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'Date required'
                        })}
                    />
                    {errors.date && (<Error>{errors.date?.message}</Error>)}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Symptoms
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Symptoms of the patient"
                        {...register('symptoms', {
                            required: 'Symptoms required'
                        })}
                    />
                    {errors.symptoms && (<Error>{errors.symptoms?.message}</Error>)}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-2 text-white rounded-2xl uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Save patient'
                />
            </form>
        </div>
    )
}
