import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement} from "@angular/core";

// Define a generic utility function to query for a component instance by directive
export function getComponentInstance<T>(fixture: ComponentFixture<any>, directive: any): T {
  const debugElement: DebugElement = fixture.debugElement.query(By.directive(directive));
  if (debugElement) {
    return debugElement.componentInstance as T;
  } else {
    throw new Error(`Component instance not found for directive: ${directive.name}`);
  }
}
