import { create } from 'zustand'
import { updatePolicyApi, Policy } from '../../api/PoliciesApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeState'

interface PolicyUpdateState {
  updateStatus: string
  updateError: string | null
  updatePolicy: (id: string | number, policy: Policy) => Promise<void>
  resetUpdateStatus: () => void
}

export const usePoliciesUpdateStore = create<PolicyUpdateState>(set => ({
  updateStatus: IDLE,
  updateError: null,
  updatePolicy: async (id, policy) => {
    set({ updateStatus: LOADING })
    try {
      await updatePolicyApi(id, policy)
      set({ updateStatus: SUCCEEDED })
    } catch (error: any) {
      set({ updateStatus: FAILED, updateError: error.message || String(error) })
    }
  },
  resetUpdateStatus: () => set({ updateStatus: IDLE, updateError: null })
}))
