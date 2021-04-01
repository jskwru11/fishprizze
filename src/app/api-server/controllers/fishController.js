const Fish = require(`./../models/fishModels`);

exports.getAllFish = async (req, res, next) => {
  try {
    const fish = await Fish.find({});

    res.status(200).json({
      status: 'success',
      data: {
        fish,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'No Fish found',
    });
  }
};

exports.createFish = async (req, res, next) => {
  try {
    const fish = await Fish.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        fish,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Unable able to add new fish to database',
    });
  }
};

exports.getFishById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const fish = await Fish.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        fish,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'No fish with that ID found in the database.',
    });
  }
};

exports.updateFishById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const fish = await Fish.findByIdAndUpdate(id, req.body);

    res.status(201).json({
      status: 'success',
      data: {
        fish,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'No fish with that Id exists in the database.',
    });
  }
};

exports.deleteFishById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const fish = await Fish.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      message: 'Fish deleted successfully from the database.',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to delete Fish from the database.',
    });
  }
};
