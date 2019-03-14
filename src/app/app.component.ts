import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "./services/data.service";
import { CaptchaComponent } from "./utils-components/captcha/captcha.component";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild("captchaComponent") captchaComponent: CaptchaComponent;

  contactForm = this.fb.group({
    fullName: ["James Joyce", Validators.compose([Validators.required, Validators.maxLength(255)])],
    email: ["james@blah-blah.xyz", Validators.compose([Validators.required])],
    message: ["Just sayin' \"Hello\"!", Validators.compose([Validators.required, Validators.maxLength(255)])]
  });

  captchaApiBaseUrl: string = "/api";
  captchaComplete: boolean = false;
  isBusy: boolean = false; // during submit!
  authToken: string = "";
  captchaNonce: string = "69879887sdsas$#";
  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {}

  onValidToken(tokenEvent) {
    this.authToken = tokenEvent.replace("\n", "");
    this.captchaComplete = true;
  }

  submitDisabled() {
    return this.isBusy || !this.captchaComplete;
  }

  doContinue() {
    this.isBusy = true;

    console.log("contactForm =", this.contactForm.value);
    const contactData = this.contactForm.value;

    this.dataService.submitRequest(this.authToken, this.captchaNonce, contactData).subscribe(
      result => {
        console.log("result: ", result);
        this.isBusy = false;
      },
      error => {
        this.isBusy = false;
        console.log("That submit failed: ", error);
        alert("Temporarily unable to submit your request. Please try again in a few minutes.");
        this.captchaComponent.forceRefresh();
        this.captchaComplete = false;
      }
    );
    return false;
  }
}
