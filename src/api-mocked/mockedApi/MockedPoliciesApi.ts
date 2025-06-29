import mockedServer from "../mockedServer";
import mockedPolicies from "../mockedData/policies.json";
import { API_URL } from "../../utils/constants";

interface Policy {
  id: string | number;
  name: string;
  criteria: string;
  description: string;
  score: { current: number; max: number };
  precedence: number;
  templates: string[];
  namedNet: string;
}

interface QueryParameters {
  id?: string;
  name?: string;
  criteria?: string;
  precedence?: string;
  page?: string;
  pageSize?: string;
}

const policiesData: Policy[] = mockedPolicies as Policy[];

mockedServer
  .onGet(new RegExp(`${API_URL}/secured/policies`))
  .reply((request) => {
    if (!request.url) return [400, { success: false }];
    const url = new URL(request.url, window.location.origin);
    const searchParams = Object.fromEntries(
      url.searchParams.entries()
    ) as QueryParameters;
    const { id = "", name = "", criteria = "", precedence = "" } = searchParams;
    const filteredPolicies = policiesData.filter((policy) => {
      const matchId = id
        ? policy.id.toString().toLowerCase().includes(id.toLowerCase())
        : true;
      const matchName = name
        ? policy.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchCriteria = criteria
        ? policy.criteria.toLowerCase().includes(criteria.toLowerCase())
        : true;
      const matchPrecedence = precedence
        ? policy.precedence.toString().includes(precedence)
        : true;
      return matchId && matchName && matchCriteria && matchPrecedence;
    });
    const page = parseInt(searchParams.page ?? "") || 1;
    const pageSize =
      parseInt(searchParams.pageSize ?? "") || filteredPolicies.length;
    const rows = filteredPolicies;
    //   const startIndex = (page - 1) * pageSize
    //   const endIndex = startIndex + pageSize
    //   const rows = filteredPolicies.slice(startIndex, endIndex)
    return [
      200,
      {
        data: {
          page,
          pageSize,
          totalRows: filteredPolicies.length,
          rows,
        },
      },
    ];
  });

mockedServer
  .onPost(new RegExp(`${API_URL}/secured/policies`))
  .reply((config) => {
    const newPolicy = JSON.parse(config.data) as Policy;
    const newId = `${Date.now()}`;
    const record: Policy = { ...newPolicy, id: newId };
    policiesData.push(record);
    return [200, { success: true, policy: record }];
  });

mockedServer
  .onPut(new RegExp(`${API_URL}/secured/policies`))
  .reply((config) => {
    const updatedPolicy = JSON.parse(config.data) as Partial<Policy>;
    const segments = (config.url ?? "").split("/");
    const identifier = segments[segments.length - 1];
    const index = policiesData.findIndex(
      (policy) => policy.id.toString() === identifier
    );
    if (index === -1) return [404, { success: false }];
    policiesData[index] = { ...policiesData[index], ...updatedPolicy };
    return [200, { success: true, policy: policiesData[index] }];
  });

mockedServer
  .onDelete(new RegExp(`${API_URL}/secured/policies`))
  .reply((config) => {
    const segments = (config.url ?? "").split("/");
    const identifier = segments[segments.length - 1];
    const index = policiesData.findIndex(
      (policy) => policy.id.toString() === identifier
    );
    if (index === -1) return [404, { success: false }];
    policiesData.splice(index, 1);
    return [200, { success: true }];
  });
