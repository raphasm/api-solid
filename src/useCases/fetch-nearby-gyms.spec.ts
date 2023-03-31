import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository

let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.4998514,
      longitude: -46.8543534,
    })

    await inMemoryGymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -23.5016662,
      longitude: -46.546365,
    })

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: -23.4998514,
      userLongitude: -46.8543534,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
