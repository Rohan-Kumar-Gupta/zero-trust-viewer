import { create } from 'zustand'
import { Policy } from '../../api/PoliciesApi'

interface PolicyDetailsState {
  id: string
  name: string
  criteria: string
  description: string
  precedence: string
  isOpened: boolean
  editMode: boolean
  nameError: boolean
  criteriaError: boolean
  descriptionError: boolean
  precedenceError: boolean
  openDialog: (editMode: boolean, policy: Policy) => void
  closeDialog: () => void
  setName: (value: string) => void
  setCriteria: (value: string) => void
  setDescription: (value: string) => void
  setPrecedence: (value: string) => void
  validateForm: () => void
  resetDetailFormFields: () => void
}

const initialState = {
  id: '',
  name: '',
  criteria: '',
  description: '',
  precedence: '',
  isOpened: false,
  editMode: false,
  nameError: false,
  criteriaError: false,
  descriptionError: false,
  precedenceError: false
}

export const usePoliciesDetailsStore = create<PolicyDetailsState>((set, get) => ({
  ...initialState,
  openDialog: (editMode, policy) =>
    set({
      isOpened: true,
      editMode,
      id: policy.id.toString(),
      name: policy.name,
      criteria: policy.criteria,
      description: policy.description,
      precedence: policy.precedence.toString()
    }),
  closeDialog: () => set({ ...initialState }),
  setName: value => set({ name: value }),
  setCriteria: value => set({ criteria: value }),
  setDescription: value => set({ description: value }),
  setPrecedence: value => set({ precedence: value }),
  validateForm: () => {
    const { name, criteria, description, precedence } = get()
    set({
      nameError: name.trim() === '',
      criteriaError: criteria.trim() === '',
      descriptionError: description.trim() === '',
      precedenceError: !(precedence && parseInt(precedence) > 0)
    })
  },
  resetDetailFormFields: () => set({ ...initialState })
}))
