var pageController = require('../../controller').Page;


module.exports = function(express) {
    var pageRouter = express.Router();


    pageRouter.route('/')
        .get(pageController.selectUser);

    pageRouter.route('/addCardId')
        .get(pageController.addCardId)
        .post(pageController.post_addCardId);

    pageRouter.route('/info/:col')
        .get(pageController.info);

    pageRouter.route('/upload')
        .post(pageController.post_upload);

    pageRouter.route('/complete')
        .get(pageController.complete)
        .post(pageController.complete);

    return pageRouter;
}