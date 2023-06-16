export class EmployeeService {
  constructor() {}

  accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzeXN0ZW1OYW1lIjoiQURNSU4tR09ULUVNUC1BUEkiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE2MTA2MzA2ODF9.dZc9c19zPf1o7E2VdCoRT97xvKvt0JNYwaE2eFT-DUI';

  url = 'https://docker.geotalent.co.th/hr-qa/api/v1/employees';

  getHeader() {
    return {
      'x-api-key': this.accessToken,
    };
  }
}
