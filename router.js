// const express = require
const router = require('express').Router();
const getPargeController = require('./controller/getPargeController');
const adminController = require('./controller/adminController')
router.get('/', getPargeController.getIndex)
    .get('/index.html', getPargeController.getIndex)
    .get('/index', getPargeController.getIndex)
    .get('/detail', getPargeController.getDetail)
    .get('/list', getPargeController.getList)
    .get('/admin/categories.html', getPargeController.getAdminCategories)
    .get('/admin/login.html', getPargeController.getAdminLogin)
    .get('/admin/comments.html', getPargeController.getAdminComments)
    .get('/admin/index.html', getPargeController.getAdminIndex)
    .get('/admin/index', getPargeController.getAdminIndex)
    .get('/admin', getPargeController.getAdminIndex)
    .get('/admin/nav-menus.html', getPargeController.getAdminNavMenus)
    .get('/admin/password-reset.html', getPargeController.getAdminPasswordReset)
    .get('/admin/post-add.html', getPargeController.getAdminPostAdd)
    .get('/admin/posts.html', getPargeController.getAdminPosts)
    .get('/admin/profile.html', getPargeController.getAdminProfile)
    .get('/admin/settings.html', getPargeController.getAdminSettings)
    .get('/admin/slides.html', getPargeController.getAdminSlides)
    .get('/admin/users.html', getPargeController.getAdminUsers)
    .post('/checkLogin', adminController.checkLogin)

module.exports = router;