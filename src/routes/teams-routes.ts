import { Router } from 'express';
import { TeamsController } from '@/controllers/teams-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.use(ensureAuthenticated, verifyUserAuthorization(['admin']));
teamsRouter.post('/', teamsController.create);

export { teamsRouter };
    