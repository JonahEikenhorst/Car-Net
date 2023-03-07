import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Model } from 'apps/data-api/src/app/model/model.schema';
import { ModelService } from 'apps/data-api/src/app/model/model.service';

@Component({
  selector: 'car-net-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.css'],
})
export class ModelDetailComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  modelId: number | undefined;
  model$: Observable<Model> | undefined;
  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.modelId = Number(params.get('id'));
      console.log(`This is the model ID ${this.modelId}`);
      this.model$ = this.modelService.getById(this.modelId);
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}