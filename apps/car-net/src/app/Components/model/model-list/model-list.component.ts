import { Component, OnInit } from '@angular/core';
import { Model } from 'apps/data-api/src/app/model/model.schema';
import { Observable } from 'rxjs';
import { ModelService } from 'apps/data-api/src/app/model/model.service';

@Component({
  selector: 'car-net-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
})
export class ModelListComponent implements OnInit {
  models: Model[] | undefined;
  models$: Observable<Model[]> | undefined;

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.models$ = this.modelService.getList();
  }
}