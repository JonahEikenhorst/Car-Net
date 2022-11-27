import { Component, OnInit } from '@angular/core';
import { model } from '@car-net/entity-ui/components';
import { Observable } from 'rxjs';
import { ModelService } from 'apps/data-api/src/app/model/model.service';

@Component({
  selector: 'car-net-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
})
export class ModelListComponent implements OnInit {
  models: model[] | undefined;
  models$: Observable<model[]> | undefined;

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.models$ = this.modelService.getList();
  }
}