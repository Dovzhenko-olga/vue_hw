import { defineStore } from 'pinia'
import { useBaseItems } from './baseItems'

export const useFriendsStore = defineStore
  ('friends', () => {

    return {
      ...useBaseItems('friend',
        [
          {
            id: 11,
            name: 'Дід Петро',
          },
          {
            id: 22,
            name: 'Баба Галя',
          },
          {
            id: 33,
            name: 'Онука Оленка',
          },
        ]
      ),
    }
  })