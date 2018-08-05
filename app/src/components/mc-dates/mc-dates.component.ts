import 'moment';
import * as angular from 'angular';

class MCDatesComponentController implements ng.IComponentController {

    public previousDateFrom: string;
    public dateFrom: string;
   
    public previousDateTo: string;
    public dateTo: string;

    public minDate: Date;
    public maxDate: Date;

    public mcChange: any;

    constructor($element) {
        $element.addClass('mc-dates');
    }

    public $onInit () {
        this.minDate = moment('1990-01-01').toDate();
        this.maxDate = moment('2990-01-01').toDate();
        this.previousDateFrom = angular.copy(this.dateFrom);
        this.previousDateTo = angular.copy(this.dateTo);
        // this.mcChange = angular.noop;
    }

    public $doCheck() {
        if (!angular.equals(this.dateFrom, this.previousDateFrom)) {
            this.previousDateFrom = angular.copy(this.dateFrom);

            if (this.previousDateFrom == null) {
                this.minDate = moment('1990-01-01').toDate();
            } else {
                this.minDate = moment(this.previousDateFrom).toDate();
            }
                
            if (this.mcChange instanceof Function) {
                this.mcChange();
            };
        }

        if (!angular.equals(this.dateTo, this.previousDateTo)) {
            this.previousDateTo = angular.copy(this.dateTo);

            if (this.previousDateTo == null) {
                this.maxDate = moment('2990-01-01').toDate();
            } else {
                this.maxDate = moment(this.previousDateTo).toDate();
            }

            if (this.mcChange instanceof Function) {
                this.mcChange();
            };
        }
    }

    /**
     * Click handler for fast buttons.
     */
    fbClick(fbType:string) {
        console.log(fbType);
        switch(fbType) {
            case 'yesterday':
                this.dateFrom = moment().add(-1, 'days').format(MCDatesComponent.dateStoreFormat);
                this.dateTo = moment().add(-1, 'days').format(MCDatesComponent.dateStoreFormat);
                break;
            case 'now':
                this.dateFrom = moment().format(MCDatesComponent.dateStoreFormat);
                this.dateTo = moment().format(MCDatesComponent.dateStoreFormat);
                break;
            case 'twoWeek':
                this.dateFrom = moment().add(-14, 'days').format(MCDatesComponent.dateStoreFormat);
                this.dateTo = moment().format(MCDatesComponent.dateStoreFormat);
                break;
            case 'month':
                this.dateFrom = moment().add(-30, 'days').format(MCDatesComponent.dateStoreFormat);
                this.dateTo = moment().format(MCDatesComponent.dateStoreFormat);
                break;
            case 'all':
                this.dateFrom = null;
                this.dateTo = null;
                break;
            default:
                throw new Error('Wrong fast button type!');
          }
    }
}
  
export class MCDatesComponent implements ng.IComponentOptions {
  // Define our MCDatesComponent's name
  static componentName:string = "mcDates";
  static dateViewFormat: string = 'DD.MM.YYYY';
  static dateStoreFormat: string = 'YYYY-MM-DD';
  static dateStoreRegex: RegExp =  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

    public bindings: {[boundProperty: string]: string};
    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public templateUrl: string;

    constructor() {
        this.bindings = {
            dateFrom : "=",
            dateTo : "=",
            mcChange: "&"
        };
        this.controller = MCDatesComponentController;
        this.controllerAs = "$ctrl";
        this.templateUrl = 'src/components/mc-dates/mc-dates.component.html';
    }
}