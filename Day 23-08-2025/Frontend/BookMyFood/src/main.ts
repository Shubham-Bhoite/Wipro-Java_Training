import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './Components/app/app.component';
import { appConfig } from './Components/app/app.config';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
