import Button, { Button$PressEvent } from "sap/m/Button";
import BaseController from "./BaseController";

/**
 * @namespace com.logaligroup.finalproject.controller
 */
export default class CreateEmployee extends BaseController {

    public onInit() : void {
        console.log("You are in CreateEmployee");
    }

    public goToEmployeeDataStep( event : Button$PressEvent ) : void {
        console.log( ( event.getSource() as Button ).getIdForLabel() );
    }

}