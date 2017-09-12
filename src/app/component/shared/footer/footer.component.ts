import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../shared-data.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private CmService : SharedDataService) { }

  ngOnInit() {
  }

}
