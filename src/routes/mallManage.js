import asyncComponent from '../lazy'


const ClassifyMn = asyncComponent(() => import('../pages/mallManage/classifly'))
const ProductMn = asyncComponent(() => import('../pages/mallManage/product'))
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

    ]
}

export default route
