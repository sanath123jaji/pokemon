import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [MatIconModule, RouterModule.forRoot([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userName on init', () => {
    expect(component.userName).toBe('Sanath Kumar');
  });

  it('should display app name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.app-name').textContent).toContain('Pokemon App');
  });

  it('should display user name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.user-name-value').textContent).toBe('Sanath Kumar');
  });
});
