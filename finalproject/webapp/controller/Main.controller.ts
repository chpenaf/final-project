import BaseController from "./BaseController";

/**
 * @namespace com.logaligroup.finalproject.controller
 */
export default class Main extends BaseController {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onNavToCreateEmployee() : void {
        const router = this.getRouter();
        router.navTo("RouteCreateEmployee");
    }

}