import { create } from 'zustand'
import { deletePolicyApi } from '../../api/PoliciesApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeState'

type Status = typeof IDLE | typeof LOADING | typeof SUCCEEDED | typeof FAILED

interface PolicyDeleteState {
  deleteStatus: Status
  deleteError: string | null
  deletePolicy: (id: string | number) => Promise<void>
  resetDeleteStatus: () => void
}

export const usePoliciesDeleteStore = create<PolicyDeleteState>(set => ({
  deleteStatus: IDLE,
  deleteError: null,
  deletePolicy: async id => {
    set({ deleteStatus: LOADING })
    try {
      await deletePolicyApi(id)
      set({ deleteStatus: SUCCEEDED })
    } catch (error: any) {
      set({ deleteStatus: FAILED, deleteError: error.message || String(error) })
    }
  },
  resetDeleteStatus: () => set({ deleteStatus: IDLE, deleteError: null })
}))
