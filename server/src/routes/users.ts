import { Router } from 'express';
import User from '../models/User';
import { signUpUser } from '../controller/auth';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        console.log('Retrieving Users');
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Error while Retrieving Users');
        res.status(500).json({ message: (err as Error).message });
    }
});

router.post('/', requireAuth, signUpUser);

router.delete('/', requireAuth, async (req, res) => {
    try {
        console.log(`Deleting Users: ${req.body.ids}`);
        const { ids } = req.body;

        const result = await User.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No users found to delete' });
        }

        res.status(200).json({ message: 'Users deleted', result });
    } catch (err) {
        console.error(`Error while Deleting Users: ${req.body.ids}`);
        res.status(500).json({ message: (err as Error).message });
    }
});

// router.put('/:id', async (req, res) => {
//     try {
//         console.log(`Updating User: ${req.params.id}`);
//         const { id } = req.params;
//         const { 
//             username,
//             password,
//         } = req.body;

//         const updatedData = {
//             username,
//             password: await hash(password, 10),
//         };

//         const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
//         res.json(updatedUser);
//     } catch (err) {
//         console.error(`Error while Updating User: ${req.params.id} ${err}`);
//         res.status(500).json({ message: (err as Error).message });
//     }
// });

export default router;
