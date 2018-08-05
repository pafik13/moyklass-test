/// <reference path="../../../typings/index.d.ts" />

import 'moment';

// Import our Angular dependencies
import * as angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';

import {AppComponent} from "../components/start-app/start-app.component.ts";
import {MCDatesComponent} from "../components/mc-dates/mc-dates.component.ts"

module MaterialStart {
  "use strict";

  // Register our module and it's dependencies
  angular.module('MaterialStart', ['ngMaterial', 'ngSanitize'])
    .config(function ($mdDateLocaleProvider:angular.material.IDateLocaleProvider
    ) {
      
      /**
       * @param date {Date}
       * @returns {string} string representation of the provided date
       */
      $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format(MCDatesComponent.dateViewFormat) : '';
      };

      /**
       * @param dateString {string} string that can be converted to a Date
       * @returns {Date} JavaScript Date object created from the provided dateString
       */
      $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, MCDatesComponent.dateStoreFormat, true);
        return m.isValid() ? m.toDate() : new Date(NaN);
      };

      /**
       * Check if the date string is complete enough to parse. This avoids calls to parseDate
       * when the user has only typed in the first digit or two of the date.
       * Allow only a day and month to be specified.
       * @param dateString {string} date string to evaluate for parsing
       * @returns {boolean} true if the date string is complete enough to be parsed
       */
      $mdDateLocaleProvider.isDateComplete = function(dateString) {
        dateString = dateString.trim();
        // Look for two chunks of content (either numbers or text) separated by delimiters.
        return MCDatesComponent.dateStoreRegex.test(dateString);
      };



    })

    // Register all of our components
    .component(AppComponent.componentName, AppComponent.componentConfig)
    .component(MCDatesComponent.componentName, new MCDatesComponent())
  ;
}