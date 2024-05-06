import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { SearchCompanyDto } from './search-company.dto'

describe('SearchCompanyDto', () => {
  // Reset mocks and timers after each test
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('Given correct data - should validate without error', async () => {
    const company = {
      id: 1,
      name: 'some name',
      address: 'some address',
    }
    const dto = plainToInstance(SearchCompanyDto, company)
    const errors = await validate(dto)
    expect(dto.id).toEqual(1)
    expect(errors.length).toBe(0)
  })

  it('Given id as string - should convert to integer', async () => {
    const company = {
      id: '1',
      name: 'some name',
      address: null,
    }
    const dto = plainToInstance(SearchCompanyDto, company)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
    expect(dto.id).toEqual(1)
    expect(dto.name).toEqual('some name')
  })

  it('Given address as null - should not validate with error', async () => {
    const company = {
      name: 'some name',
      address: null,
    }
    const dto = plainToInstance(SearchCompanyDto, company)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
    expect(dto.name).toEqual('some name')
  })
})
