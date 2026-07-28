let pageLoading = document.querySelector('.page-loading');
if (!pageLoading.classList.contains('_loaded')) {
    pageLoading.classList.add('_loaded');
    document.body.classList.remove('_lock');
}