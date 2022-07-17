const mongoose = require('mongoose');
const Column = require('../../models/Column');
const Note = require('../../models/Note');
const User = require('../../models/User');
const userDao = require('../userDao/userDao');


const createNewUserColumn = async (req, res, data) => {
    const result = {
        error: '',
        isSaved: false,
        statusCode: 200,
        id: 0,
    };

    try {
        const getUser = await userDao.getUserById(data.userId);
        if (getUser != null && data.title != '') {
            const isExists = await Column.exists({ user: data.userId, subject: data.subject, isDeleted: false });
            if (!isExists) {
                const column = new Column({
                    _id: new mongoose.Types.ObjectId(),
                    form: data.form,
                    subject: data.subject,
                    description: data.description,
                    user: data.userId
                });

                const saved = await column.save();
                if (saved._id) {
                    result.isSaved = true;
                    result.id = saved._id;
                    console.log(saved);
                }
            } else {
                result.statusCode = 406;
                result.error = 'Column with same details already exists';
            }
        } else {
            console.log(getUser)
            console.log(data);
            result.statusCode = 406;
            result.error = 'Invalid user or please provide title'
        }

    } catch (error) {
        console.error('Error occured while saving data', error);
        result.statusCode = 500;
        result.error = 'Error occured while saving column';
    }

    return result;
};

const getAllColumnsWithPageLimit = async (page, limit) => {
    if (isNaN(limit) || limit == undefined || limit == 0 || limit === ':limit') {
        limit = 10;
    }

    if (isNaN(page) || page == undefined || page === ':page') {
        page = 0;
    }
    const user = await User.findOne({});
    const whereClause = { isDeleted: false, user: user._id };
    const [columns, totalCount] = await Promise.all([
        // Column.find(whereClause, { isDeleted: 0 })
        Column.find({isDeleted: 0})
            .populate("user", ["_id", "fullname", "email", "profilePhoto"])
            .populate("notes")
            .sort({ dateOfCreation: -1 })
            .skip(Number(page * limit))
            .limit(Number(limit)),
        Column.countDocuments(),
        // Column.countDocuments(whereClause),
    ]);
    // let contentObjects = [];
    // for (let column of columns){
    //     column.noteCount = notes.length;
    //     columnObjects.push(column);
    // }

    return {
        per_page: parseInt(limit),
        total: totalCount,
        total_pages: Math.ceil(totalCount / limit),
        // data: contentObjects,
        data: columns,
    };
}

const isColumnExits = async (userId, columnId) => {
    return Column.exists({ _id: columnId, user: userId, isDeleted: false });
}

const removeColumn = async (req, res, data) => {
    const result = {
        error: '',
        statusCode: 200,
        isRemoved: false,
    };

    try {
        const isExists = await Column.exists({ user: data.userId, _id: data.columnId, isDeleted: false });
        if (isExists) {
            const response = await Column.findOneAndUpdate(
                { user: data.userId, _id: data.columnId, isDeleted: false },
                { $set: { isDeleted: true, dateOfLastUpdate: Date.now() } },
                { new: true }
            );
            if (response.isDeleted) {
                result.isRemoved = true;
            }
        } else {
            result.error = 'No column found';
            result.statusCode = 404;
        }
    } catch (error) {
        console.error('Error occured while removing column', error);
        result.error = 'Internal Server occured, while removing column';
        result.statusCode = 500;
    }
    return result;
}

const getColumnById = (columnId) => {
    return Column
                .findOne({_id: columnId, isDeleted: false})
                // .populate({ path: 'notes', populate: { path: 'user', model: 'User' } });
                // .populate('notes');
};

const getAllPromotionColumn = () => {
    return Column.find(
        {columnDeleted: false},
        {
            parentColumn: 1,
            columnDescription: 1,
        }
    );
};

const getlistOfUniqueArtFormsWithPageLimit = async (req, res, passionId, page, limit) => {
    if (isNaN(limit) || limit == undefined || limit == 0 || limit === ':limit') {
        limit = 10;
    }

    if (isNaN(page) || page == undefined || page === ':page') {
        page = 0;
    }

    const queryPipline = [{
        "$lookup": {
            "localField": "user",
            "from": User.collection.name,
            "foreignField": "_id",
            "as": "u"
        }
    },
    {
        "$unwind": {
            "path": "$u",
            "preserveNullAndEmptyArrays": false
        }
    },
    {
        "$match": {
            "u.passion": mongoose.Types.ObjectId(passionId),
            "u.blocked": false,
            "u.status": "Active",
            "isDeleted": false,
        }
    },
    ];

    const [columns, [totalCount = { count: 0 }]] = await Promise.all([
        Column.aggregate([
            ...queryPipline,
            {
                "$group": {
                    "_id": {
                        "form": { $toLower: "$form" }
                    },
                    "count(*)": {
                        "$sum": Number(1)
                    }
                }
            },
            {
                "$sort": {
                    "count(*)": Number(-1)
                }
            },
            {
                "$project": {
                    "columns": "$count(*)",
                    "form": "$_id.form",
                    "_id": Number(0)
                }
            },
            {
                $skip: Number(page * limit),
            },
            {
                $limit: Number(limit),
            },
        ]).allowDiskUse(true),
        Column.aggregate([
            ...queryPipline,
            {
                "$group": {
                    "_id": {
                        "form": "$form"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]).allowDiskUse(true),
    ]);

    return {
        per_page: parseInt(limit),
        total: totalCount.count,
        total_pages: Math.ceil(totalCount.count / limit),
        data: columns,
    };
}

const getlistOfColumnsByPassionAndFormWithPageLimit = async (req, res, passionId, form, page, limit) => {
    if (isNaN(limit) || limit == undefined || limit == 0 || limit === ':limit') {
        limit = 10;
    }

    if (isNaN(page) || page == undefined || page === ':page') {
        page = 0;
    }

    const queryPipline = [{
        "$lookup": {
            "localField": "user",
            "from": User.collection.name,
            "foreignField": "_id",
            "as": "user"
        }
    },
    {
        "$unwind": {
            "path": "$user",
            "preserveNullAndEmptyArrays": false
        }
    },
    {
        "$match": {
            "user.passion": mongoose.Types.ObjectId(passionId),
            "user.blocked": false,
            "user.status": "Active",
            "isDeleted": false,
            "form": { $regex: form.toLowerCase(), $options: 'i' }
        }
    },
    ];

    const [columns, [totalCount = { count: 0 }]] = await Promise.all([
        Column.aggregate([
            ...queryPipline,
            {
                "$sort": {
                    "dateOfCreation": Number(-1)
                }
            },
            {
                "$project": {
                    "isDeleted": 0,
                    "user.role": 0,
                    "user.status": 0,
                    "user.blocked": 0,
                    "user.password": 0
                }
            },
            {
                $skip: Number(page * limit),
            },
            {
                $limit: Number(limit),
            },
        ]).allowDiskUse(true),
        Column.aggregate([
            ...queryPipline,
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]).allowDiskUse(true),
    ]);

    return {
        per_page: parseInt(limit),
        total: totalCount.count,
        total_pages: Math.ceil(totalCount.count / limit),
        data: columns,
    };
}

module.exports = {
    createNewUserColumn,
    getColumnById,
    getAllPromotionColumn,
    getAllColumnsWithPageLimit,
    removeColumn,
    isColumnExits,
    getlistOfUniqueArtFormsWithPageLimit,
    getlistOfColumnsByPassionAndFormWithPageLimit
};