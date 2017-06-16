

export class AnnotationModel{
    
    public active: boolean;

    public time: number;

    constructor(public title: string, public content: string){

    }

    public setTime(time: number){
        this.time = time;
    }

    public setActive(value: boolean){
        this.active = value;
    }
    
}