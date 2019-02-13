import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, visibility, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), visibility(), expand()]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  feedbackCopy: Feedback;
  errMsg: string;
  visibility: boolean;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  validationMessages = {
    'firstname': {
      'required': 'firstname is required',
      'minlength': '2 characters long',
      'maxlength': 'not more than 25 chars'
    },
    'lastname': {
      'required': 'lastname is required',
      'minlength': 'minimum 2 characters long',
      'maxlength': 'not more than 25 chars'
    },
    'telnum': {
      'required': 'telnum is required',
      'pattern': 'only numbers',
    },
    'email': {
      'required': 'email is required',
      'email': 'invalid email',
    }
  };
  @ViewChild('fform') feedbackFormDirective;
  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }
  // toggleVisibility() {
  //   if (this.visibility === 'shown') {
  //     this.visibility = 'hidden';
  //   } else {
  //     this.visibility = 'shown';
  //   }
  // }
  createForm() {
    this.feedbackForm = this.fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        telnum: [0, [Validators.required, Validators.pattern]],
        email: ['', [Validators.required, Validators.email]],
        agree: false,
        contacttype: 'None',
        message: ''
      }
    );
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset form validation messages
  }
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedbackForm.value);
    this.feedbackCopy = this.feedback;
    // this.toggleVisibility();
    this.visibility = false;
    console.log(this.visibility);
    this.feedbackService.submitFeedback(this.feedbackCopy).subscribe(feedback => {
      this.feedback = feedback;
      this.feedbackCopy = feedback;
      this.visibility = true;
      setTimeout(() => {
        this.feedback = null; this.feedbackCopy = null;
      }, 5000);
    }, errMsg => { this.feedback = null; this.feedbackCopy = null; this.errMsg = <any>errMsg; });
    console.log(this.visibility);
    this.feedbackForm.reset(
      {
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      }
    );
    this.feedbackFormDirective.resetForm();
    this.visibility = false;
    // this.toggleVisibility();
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear prev error messages
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
