import axios from 'axios'
import { API_URL } from '../utils/constants'

export interface Policy {
  id: string | number
  name: string
  criteria: string
  description: string
  score: { current: number; max: number }
  precedence: number
  templates: string[]
  namedNet: string
}

export interface SearchResult {
  page: number
  pageSize: number
  totalRows: number
  rows: Policy[]
}

export const searchPolicyApi = async (queryParameters: string): Promise<SearchResult> => {
    console.log("queryParameters", queryParameters,API_URL)
  const response = await axios.get<{ data: SearchResult }>(`${API_URL}/secured/policies${queryParameters}`)
  console.log("queryParameters", response)
  return response.data.data
}

export const addPolicyApi = async (policy: Policy): Promise<void> => {
  await axios.post(`${API_URL}/secured/policies`, policy)
}

export const updatePolicyApi = async (id: string | number, policy: Policy): Promise<void> => {
  await axios.put(`${API_URL}/secured/policies/${id}`, policy)
}

export const deletePolicyApi = async (id: string | number): Promise<void> => {
  await axios.delete(`${API_URL}/secured/policies/${id}`)
}
