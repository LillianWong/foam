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
  package: 'foam.meta',
  name: 'MetaPropertyDescriptor',


  documentation: function() {/* Describes a type (such as when creating a new
    property). Instances of $$DOC{ref:'foam.meta.MetaPropertyDescriptor'} may be edited
    and then used to create a corresponding $$DOC{ref:'Property'} instance.
  */},

  properties: [
    {
      model_: 'StringProperty',
      label: 'The Type of the property',
      name: 'model',
      documentation: function() {/* The model id of the new property. */},
      defaultValue: 'StringProperty',
      view: {
         factory_: 'foam.ui.ChoiceView',
         choices: [
           'StringProperty',
           'BooleanProperty',
           'DateProperty',
           'DateTimeProperty',
           'IntProperty',
           'FloatProperty',
           'StringArrayProperty',
           'EMailProperty',
           'URLProperty',
           'ImageProperty',
           'ColorProperty',
           'PasswordProperty',
           'PhoneNumberProperty',
         ]
       },
    },
    {
      model_: 'StringProperty',
      label: 'The name of the new property',
      name: 'name',
      documentation: function() {/* The name of the new property. */},
    },
  ],

});
