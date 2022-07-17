const columnDao = require('../../daos/columnDao/columnDao');
const userDao = require('../../daos/userDao/userDao');
const ColumnClass = require('../../class/ColumnClass');
const { isUserAuthorized } = require('../../utils/utils');
const Column = require('../../models/Column');
const Note = require('../../models/Note');
const mongoose = require("mongoose");
const Content = require('../../models/Content');
const User = require('../../models/User');

const createNewUserColumn = async (req, res) => {
    // const data = new multip
    const data = JSON.parse(JSON.stringify(req.body));
    if (isUserAuthorized(req, data.userId, res)) {
        const result = await columnDao.createNewUserColumn(req, res, data);

        if (result.isSaved) {
            if (data.note){

                let newNote = new Note({
                    _id: new mongoose.Types.ObjectId(),
                    note: data.note, columnId: result.id, user: data.userId
                });
                newNote = await newNote.save();
                try {
                    await Column.update({_id: result.id}, { $push: { notes: [newNote._id] } })
                }
                catch (e){
                    console.log(e);
                }
            }

            return res.status(result.statusCode).json({
                success: true,
                data: {
                    msg: 'Column saved successfuly',
                },
                code: result.statusCode,
            });
        }

        return res.status(result.statusCode).json({
            success: false,
            data: {
                err: result.error
            },
            code: result.statusCode
        });
    }
};

const removeColumn = async (req, res, data) => {
    if (isUserAuthorized(req, data.userId, res)) {
        const result = await columnDao.removeColumn(req, res, data);

        if (result.isRemoved) {
            return res.status(result.statusCode).json({
                success: true,
                data: {
                    msg: 'Column saved succesfully'
                },
                code: result.statusCode,
            });
        }

        return res.status(result.statusCode).json({
            success: false,
            data: {
                err: result.error
            },
            code: result.statusCode
        });
    }
}

const getAllColumnsWithPageLimit = async (req, res, page, limit) => {
    // const columns = await columnDao.getAllColumnsWithPageLimit(req.userData.data, page, limit);
    const columns = await columnDao.getAllColumnsWithPageLimit(page, limit);
    return res.status(200).json({
        success: true,
        data: columns,
        code: 200
    });
}

const getlistOfUniqueArtFormsWithPageLimit = async (req, res) => {
    if (req.params.passionId) {
        const artForms = await columnDao.getlistOfUniqueArtFormsWithPageLimit(req, res, req.params.passionId, req.params.page, req.params.limit);
        return res.status(200).json({
            success: true,
            code: 200,
            data: artForms,
        });
    }

    return res.status(400).json({
        success: false,
        code: 400,
        data: {
            msg: "Please provide passion id"
        },
    });

};

const getlistOfColumnsByPassionAndFormWithPageLimit = async (req, res) => {
    if (req.params.passionId && req.params.form) {
        const columns = await columnDao.getlistOfColumnsByPassionAndFormWithPageLimit(req, res, req.params.passionId, req.params.form, req.params.page, req.params.limit);
        return res.status(200).json({
            success: true,
            code: 200,
            data: columns,
        });
    }

    return res.status(400).json({
        success: false,
        code: 400,
        data: {
            msg: "Please provide passion id or form"
        },
    });

};

async function createNewColumnWithPromotion(req, data, res) {
    if (utils.isUserAuthorized(req, data.userId, res)) {
        // User validation
        if ((await userDao.getUserById(data.userId)) != null) {
            const parentColumn = await columnDao.getColumnById(data.columnId);
            if (parentColumn != null) {
                const column = await Column(await ColumnClass.createNewColumnWithPromotion(data));
                column
                    .save()
                    .then((response) => {
                        increamentPromotionCount(data.columnId).then();
                        res.status(200).json({
                            success: true,
                            data: {
                                msg: 'Column(Promotion) created with success',
                            },
                            code: 200,
                        });
                    })
                    .catch((err) => utils.defaultError(res, err));
            } else {
                res.status(406).json({
                    success: true,
                    data: {
                        msg: 'Invalid column, promotion is only alowed on (Contribution, Work and Reaction)',
                    },
                    code: 406,
                });
            }
        } else {
            res.status(406).json({
                success: true,
                data: {
                    msg: 'This account does not exist',
                },
                code: 406,
            });
        }
    }
}

const getAllPromotionColumn = async (req, res) => {
    const columns = await columnDao.getAllPromotionColumn();
    res.status(200).json({
        success: true,
        code: 200,
        data: columns,
    });
};

async function increamentPromotionCount(parentColumn) {
    return await Column.findOneAndUpdate(
        {
            _id: parentColumn,
            columnDeleted: false,
        },
        {$inc: {promotionCount: 1}},
        {new: true}
    );
}

const createNewNoteColumn = async (req, res) => {
    
    const data = req.body;

    const {columnId, note, userId} = data;

    console.log(columnId, note, userId);
    // const column = await Column.findById(columnId);
    const column = await Column.findById(columnId) || await Content.findById(columnId);

    if (!column){
        res.status(401).json({ 
            success: false, 
            code: 401,
            data: {
                err: 'Column doesn\'t exist'
            }
        })
    }
    
    else {

        const newNote = new Note({
            _id: new mongoose.Types.ObjectId(),
            note, 
            column: column._id,
            user: userId
        });
        try {
            const savedNote = await newNote.save();
            if (column.collection.name.includes('column')){
                await Column.updateOne({_id: column._id}, { $push: { notes: [savedNote._id] } })
            }
            else {
                await Content.updateOne({ _id: column._id }, { $push: { notes: [savedNote._id] } })
            }
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    msg: 'Note added successfully',
                    note: savedNote
                }
            })
        }
        catch (e){
            res.status(500).json({
                success: false,
                code: 500,
                date: {
                    err: 'Unexpected error occured'
                }
            })
        }
    }

}

const getColumnById = async (req, res) => {
    const {columnId} = req.params;
    // const column = await columnDao.getColumnById(columnId);
    // console.log(columnId);

    const column = await Column
                            .findById(columnId)
                            .populate(
                                {   path: 'notes', 
                                    select: ['_id', 'note', 'user'],
                                    populate: { 
                                        path: 'user', 
                                        model: 'User', 
                                        select: ['_id', 'fullname', 'profilePhoto', 'headline'] 
                                    },
                                });
    
    if (!column){
        res.status(401).json({ 
            success: false, 
            code: 401,
            data: {
                err: 'Column doesn\'t exist'
            }
        })
    }
    else {
        const user = await User.findById(column.user).select(['_id', 'fullname', 'profilePhoto', 'headline'])
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                content: [column],
                userDetail: user
            }
        });
    }
}


module.exports = {
    createNewUserColumn,
    getAllColumnsWithPageLimit,
    removeColumn,
    getlistOfUniqueArtFormsWithPageLimit,
    getlistOfColumnsByPassionAndFormWithPageLimit,
    createNewColumnWithPromotion,
    getAllPromotionColumn,
    createNewNoteColumn,
    getColumnById
};