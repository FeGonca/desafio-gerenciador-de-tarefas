import { Router } from 'express';
import { TasksController } from '@/controllers/tasks-controller';

const tasksRoute = Router();
const tasksController = new TasksController();

tasksRoute.post('/', tasksController.create);

export { tasksRoute };
