import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window-id',
  template: `
    <p>Client Window ID: {{ windowId }}</p>
  `,
})
export class WindowIdComponent implements OnInit {
  windowId: string;

  ngOnInit() {
    this.windowId = window.name || "No ID set"; // Display "No ID set" if window.name is not set
  }
}