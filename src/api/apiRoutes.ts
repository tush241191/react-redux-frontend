export const API_PATHS = {
  USER_BASE: '/user/',
  USER_LOGIN: '/user/login',
  USER_LOGOUT: '/user/logout',
  USER_VALIDATE: '/user/validate',

  PRODUCER_VERIFY: '/producer/:id/verify',
  PRODUCER_FACILITIES: '/producer/:id/facilities',

  CONTRACT_LIST: '/contract/list',

  PARTNER_LIST: '/producer/:id/partners/list',
  PARTNER_UPDATE: '/producer/:id/partners/:partnerId',

  GET_PRODUCER_VERIFICATIONS: '/producer/:id/report-verification/list',
  GET_FACILITY_VERIFICATIONS: '/facility/:facilityId/report-verification/list',

  INVOICE_UPLOAD: '/producer/:id/invoice/upload'
}
