import { Profile } from '@/entities/user'
import { baseApi } from '@/shared/api'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import axios from 'axios'

import { UserSettingsFormData } from '../../lib/useUserSettings'

export const profileService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCountries: builder.query<CountriesAndCitiesType<CountryAndCity[]>, void>({
      queryFn: async () => {
        try {
          //todo второй вариант запросов на сервер для городов и стран
          // const countries = await axios.get('https://restcountries.com/v3.1/all').then(res => {
          //   count = res.data
          //   return res.data
          // })
          const countries = await axios.get<{
            data: CountryAndCity[]
            error: boolean
            msg: string
          }>('https://countriesnow.space/api/v0.1/countries')
          const countData: CountriesAndCitiesType<CountryAndCity[]> = {
            data: countries.data.data,
            error: countries.data.error,
            msg: countries.data.msg,
          }

          return { data: countData }
        } catch (error: any) {
          return {
            //todo ока непонятно как обработать ошибку с сервера
            // error: {
            //   data: error.responce?.data || error.message,
            //   status: error.responce?.status || 500,
            // },
            error: {
              data: error,
              status: error.status,
            } as FetchBaseQueryError,
          }
        }
      },
    }),
    getProfile: builder.query<Profile, void>({
      providesTags: ['profile'],
      query: () => ({
        method: 'GET',
        url: '/users/profile',
      }),
    }),
    updateProfile: builder.mutation<Profile, UserSettingsFormData>({
      invalidatesTags: ['profile'],
      query: body => ({
        body,
        method: 'PUT',
        url: '/users/profile',
      }),
    }),
  }),
})

export const { useGetCountriesQuery, useGetProfileQuery, useUpdateProfileMutation } = profileService
export const { getProfile } = profileService.endpoints

// todo types for link https://restcountries.com/v3.1/all
type CountriesResponseType = {
  altSpellings: string[]
  area: number
  borders: string[]
  capital: string[]
  capitalInfo: { latlng: number[] }
  car: { side: string; signs: string[] }
  cca2: string
  cca3: string
  ccn3: string
  cioc: string
  coatOfArms: { png: string; svg: string }
  continents: string[]
  currencies: { ERN: { name: string; symbol: string } }
  demonyms: { eng: { f: string; m: string }; fra: { f: string; m: string } }
  fifa: string
  flag: string
  flags: { alt: string; png: string; svg: string }
  idd: { root: string; suffixes: string[] }
  independent: true
  landlocked: boolean
  languages: { ara: string; eng: string; tir: string }
  latlng: number[]
  maps: { googleMaps: string; openStreetMaps: string }
  name: {
    common: string
    nativeName: {
      ara: { common: string; official: string }
      eng: { common: string; official: string }
      tir: { common: string; official: string }
    }
    official: string
  }
  population: number
  postalCode: { format: null; regex: null }
  region: string
  startOfWeek: string
  status: string
  subregion: string
  timezones: string[]
  tld: string[]
  translations: {
    ara: TranslationType
    bre: TranslationType
    ces: TranslationType
    cym: TranslationType
    deu: TranslationType
    est: TranslationType
    fin: TranslationType
    fra: TranslationType
    hrv: TranslationType
    hun: TranslationType
    ind: TranslationType
    ita: TranslationType
    jpn: TranslationType
    kor: TranslationType
    nld: TranslationType
    per: TranslationType
    pol: TranslationType
    por: TranslationType
    rus: TranslationType
    slk: TranslationType
    spa: TranslationType
    srp: TranslationType
    swe: TranslationType
    tur: TranslationType
    urd: TranslationType
    zho: TranslationType
  }
  unMember: true
}
type TranslationType = { common: string; official: string }

// todo types for link https://countriesnow.space/api/v0.1/countries
type CountriesAndCitiesType<T> = {
  data: T
  error: boolean
  msg: string
}

type CountryAndCity = {
  cities: string[]
  country: string
  iso2: string
  iso3: string
}

//
// getCountries: builder.query<CountriesResponseType[], void>({
//   queryFn: async (arg, api, extraOptions, baseQuery) => {
//     try {
//       let count
//       const countries = await axios.get('https://restcountries.com/v3.1/all').then(res => {
//         count = res.data
//
//         return res.data
//       })
//
//       return { data: count }
//     } catch (error) {
//       return error
//     }
//   },
// }),
