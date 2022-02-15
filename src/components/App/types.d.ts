export interface Query {
  createdAt: {
    gte: string
    lt: string
  }
  updatedAt: {
    gte: string
    lt: string
  }
}
