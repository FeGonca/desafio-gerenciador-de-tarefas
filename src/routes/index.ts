import { Router } from 'express';
import { sessionsRoutes } from '@/routes/sessions-routes';
import { usersRoutes } from '@/routes/users-routes';
import { teamsRouter } from '@/routes/teams-routes';
import { membersRouter } from '@/routes/members-routes';
import { tasksRoute } from '@/routes/taks-routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/teams', teamsRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/members', membersRouter);
routes.use('/tasks', tasksRoute);

export { routes };
