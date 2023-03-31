import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Create Gym Use', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -23.4998514,
      longitude: -46.8543534,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
