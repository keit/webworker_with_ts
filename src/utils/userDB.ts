export interface User {
  name: string,
  email: string
}

export function findUsers(criteria: string): User[] {
  return [
    {name: 'Kei', email: 'kei@abc.co.nz'},
    {name: 'Blues', email: 'blues@abc.co.nz'},
    {name: 'Jake', email: 'Jake@abc.co.nz'}
  ]
}
