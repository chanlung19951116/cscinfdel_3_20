import {NgModule} from '@angular/core';
import {EstadoPipe} from '../pipe/estado-pipe';
import {GenderPipe} from '../pipe/gender-pipe';
import {SinoPipe} from '../pipe/sino-pipe';

@NgModule({
  declarations: [
    EstadoPipe,
    GenderPipe,
    SinoPipe
  ],
  exports: [
    EstadoPipe,
    GenderPipe,
    SinoPipe,
  ]
})
export class PipeModule {
}
