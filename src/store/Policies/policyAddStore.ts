import { create } from 'zustand'
import { addPolicyApi, Policy } from '../../api/PoliciesApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeState'

type Status = typeof IDLE | typeof LOADING | typeof SUCCEEDED | typeof FAILED

interface PolicyAddState {
  addStatus: Status
  addError: string | null
  addPolicy: (policy: Policy) => Promise<void>
  resetAddStatus: () => void
}

export const usePoliciesAddStore = create<PolicyAddState>(set => ({
  addStatus: IDLE,
  addError: null,
  addPolicy: async policy => {
    set({ addStatus: LOADING })
    try {
      await addPolicyApi(policy)
      set({ addStatus: SUCCEEDED })
    } catch (error: any) {
      set({ addStatus: FAILED, addError: error.message || String(error) })
    }
  },
  resetAddStatus: () => set({ addStatus: IDLE, addError: null })
}))
