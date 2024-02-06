import { Component } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  title = ' your To Do: Lists & Tasks';
  tasks: Task[] = [
    new Task(1, 'Search information about SpringBoot', 'Complete first research', undefined, new Date('2024-02-10'), 'Project Spring', 'Miguel', 8, undefined),
    new Task(2, 'Select SpringBoot tutorials', 'Review project requirements', new Date('2024-02-05'), undefined, 'Project Spring', 'Jorge', 5, undefined),
    new Task(3, 'Define project dependencies', 'Compare with differents proyects', new Date('2024-02-08'), new Date('2024-02-15'), 'Project Spring', 'Yolanda', 10, undefined),
    new Task(4, 'Review IDE extensions', 'Write down all the requirements', new Date('2024-02-10'), new Date('2024-02-20'), 'Project Spring', 'Jorge', 15, undefined),
    new Task(5, 'Create PowerPoint presentation', 'Select a good template', new Date('2024-02-15'), new Date('2024-02-25'), 'Project Spring', 'Miguel', 12, undefined),
    new Task(6, 'Develop README', 'Write documentation', new Date('2024-02-20'), new Date('2024-02-28'), 'Project Spring', 'Yolanda', 8, undefined),
  ]


  emptyTaskValues: Task = new Task(0, '', '', undefined, undefined, '', '', 0, undefined);


  startTask(task: Task): void {
    task.startDate = new Date();
    task.started = true;
  }


  finishTask(task: Task): void {

    if (!task.started) {
      alert('Task is not initialized');
      return;
    } else {
      task.endDate = new Date();
      const endDate = task.endDate?.getTime();
      const startDate = task.startDate?.getTime();
      if (endDate && startDate) {
        const timeDiff = Math.abs(endDate - startDate);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        task.duration = `${days} days ${hours} hours ${minutes} minutes`;
      }
    }
  }

  createTask(emptyTaskValues: Task): void {
    const newId = this.tasks.length + 1;

    const emptyTask: Task = {
      id: newId,
      name: emptyTaskValues.name,
      description: emptyTaskValues.description,
      startDate: emptyTaskValues.startDate,
      endDate: emptyTaskValues.endDate,
      subject: emptyTaskValues.subject,
      assignedTo: emptyTaskValues.assignedTo,
      timeEstimation: emptyTaskValues.timeEstimation,
      duration: emptyTaskValues.duration,
      started: false,
      editMode: false,
      isSelected: false,
      showButtons: false
    };

    this.tasks.push(emptyTask);
    this.emptyTaskValues = new Task(0, '', '', undefined, undefined, '', '', 0, undefined, false);
  }


  selectTask(task: Task): void {
    // Deselecciona todas las tareas antes de seleccionar la actual
    this.tasks.forEach(t => t.isSelected = false);
  
    // Selecciona la tarea actual
    task.isSelected = true;
  
  }

  editTask(task: Task): void {
    this.emptyTaskValues.editMode = true;
    this.emptyTaskValues = { ...task };
  }

  saveChanges(): void {
    if (this.emptyTaskValues) {
      this.emptyTaskValues.editMode = false;
      const index = this.tasks.findIndex(task => task.id === this.emptyTaskValues.id);

      if (index !== -1) {
        this.tasks[index] = { ...this.emptyTaskValues };
        this.emptyTaskValues = new Task(0, '', '', undefined, undefined, '', '', 0, undefined, false);
      }
    }
  }

  cancelEdit(): void {
    this.emptyTaskValues.editMode = false;
    this.emptyTaskValues = new Task(0, '', '', undefined, undefined, '', '', 0, undefined, false);
  }


  deleteTask(task: Task): void {
    const confirmDelete = confirm(`Are you sure you want to delete the task "${task.name}"?`);

    if (confirmDelete) {
      const taskIndex = this.tasks.indexOf(task);

      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
      }
    }
  }
  
}
