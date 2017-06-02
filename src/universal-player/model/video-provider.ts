/* 
 *  All rights reserverd
 *  @author Stephane Leonard 
 *  @contact sca.leonard@gmail.com
 */

export class VideoProvider {

    public name: string;
    
    constructor(name?: string){
        this.name = name;
    }
    
    public toString(): string {
        return 'VideoProvider[name=' + this.name + ']';
    }
}

