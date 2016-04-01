/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
CLASS({
  package: 'foam.u2',
  name: 'Clipboard',

  documentation: 'Call copy("some string") to copy that string into the clipboard.',

  requires: [
    'foam.u2.Element',
    'foam.u2.tag.TextArea',
  ],

  methods: [
    function copy(str) {
      // Constructs a textarea offscreen, containing the provided text.
      var e = this.TextArea.create().style({
        'font-size': '12px',
        border: '0',
        padding: '0',
        margin: '0',
        position: 'fixed',
        left: '-9999px',
        top: (window.pageYOffset || document.documentElement.scrollTop) + 'px',
      }).attrs({ readonly: '' });

      document.body.insertAdjacentHTML('beforeend', e.outerHTML);
      e.load();

      // Trigger selection.
      var elem = e.el();
      elem.value = str;
      elem.focus();
      elem.setSelectionRange(0, str.length);

      // Copy the text.
      var succeeded;
      try {
        succeeded = document.execCommand('copy');
      } catch (err) {
        succeeded = false;
      }

      e.remove();
      return succeeded;
    },
  ]
});
