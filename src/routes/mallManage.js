import asyncComponent from '../lazy'


const ClassifyMn = asyncComponent(() => import('../pages/mallManage/classifly'))
const ProductMn = asyncComponent(() => import('../pages/mallManage/product'))
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
