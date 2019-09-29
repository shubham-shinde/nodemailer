import homeController from './../controller/homeController';
import mailController from './../controller/mailController';

export default function(app) {
    //app.get('/', homeController.get);    
    app.post('/mail', mailController.post);
}