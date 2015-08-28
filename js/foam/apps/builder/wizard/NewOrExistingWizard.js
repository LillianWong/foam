/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

CLASS({
  package: 'foam.apps.builder.wizard',
  name: 'NewOrExistingWizard',
  extendsModel: 'foam.apps.builder.wizard.WizardPage',

  requires: [
    'foam.ui.md.ChoiceRadioView',
    'foam.apps.builder.dao.DAOFactoryView',
  ],

  exports: [
    'selection$'
  ],

  properties: [
    {
      model_: 'foam.apps.builder.wizard.WizardViewFactoryProperty',
      name: 'newViewFactory',
      label: 'New',
      defaultValue: null,
    },
    {
      model_: 'foam.apps.builder.wizard.WizardViewFactoryProperty',
      name: 'existingViewFactory',
      label: 'Existing',
      defaultValue: null,
    },
    {
      name: 'existingDAO',
      documentation: 'The list of existing options to display. If this DAO is empty, the next(new) option will immediately be executed.',
      postSet: function(old,nu) {
        if ( nu ) {
          nu.select(COUNT())(function(c) {
            this.hidden = ! c.count; // if no choices, don't show this page, go straight to 'new thing' page
          }.bind(this));

        }
      }
    },
    {
      name: 'title',
      defaultValue: 'New or Existing',
    },
  ],

  actions: [
    {
      name: 'nextAction',
      isEnabled: function() {
        // must be creating new OR have selected something
        this.nextViewFactory;
        this.existingViewFactory;
        this.selection;
        return (this.nextViewFactory !== this.existingViewFactory || this.selection);
      },
    }
  ],

  templates: [

    function instructionHTML() {/*
      <p class="md-style-trait-standard">Choose one of the following options:</p>
    */},

    function contentHTML() {/*
      <div class="new-existing-wizard-dao-page">
        $$nextViewFactory{ model_: 'foam.ui.md.ChoiceRadioView',
          orientation: 'vertical',
          choices: [
            [this.newViewFactory, this.model_.NEW_VIEW_FACTORY.label],
            [this.existingViewFactory, this.model_.EXISTING_VIEW_FACTORY.label ],
          ]
        }
        <% if ( this.existingDAO ) { %>
          <div id="<%= this.id %>-container">
            $$existingDAO
          </div>
        <%  } %>
      </div>
      <%
        this.setClass('existing-hidden', function() { return self.nextViewFactory === self.newViewFactory; }, this.id+'-container');
        this.setClass('new-existing-wizard-dao-container', function() { return true; }, this.id+'-container');
      %>
    */},
    function CSS() {/*
      .new-existing-wizard-dao-page {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }

      .new-existing-wizard-dao-container {
        flex-grow: 1;
        overflow-y: scroll;
        transition: opacity 300ms ease;
      }

      .existing-hidden {
        opacity: 0.4;
        pointer-events: none;
      }

      @media (max-width: 600px) {
        .new-existing-wizard-dao-container {
          padding: 8px;
        }
      }

      @media (min-width: 600px) {
        .new-existing-wizard-dao-container {
          padding: 0px 8px 16px 60px;
        }
      }
    */},
  ],


});