/**
 * @ngInject
 */
export class AppComponent {
  // Define our AppComponent's name
  static componentName:string = "msApp";

  // Define our AppComponent's config
  static componentConfig:ng.IComponentOptions = {
    bindings: {},
    controller: AppComponent,
    templateUrl: 'src/components/start-app/start-app.component.html'
  };

  // Define our own variables
  private date1: string;
  private date2: string;

  // Define our constructor and inject the necessary services
  constructor() {
  }

  changeDates() {
    console.log('`changeDates` is fired!');
  }
}
