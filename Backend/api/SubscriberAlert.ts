import express, {
    ExpressRequest,
    ExpressResponse,
} from 'CommonServer/Utils/Express';
import SubscriberAlertService from '../services/subscriberAlertService';
import path from 'path';
import fs from 'fs';

const router = express.getRouter();

import {
    sendErrorResponse,
    sendListResponse,
    sendItemResponse,
} from 'CommonServer/Utils/response';
import Exception from 'Common/Types/Exception/Exception';
import IncidentService from '../services/incidentService';

router.post(
    '/:projectId/:subscriberId',
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const data = req.body;
            data.projectId = req.params.projectId;
            data.subscriberId = req.params.subscriberId;

            if (!data.incidentId) {
                return sendErrorResponse(req, res, {
                    code: 400,
                    message: 'IncidentId must be present',
                });
            }

            if (!data.alertVia) {
                return sendErrorResponse(req, res, {
                    code: 400,
                    message: 'AlertVia must be present',
                });
            }
            const subscriberAlert = await SubscriberAlertService.create(data);
            return sendItemResponse(req, res, subscriberAlert);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

// Mark alert as viewed
router.get(
    '/:projectId/:alertId/viewed',
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const alertId = req.params.alertId;
            const projectId = req.params.projectId;

            await SubscriberAlertService.updateOneBy(
                { _id: alertId, projectId: projectId },
                { alertStatus: 'Viewed' }
            );
            const filePath = path.join(
                __dirname,
                '..',
                '..',
                'views',
                'img',
                'vou-wb.png'
            );
            const img = fs.readFileSync(filePath);

            res.set('Content-Type', 'image/png');
            res.status(200);
            res.end(img, 'binary');
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

// get subscribers alerts by projectId
// req.params-> {projectId};
// Returns: response subscriber alerts, error message
router.get('/:projectId', async (req: ExpressRequest, res: ExpressResponse) => {
    try {
        const projectId = req.params.projectId;
        const skip = req.query['skip'] || 0;
        const limit = req.query['limit'] || 10;
        const populate = [
            { path: 'incidentId', select: 'name' },
            { path: 'projectId', select: 'name' },
            {
                path: 'subscriberId',
                select: 'name contactEmail contactPhone contactWebhook countryCode',
            },
        ];
        const select =
            'incidentId projectId subscriberId alertVia alertStatus eventType error errorMessage totalSubscribers identification';
        const [subscriberAlerts, count] = await Promise.all([
            SubscriberAlertService.findBy({
                query: { projectId: projectId },
                skip,
                limit,
                select,
                populate,
            }),
            SubscriberAlertService.countBy({
                projectId: projectId,
            }),
        ]);
        return sendListResponse(req, res, subscriberAlerts, count);
    } catch (error) {
        return sendErrorResponse(req, res, error as Exception);
    }
});

//get subscribers by incidentSlug
// req.params-> {projectId, incidentSlug};
// Returns: response subscriber alerts, error message
router.get(
    '/:projectId/incident/:incidentSlug',
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const projectId = req.params.projectId;
            const incidentSlug = req.params.incidentSlug;
            let incidentId = await IncidentService.findOneBy({
                query: { slug: incidentSlug },
                select: '_id',
            });
            const skip = req.query['skip'] || 0;
            const limit = req.query['limit'] || 10;

            let subscriberAlerts = [],
                count = 0;
            if (incidentId) {
                incidentId = incidentId._id;
                const populate = [
                    { path: 'incidentId', select: 'name' },
                    { path: 'projectId', select: 'name' },
                    {
                        path: 'subscriberId',
                        select: 'name contactEmail contactPhone contactWebhook countryCode',
                    },
                ];
                const select =
                    'incidentId projectId subscriberId alertVia alertStatus eventType error errorMessage totalSubscribers identification';
                const [alerts, alertCount] = await Promise.all([
                    SubscriberAlertService.findBy({
                        query: { incidentId, projectId },
                        skip,
                        limit,
                        select,
                        populate,
                    }),
                    SubscriberAlertService.countBy({
                        incidentId,
                        projectId,
                    }),
                ]);
                subscriberAlerts = alerts;
                count = alertCount;
            }
            return sendListResponse(req, res, subscriberAlerts, count);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

export default router;
