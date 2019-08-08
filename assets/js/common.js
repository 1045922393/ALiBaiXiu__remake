$(function () {
    // console.log(location.href)
    let router = tools.getRouter();
    // console.log(router)
    router = router.substring(0, router.indexOf('.'));
    // console.log(router)     //index
    $('#' + router).addClass('active');
    if ($('#' + router).parent().attr('id') == 'menu-settings' || $('#' + router).parent().attr('id') == 'menu-posts') {
        $('#' + router).parent().addClass('in').attr('aria-expanded', "true").siblings().removeClass('collapsed').attr('aria-expanded', 'true')
    }
})