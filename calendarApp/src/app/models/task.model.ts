export class Task {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public startDate: Date | undefined,
        public endDate: Date | undefined,
        public subject: string,
        public assignedTo: string,
        public timeEstimation: number,
        public duration: string | undefined,
        public started: boolean = false,
        public editMode: boolean = false,
        public isSelected: boolean = false,
        public showButtons: boolean = false,
    ){}
}