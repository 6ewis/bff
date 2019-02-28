import express from 'express';
import { ThirdParty as ThirdPartyController } from './controller/';

const thirdPartyRoutes = express.Router();

//= ========================================
// Custodian Integration Flow Express Routes
//= ========================================

console.log(ThirdPartyController)
thirdPartyRoutes.post("/hs-embedded-url/", ThirdPartyController.HelloSign.GetHSEmbeddedUrl);

export default thirdPartyRoutes;
