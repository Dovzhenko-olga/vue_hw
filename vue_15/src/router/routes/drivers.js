import DriversView from '@/views/drivers/DriversView.vue'
import EditDriver from '@/views/drivers/EditDriver.vue'
import AppointmentView from '@/views/drivers/AppointmentView.vue'

const routes = [{
  path: '/drivers',
  name: 'drivers-list',
  redirect: '/drivers/list',
  children: [
    {
      path: 'list',
      name: 'driver-list',
      component: DriversView,
    },
    {
      path: 'edit/:id?',
      name: 'driver-edit',
      component: EditDriver,
      props: true,
    },
    {
      path: 'appointments',
      name: 'appointments',
      component: AppointmentView,
      props: true,
    },
  ],
},
]
export default routes