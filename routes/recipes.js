var recipes = require('../recipes.json');
var router = require('express').Router();

router.get('/', (req, res) => {
    res.json(recipes)
})
router.get('/:id',  function(req, res, next) {
    const found=recipes.some(recipe=>recipe.id===parseInt(req.params.id));
    if(found) {
        res.json(recipes.filter(recipe=>recipe.id===parseInt(req.params.id)));
    }
    else{
        res.sendStatus(400)
    }
});
module.exports = router;
