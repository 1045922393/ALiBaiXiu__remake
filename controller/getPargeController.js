module.exports = {
    getIndex(req, res) {
        res.render('index')
    },
    getDetail(req, res) {
        res.render('detail')
    },
    getList(req, res) {
        res.render('list')
    },
    getAdminLogin(req, res) {
        res.render('admin/login')
    },
    getAdminCategories(req, res) {
        res.render('admin/categories')
    },
    getAdminComments(req, res) {
        res.render('admin/comments')
    },
    getAdminIndex(req, res) {
        res.render('admin/index')
    },
    getAdminNavMenus(req, res) {
        res.render('admin/nav-menus')
    },
    getAdminPasswordReset(req, res) {
        res.render('admin/password-reset')
    },
    getAdminPostAdd(req, res) {
        res.render('admin/post-add')
    },
    getAdminPosts(req, res) {
        res.render('admin/posts')
    },
    getAdminProfile(req, res) {
        res.render('admin/profile')
    },
    getAdminSettings(req, res) {
        res.render('admin/settings')
    },
    getAdminSlides(req, res) {
        res.render('admin/slides')
    },
    getAdminUsers(req, res) {
        res.render('admin/users')
    }
}