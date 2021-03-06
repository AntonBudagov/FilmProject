import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PeopleService } from '../people.service';
import { ActorsFilm, People } from '../people.model';
// import 'rxjs/add/operator/switchMap';
import { IMAGE_DEFAULT_SIZE } from '../../app.config';

@Component({
    selector: 'app-people-detail',
    templateUrl: './people-detail.component.html',
    styleUrls: ['./people-detail.component.sass']
})
export class PeopleDetailComponent implements OnInit {
    public people: People;
    public actorFilms: ActorsFilm[];
    public imgUrl: string = IMAGE_DEFAULT_SIZE;

    constructor(private apiServices: PeopleService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getPeopleById();
        this.getFilmsActor();
    }

    getPeopleById() {
        // this.route.paramMap
        //     .switchMap((params: ParamMap) => this.apiServices.getPeople(+params.get('id')))
        //     .subscribe((data: People) => {
        //         this.people = data;
        //     }, (error) => {
        //         console.log(error);
        //     });
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                this.apiServices.getPeople(+params.get('id')).subscribe((data: People) => {
                    this.people = data;
                }, (error) => {
                    console.log(error);
                });
            });
    }

    public getFilmsActor() {
        // this.route.paramMap
        //   .switchMap((params: ParamMap) => this.apiServices.getActorFilms(+params.get('id')))
        //   .subscribe((actors: ActorsFilm[]) => {
        //       this.actorFilms = actors['cast'];
        //       // console.log(actors);
        //     },
        //     (error: any) => {
        //       console.log(error);
        //     }
        //   );
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                this.apiServices.getActorFilms(+params.get('id')).subscribe((actors: ActorsFilm[]) => {
                        this.actorFilms = actors['cast'];
                        // console.log(actors);
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            });

    }
}
