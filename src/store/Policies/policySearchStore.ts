import { create } from 'zustand'
import { searchPolicyApi, Policy } from '../../api/PoliciesApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeState'
import { buildQueryParams } from '../../utils'
import { ROWS_PER_PAGE } from '../../utils/constants'

interface PolicySearchForm {
  id: string
  name: string
  criteria: string
  precedence: string
  page: number
  pageSize: number
}

interface PolicySearchResult {
  rows: Policy[]
  totalRows: number
}

interface PolicySearchState {
  form: PolicySearchForm
  result: PolicySearchResult
  queryParameters: string
  isSearchExpanded: boolean
  searchStatus: string
  searchError: string | null
  setIdentifier: (value: string) => void
  setName: (value: string) => void
  setCriteria: (value: string) => void
  setPrecedence: (value: string) => void
  setPage: (value: number) => void
  setPageSize: (value: number) => void
  rebuildQueryParametersFromState: () => void
  searchPolicies: () => Promise<void>
  resetSearchFormFields: () => void
  toggleSearch: () => void
}

export const usePoliciesSearchStore = create<PolicySearchState>((set, get) => ({
  form: { id: '', name: '', criteria: '', precedence: '', page: 1, pageSize: 5 },
  result: { rows: [], totalRows: 0 },
  queryParameters: '',
  isSearchExpanded: true,
  searchStatus: IDLE,
  searchError: null,
  setIdentifier: value => set(state => ({ form: { ...state.form, id: value } })),
  setName: value => set(state => ({ form: { ...state.form, name: value } })),
  setCriteria: value => set(state => ({ form: { ...state.form, criteria: value } })),
  setPrecedence: value => set(state => ({ form: { ...state.form, precedence: value } })),
  setPage: value => set(state => ({ form: { ...state.form, page: value } })),
  setPageSize: value => set(state => ({ form: { ...state.form, pageSize: value } })),
  rebuildQueryParametersFromState: () => {
    const parametersArray = Object.entries(get().form).map(([parameterName, parameterValue]) => ({ paramName: parameterName, paramValue: parameterValue }))
    set({ queryParameters: buildQueryParams(parametersArray) })
  },
  searchPolicies: async () => {
    set({ searchStatus: LOADING })
    try {
      const response = await searchPolicyApi(get().queryParameters)
      set({ searchStatus: SUCCEEDED, result: { rows: response.rows, totalRows: response.totalRows } })
    } catch (error: any) {
      set({ searchStatus: FAILED, searchError: error.message || String(error) })
    }
  },
  resetSearchFormFields: () => set(state => ({ form: { id: '', name: '', criteria: '', precedence: '', page: 1, pageSize: state.form.pageSize } })),
  toggleSearch: () => set(state => ({ isSearchExpanded: !state.isSearchExpanded }))
}))
