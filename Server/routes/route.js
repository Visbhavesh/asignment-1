import express from  'express';
import { searchStories,createStories} from '../controller/storyController.js';


const router = express.Router();


router.get('/search', searchStories);
router.post('/create', createStories);
export default router;