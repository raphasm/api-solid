import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository

let searchGymsUseCase: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.4998514,
      longitude: -46.8543534,
    })

    await inMemoryGymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -23.4998514,
      longitude: -46.8543534,
    })

    const { gyms } = await searchGymsUseCase.execute({
      query: 'JavaScript',
      page: 1,
    })
    // console.log(gyms)
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch pagineted gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.4998514,
        longitude: -46.8543534,
      })
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: 'JavaScript',
      page: 2,
    })
    // console.log(gyms)

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
