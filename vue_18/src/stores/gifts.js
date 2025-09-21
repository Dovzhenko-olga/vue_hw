import { defineStore } from 'pinia'
import { useBaseItems } from './baseItems'

export const useGiftsStore = defineStore
  ('gifts', () => {

    return {
      ...useBaseItems('gift',
        [
          {
            id: 111,
            title: 'Торт',
          },
          {
            id: 222,
            title: 'Листівка',
          },
          {
            id: 333,
            title: 'Шовдарь',
          },
        ]
      ),
    }
  })