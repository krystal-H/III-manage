import asyncComponent from '../lazy'


const ClassifyMn = asyncComponent(() => import('../pages/mallManage/classifly'))
const ProductMn = asyncComponent(() => import('../pages/mallManage/product'))
const UserMn = asyncComponent(() => import('../pages/mallManage/user'))
const OrderMn = asyncComponent(() => import('../pages/mallManage/order'))
const ProductMnInfo = asyncComponent(() => import('../pages/mallManage/product/info'))
const route = {
    icon: "apartment",
    name: '商城管理',
    path: '/mall',
    redirect: '/mall/productMn',
    routes: [
        {
            name: '商品管理',
            path: '/mall/productMn',
            component: ProductMn,
        },
        {
            name: '分类管理',
            path: '/mall/classifyMn',
            component: ClassifyMn,
        },
        {
            name: '订单管理',
            path: '/mall/orderMn',
            component: OrderMn,
        },
        {
            name: '用户管理',
            path: '/mall/userMn',
            component: UserMn,
        },
        {
            name: '商品信息',
            path: '/mall/productInfo',
            component: ProductMnInfo,
            meta: {
                hideInMenu: true,
            }
        },
    ]
}

export default route
