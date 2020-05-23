import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPlantComponent } from './modify-plant.component';

describe('ModifyPlantComponent', () => {
  let component: ModifyPlantComponent;
  let fixture: ComponentFixture<ModifyPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
