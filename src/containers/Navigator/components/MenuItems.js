// 一级导航菜单项
export const mainMenus = [
    { url: '/music', name: '音乐', iconType: 'star' },
    { url: '/composition', name: '创作', iconType: 'copy' },
];

// guest可以访问的用户菜单(secondary)
export const guestMenus = [
    // form是对应需要展示的modal表单名称
    { url: '/login', name: '登陆', iconType: 'login', form: 'loginForm' },
    { url: '/register', name: '注册', iconType: 'user-add', form: 'registerForm' }
]

// user可以访问的用户菜单(secondary)
export const userMenus = [
    { url: '/friends', name: '社区', iconType: 'team' },
    { url: '/logout', name: '注销', iconType: 'logout' },
]
