import BusesView from '@/views/buses/BusesView.vue'
import EditBus from '@/views/buses/EditBus.vue'

const routes = [{
  path: '/buses',
  name: 'buses-list',
  redirect: '/buses/list',
  children: [
    {
      path: 'list',
      name: 'bus-list',
      component: BusesView,
    },
    {
      path: 'edit/:id?',
      name: 'bus-edit',
      component: EditBus,
      props: true,
    },
  ],
},
]
export default routes