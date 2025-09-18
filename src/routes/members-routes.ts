import { Router } from 'express';
import { MembersController } from '@/controllers/members-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';

const membersRouter = Router();
const membersController = new MembersController();

membersRouter.use(ensureAuthenticated, verifyUserAuthorization(['admin']));
membersRouter.post('/', membersController.create);

export { membersRouter };
