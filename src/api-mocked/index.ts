import mockedServer from './mockedServer'

import './mockedApi/MockedPoliciesApi'

mockedServer.onAny().passThrough()