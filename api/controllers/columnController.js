const columnService = require('../services/columnService/index');


const createNewColumn = (req, res) => {
    return columnService.createNewUserColumn(req, res);
}

const getAllColumnsWithPageLimit = (req, res) => {
    return columnService.getAllColumnsWithPageLimit(req, res, req.params.page, req.params.limit);
}

const getColumnById = (req, res) => {
    return columnService.getColumnById(req, res);
}

const removeColumn = (req, res) => {
    return columnService.removeColumn(req, res, req.body.data);
}

const getlistOfUniqueArtFormsWithPageLimit = (req, res) => {
    return columnService.getlistOfUniqueArtFormsWithPageLimit(req, res);
}

const getlistOfColumnsByPassionAndFormWithPageLimit = (req, res) => {
    return columnService.getlistOfColumnsByPassionAndFormWithPageLimit(req, res);
}

const createNewColumnWithPromotion = (req, res, next) => {
    columnService.createNewColumnWithPromotion(req, req.body.data, res);
};

const getAllPromotionColumn = (req, res, next) => {
    return columnService.getAllPromotionColumn(req, res);
};

const createNewNote = (req, res) => {
    return columnService.createNewNoteColumn(req, res);
}

module.exports = {
    createNewColumn,
    getAllColumnsWithPageLimit,
    removeColumn,
    getlistOfUniqueArtFormsWithPageLimit,
    getlistOfColumnsByPassionAndFormWithPageLimit,
    createNewColumnWithPromotion,
    getAllPromotionColumn,
    createNewNote,
    getColumnById
};