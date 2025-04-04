import { create } from "zustand"
import { DraftPatient, Patient } from "./types"
import { v4 as uuidv4 } from 'uuid'
import { devtools, persist } from "zustand/middleware"

type PatientState = {
    patients: Patient[]
    activeId: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatedPatient:(data:DraftPatient)=>void
}

const createPatientComplete = (patient: DraftPatient): Patient => {
    return { ...patient, id: uuidv4() }
}

export const usePatientStore = create<PatientState>()(devtools(persist((set) => ({
    patients: [],
    activeId: '',
    addPatient: (data) => {
        const newPatient = createPatientComplete(data)
        set((state) => ({
            patients: [...state.patients, newPatient]
        }))
    },
    deletePatient: (id) => {
        set((state) => ({
            patients: state.patients.filter(patient => patient.id !== id)
        }))
    },
    getPatientById: (id) => {
        set(() => ({
            activeId: id
        }))
    },
    updatedPatient:(data)=>{
        set((state)=>({
            patients: state.patients.map(patient=>patient.id === state.activeId ? {id: state.activeId, ...data} : patient),
            activeId:''
        }))
    }
}),{
    name:'patient-storage'
})))