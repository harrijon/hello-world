import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubProfileService } from '../services/github-profile.service';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {
  profile;

  constructor(private route: ActivatedRoute,
    private service: GithubProfileService) {
      this.profile = service.get(-1);
     }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        let id = +params.get('id');
        this.service.get(id)
          .subscribe(profile => {
            this.profile = profile;
            console.log(profile);

          });
      });
  }

}
