/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
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

// TODO(kgr): add rotation to CView to complete demo
CLASS({
  package: 'foam.demos.modeldiagram',
  name: 'ModelDiagram',
  extends: 'foam.graphics.CView',

  requires: [
    'foam.demos.supersnake.Robot',
    'foam.ui.DetailView',
    'foam.graphics.CView',
    'foam.graphics.LabelledBox as Box',
    'foam.graphics.Circle'
  ],

  properties: [
    [ 'width', 1200/0.75 ],
    [ 'height', 680/0.75 ],
    [ 'scaleX', 1 ],
    [ 'scaleY', 1 ],
    [ 'background', 'gray' ]
  ],

  methods: {
    initCView: function() {
      var self  = this;
      var v     = this.Box.create({width: 500, height: 600, x:100, y: 145, text: 'Model', background: '#ccf', color: 'white', font: '24pt Arial'});
      var cls   = this.Box.create({width: 500, height: 600, x:800, y: 145, text: 'Class', font: '24pt Arial'});
      var robot = this.Robot.create({x:400,y:165,width:200,height:220,scaleX:0,scaleY:0});

      this.addChildren(v, robot, cls);

      var M = Movement;
      var B = M.bounce(0.2, 0.08, 3);

      var anim = [
        [0],
        [500, function() { v.width /= 5; v.height /= 5; cls.alpha = 0; } ],
        [500, function() { robot.scaleX = robot.scaleY = 3; } ],
        [0]
      ];

      var fnum = 0;
      function feature(f, anim, xo, yo, timeWarp) {
        timeWarp = timeWarp || 1;
        var b = self.Box.create({width: v.width/5+15, height: v.height/5, x: v.x, y: v.y, text: f.name, font: '12pt Arial'});
        var num = fnum++;
        var x = num % 5;
        var y = Math.floor(num/5);

//        if ( f.pause ) anim.push([[0]]);
        anim.push(function() { self.addChild(b); });
        anim.push([100*timeWarp, function() { b.x = robot.x; }]);
        if ( f.pause ) {
          anim.push([400*timeWarp, function() { b.x += 250; b.y-=80; b.scaleX = b.scaleY = 6.5; }]);
          anim.push([[0]]);
          anim.push([200*timeWarp, function() { b.scaleX = b.scaleY = 1; b.x += xo + x * b.width*1.4; b.y += yo + b.height*1.2 * y; }]);
        } else {
          anim.push([600*timeWarp, function() { b.x += 250 + xo + x * b.width*1.4; b.y += yo + b.height*1.2 * y - 80; }]);
        }
      }

      var fs = [
        { name: 'Class' },
        { name: '.hashCode()' },
        { name: '.copyFrom()' },
        { name: '.clone()' },
        { name: '.equals()' },
        { name: '.compareTo()' },
        { name: '.diff()' },
        { name: 'Observer' },
        { name: 'XML Adapter', pause: true  },
        { name: 'JSON Adapter', pause: true  },
        { name: 'UML', pause: true  },
        { name: 'Docs', pause: true  },
        { name: 'Detail View', pause: true  },
        { name: 'MD Detail View', pause: true  },
        { name: 'Table View', pause: true  },
        { name: 'Grid View', pause: true  },
        { name: 'mLang' },
        { name: 'Query Parser' },
        { name: 'Local Storage' },
        { name: 'IndexedDB' },
        { name: 'ClientDAO' },
        { name: 'ServerDAO' },
        { name: 'Offline Sync' },
        { name: 'FileDAO' },
        { name: 'MongoDB' },
        { name: 'Postgres' },
        { name: 'Google CS' },
        { name: 'Firebase' },
        { name: 'Controller' },
        { name: '...' }
      ];

      fs.forEach(function(f) { feature(f, anim, 0, 0); });

      fs.forEach(function(f) { f.pause = false; });
      fs[0].pause = true;

      anim.push([500, function() { self.scaleX = self.scaleY = 0.6; }]);
      fnum = 0;
      fs.forEach(function(f) { feature(f, anim, 900, 0, 0.3); });

      anim.push([500, function() { self.scaleX = self.scaleY = 0.6 * 0.6; }]);
      fnum = 0;
      fs.forEach(function(f) { feature(f, anim, 1800, 0, 0.3); });

      fnum = 0;
      fs.forEach(function(f) { feature(f, anim, 0, 1000, 0.3); });

      anim.push([0]);
      var ys1 = self.Box.create({x: 1550, y: 1060, width: 660, height: 850, scaleX: 0, scaleY: 0, font: '50pt Arial', text: 'Your Stack Here'});
      var ys2 = self.Box.create({x: 1550, y: 1060, width: 0, height: 0, font: '50pt Arial'});
      var ys3 = self.Box.create({x: 1550, y: 1060, width: 0, height: 0, font: '50pt Arial'});
      var ys4 = self.Box.create({x: 1550, y: 1060, width: 0, height: 0, font: '50pt Arial'});
      this.addChildren(ys4, ys3, ys2, ys1);
      anim.push([300, function() { ys1.scaleX = ys1.scaleY = 1; }]);
      anim.push([300, function() { ys2.width = 660; ys2.height = 850; ys2.x += 40; ys2.y-=40;}]);
      anim.push([300, function() { ys3.width = 660; ys3.height = 850; ys3.x += 80; ys3.y-=80;}]);
      anim.push([300, function() { ys4.width = 660; ys4.height = 850; ys4.x += 120; ys4.y-=120;}]);

      anim.push([0]);
//      anim.push([500, function() { self.scaleX = self.scaleY = 1; }]);

      M.compile(anim)();
    }
  }
});