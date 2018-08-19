import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SynapsPicsModule } from './synaps-pics.module';


@Component({
  template: `<img [synapsPics]="imageUrl">`
})
class TestComponent {
  public imageUrl: string;
}

describe('SynapsPicsDirective', () => {
  const timeStringFormat = /[0-9]{2}:[0-9]{2}:[0-9]{2}/i;
  let componentFixture: ComponentFixture<TestComponent>;
  let componentInstance: TestComponent;

  // Asynchronous beforeEach.
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ SynapsPicsModule ],
        declarations: [ TestComponent ]
      }).compileComponents().then(() => { /* Don't do anything */ });
    })
  );

  // Synchronous BeforeEach.
  beforeEach(() => {
    componentFixture = TestBed.createComponent(TestComponent);
    componentInstance = componentFixture.componentInstance;
  });

  it('should display time string', (done) => {
    componentInstance.imageUrl = '/anon/p1p1j2pej12p1j2.jpg';

    componentFixture.detectChanges();

    setInterval(() => {
      componentFixture.detectChanges();

      const imageElement = componentFixture.debugElement.queryAll(By.css('img'));
      const resultImageSource = imageElement[0].nativeElement.src;

      expect(imageElement).toBeDefined();
      expect(imageElement.length).toEqual(1);
      expect(resultImageSource).toEqual('https://img.synaps.pics/anon/p1p1j2pej12p1j2.jpg');

      done();
    }, 1000);
  });
});
