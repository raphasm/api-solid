import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const getUserProfileUseCase = new GetUserMetricsUseCase(
    prismaCheckInsRepository,
  )

  return getUserProfileUseCase
}
