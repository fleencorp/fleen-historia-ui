import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AddCommentComponent} from "@app/shared/component/discussion";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import {
  FormMessageComponent,
  SubmitLoadingIconComponent,
  SuccessButtonComponent,
  ValidationErrorComponent
} from "@app/shared/component";
import {CommonModule} from "@angular/common";
import {getComponentInstance} from "@app/test";

describe('AddCommentComponent', (): void => {
  let component: AddCommentComponent;

  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [
        ValidationErrorComponent,
        FormMessageComponent,
        SubmitLoadingIconComponent,
        SuccessButtonComponent,
        AddCommentComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule
      ]
    })
      .compileComponents();
  });

  /**
   * Sets up the testing environment and initializes the AddCommentComponent for testing.
   * This function is executed before each test case within the test suite.
   */
  beforeEach(() => {
    // Create a fixture for the AddCommentComponent
    fixture = TestBed.createComponent(AddCommentComponent);

    // Retrieve the instance of the component created by the fixture
    component = fixture.componentInstance;

    component.content = new FormControl('');

    // Trigger change detection to initialize the component's view
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should emit submitComment when addComment is called', (): void => {
    spyOn(component.submitComment, 'emit');
    component.addComment();
    expect(component.submitComment.emit).toHaveBeenCalled();
  });

  it('should emit submitComment event with correct value when addComment is called', (): void => {
    expect(component.content).toBeTruthy();
  });

  it('should have the correct font awesome icon', () => {
    expect(component.faComment).toEqual(faComment);
  });

  it('should render a submit button', (): void => {
    const button = fixture.nativeElement.querySelector('button[type=button]');
    expect(button).toBeTruthy();
  });

  it('should disable submit button when isSubmittingComment is true', (): void => {
    component.isSubmittingComment = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.form-group > button[type=button]');
    expect(button.disabled).toBeTruthy();
  });

  it('should disable submit button when isSubmittingComment is true and set submit button in progress', fakeAsync(async(): Promise<void> => {
    component.isSubmittingComment = true;
    fixture.detectChanges();
    tick();

    const submitLoadingComponent: SubmitLoadingIconComponent = getComponentInstance(fixture, SubmitLoadingIconComponent);
    expect(submitLoadingComponent.isSubmitting).toBeTruthy();
  }));

  it('should display Success on button after comment is added', (): void => {
    component.commentFormStatusMessage = 'success';
    component.isSubmittingCommentSuccessful = true;
    fixture.detectChanges();
    const statusMessage = fixture.nativeElement.querySelector('#success-btn');
    expect(statusMessage.textContent.toLowerCase()).toContain('success');
  });

  it('should display Success on button after comment is added and hide Submit comment button', (): void => {
    component.commentFormStatusMessage = 'success';
    component.isSubmittingCommentSuccessful = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('form-group > button[type=button]');
    expect(button).toBeFalsy();
  });

  it('should display status message', (): void => {
    component.commentFormStatusMessage = 'success';
    fixture.detectChanges();
    const statusMessage = fixture.nativeElement.querySelector('.form-status-message');
    expect(statusMessage.textContent.toLowerCase()).toContain('success');
  });

  it('should display error message', (): void => {
    component.commentFormErrorMessage = 'error';
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.form-error-message');
    expect(errorMessage.textContent.toLowerCase()).toContain('error');
  });

  it('should check form status message is not null', (): void => {
    component.commentFormStatusMessage = 'success';
    fixture.detectChanges();
    const formMessageComponent: FormMessageComponent = getComponentInstance(fixture, FormMessageComponent);
    expect(formMessageComponent.statusMessage).toEqual('success');
  });

  it('should check form error message is not null', (): void => {
    component.commentFormErrorMessage = 'error';
    fixture.detectChanges();
    const formMessageComponent: FormMessageComponent = getComponentInstance(fixture, FormMessageComponent);
    expect(formMessageComponent.errorMessage).toEqual('error');
  });

});
