import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    await checkInsRepository.create({
      gym_Id: 'gym-02',
      user_Id: 'user-01',
    })

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
