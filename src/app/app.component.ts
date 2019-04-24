import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Muuri from 'muuri';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'muuritesting';
  grid: any;
  dragEnabled = false;
  showlogo = true;
  @ViewChild('logoWidget') logoWidget: ElementRef; // definition matches 22, attribute matches HTML
  @ViewChild('chonkWidget') chonkWidget: ElementRef;
  @ViewChild('longCatWidget') longCatWidget: ElementRef;
  userprefs = {
    widgets: [
      {
        name: 'logoWidget', // matches 16
        order: 2
      },
      {
        name: 'chonkWidget',
        order: 0
      },
      {
        name: 'longCatWidget',
        order: 1
      }
    ]
  };

  ngOnInit(): void {
    const itemsarray = Array<any>();
    for (let i = 0; i < this.userprefs.widgets.length; i++) {
      const widgetName = this.userprefs.widgets.find(a => a.order === i).name;
      itemsarray.push(this[widgetName].nativeElement);
   }

    this.grid = new Muuri('.grid', {
      items: itemsarray,
      dragEnabled: true,
      dragSortInterval: 120,
      layout: {
        fillGaps: false, // default: false
        horizontal: false, // default
        alignRight: false, // default
        alignBottom: false, // default
        rounding: true // default
      },
      dragStartPredicate: (item, event) => {
        // console.log('---------------------------------------------------');
        if (!this.dragEnabled) {
          // console.log('drag not enabled');
          return false;
        }
        if (!(event.target.className === 'widget-handle')) {
          // console.log('event target not a widget handle: ', event.target.className);
          return false;
        }
        // console.log('returning true');
        return true;
      }
    });
    this.grid.on('move', (data) => {
      console.log(data);
    });
  }

  constructor() { }

  toggledrag(): void {
    this.dragEnabled = !this.dragEnabled;
  }

  togglelogo(): void {
    if (this.showlogo) {
      this.showlogo = false;
      this.grid.hide(this.logoWidget.nativeElement, {instant: true});
    } else {
      this.showlogo = true;
      this.grid.show(this.logoWidget.nativeElement, {instant: true});
    }
  }

}
