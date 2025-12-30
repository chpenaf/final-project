import WizardStep, { WizardStep$ActivateEvent } from "sap/m/WizardStep";
import BaseController from "./BaseController";
import SegmentedButton from "sap/m/SegmentedButton";
import Fragment from "sap/ui/core/Fragment";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import View from "sap/ui/core/mvc/View";

/**
 * @namespace com.logaligroup.finalproject.controller
 */
export default class CreateEmployee extends BaseController {

    private _formFragments : Record<string,SimpleForm> = {};

    public onInit() : void {
        // console.log("You are in CreateEmployee");
    }

    public goToEmployeeDataStep() : void {
        const step = this.byId("EmployeeTypeSelectionStep") as WizardStep;
        const selectedEmployeeType = 
            ( this.getView()?.byId("selectEmployeeType") as SegmentedButton )
                .getSelectedKey().toString();
        switch (selectedEmployeeType) {
            case "Intern":
                step.setNextStep(this.byId("InternDataStep") as WizardStep);
                break;
            case "SelfEmployed":
                step.setNextStep(this.byId("SelfEmployedDataStep") as WizardStep);
                break;
            case "Manager":
                step.setNextStep(this.byId("ManagerDataStep") as WizardStep);
                break;
        }
    }

    public async activateStep2( event : WizardStep$ActivateEvent ) : Promise<void> {
        const currentStep = event.getSource();
        let form : string = "";
        let mode : string = "Change";
        switch ( currentStep ) {
            case this.byId("InternDataStep"):
                form = "intern";
                break;
            case this.byId("SelfEmployedDataStep"):
                form = "self-employed";
                break;
            case this.byId("ManagerDataStep"):
                form = "manager";
                break;
        }
        await this._showFormFragment(currentStep,`${ form }.${ mode }`);
    }

    private async _getFormFragment ( sFragmentName  : string ) : Promise< void | SimpleForm > {
        
        let pFormFragment : SimpleForm = this._formFragments[sFragmentName];
        const oView = this.getView() as View;
        
        if (!pFormFragment) {
            pFormFragment = await Fragment.load({
                id : oView.getId(),
                name: `com.logaligroup.finalproject.fragment.${ sFragmentName }`,
                controller: this
            }) as SimpleForm;
            this._formFragments[sFragmentName] = pFormFragment;
            console.log(this._formFragments);
        }
        return pFormFragment;
    }

    private async _showFormFragment ( sStep : WizardStep, sFragmentName: string ) : Promise<void | SimpleForm> {
        sStep.removeAllContent();
        const fragment = await this._getFormFragment(sFragmentName);
        if ( !fragment ) { return;}
        sStep.insertContent(fragment,1);
    }

    public onPressFragmentButton () : void {
        console.log("Hola");
    }

}