import express, {
    ExpressRequest,
    ExpressResponse,
} from 'CommonServer/Utils/Express';
import loginHistoryService from '../services/loginHistoryService';

const router = express.getRouter();

import { isAuthorized } from '../middlewares/authorization';
const getUser = require('../middlewares/user').getUser;
import {
    sendErrorResponse,
    sendItemResponse,
} from 'CommonServer/Utils/response';
import Exception from 'Common/Types/Exception/Exception';

router.get(
    '/:userId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const userId = req.params.userId;
            let { skip, limit } = req.query;
            if (!skip) {
                skip = 0;
            }
            if (!limit) {
                limit = 10;
            }
            const select = 'userId createdAt ipLocation device status';
            const historyLogs = await loginHistoryService.findBy({
                query: { userId },
                skip,
                limit,
                select,
            });

            return sendItemResponse(req, res, historyLogs);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

export default router;
