const router = require('express').Router();
const { Tag } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
	try {
		const tags = await Tag.findAll();
		res.json(tags);
	} catch(err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		if(req.body.id) delete req.body.id
		const newTag = await Tag.create(req.body);
		res.json(newTag);
	} catch(err) {
		next(err);
	}
})

router.get('/:tagName', async (req, res, next) => {
	try {
		const tag = await Tag.findOne({
			where: {
				name: req.params.tagName
			}
		});

		// should we add error handling here for creating duplicate tag?
		res.json(tag);

	} catch(err) {
		next(err);
	}
})

router.delete('/:tagName', async (req, res, next) => {
	try {
		const tag = await Tag.findOne({
			where: {
				name: req.params.tagName
			}
		});

		await tag.destroy();
		res.status(204).send();
		
	} catch(err) {
		next(err);
	}
})
